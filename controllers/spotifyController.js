const express = require('express');
const spotifyApi = require('../models/spotifyModel');

const app = express();

// Route handler for the login endpoint.
app.get('/login', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// Route handler for the callback endpoint after the user has logged in.
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log('The access token is ' + accessToken);
        console.log('The refresh token is ' + refreshToken);

        res.send('Login successful! You can now use the /search and /play endpoints.');

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn / 2 * 1000);
    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send('Error getting tokens');
    });
});

// Route handler for the search endpoint.
app.get('/search', async (req, res) => {
    const { q } = req.query;

    try {
        const searchData = await spotifyApi.searchArtists(q);
        const artist = searchData.body.artists.items[0];

        const albumsData = await spotifyApi.getArtistAlbums(artist.id);
        const albums = albumsData.body.items;

        const topTracksData = await spotifyApi.getArtistTopTracks(artist.id, 'US');
        const topTracks = topTracksData.body.tracks;

        const artistInfo = {
            name: artist.name,
            uri: artist.uri,
            albums: albums.map(album => ({
                name: album.name,
                uri: album.uri
            })),
            topTracks: topTracks.map(track => ({
                name: track.name,
                uri: track.uri
            }))
        };

        res.send(artistInfo);
    } catch (err) {
        console.error('Search Error:', err);
        res.send('Error occurred during search');
    }
});

// Route handler for the play endpoint.
app.get('/play', (req, res) => {
    const { uri } = req.query;

    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback');
    });
});

module.exports = app;
