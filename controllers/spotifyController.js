const spotifyApi = require("../models/spotifyModel");

const spotifyController = {};

spotifyController.login = (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];

  // Get the current base URL
  const baseUrl = "localhost:1000/api/v1";

  // Manually construct the callback URL with "/spotify/callback"
  const callbackURL = baseUrl + "/spotify/callback";

  // Create the authorization URL with the modified callback URL
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, callbackURL);

  // Redirect to the modified authorization URL
  res.redirect(authorizeURL);
};

spotifyController.callback = (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      console.log("The access token is " + accessToken);
      console.log("The refresh token is " + refreshToken);

      res.send(
        "Login successful! You can now use the /search and /play endpoints."
      );

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessTokenRefreshed = data.body["access_token"];
        spotifyApi.setAccessToken(accessTokenRefreshed);
      }, (expiresIn / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send("Error getting tokens");
    });
};

spotifyController.search = async (req, res) => {
  const { q, type } = req.query;

  try {
    let searchData;
    if (type === "artist") {
      searchData = await spotifyApi.searchArtists(q);
      const artist = searchData.body.artists.items[0];

      const albumsData = await spotifyApi.getArtistAlbums(artist.id);
      const albums = albumsData.body.items;

      const topTracksData = await spotifyApi.getArtistTopTracks(
        artist.id,
        "US"
      );
      const topTracks = topTracksData.body.tracks;

      const artistInfo = {
        name: artist.name,
        uri: artist.uri,
        albums: albums.map((album) => ({
          name: album.name,
          uri: album.uri,
        })),
        topTracks: topTracks.map((track) => ({
          name: track.name,
          uri: track.uri,
        })),
      };

      res.send(artistInfo);
    } else if (type === "track") {
      searchData = await spotifyApi.searchTracks(q);
      const tracks = searchData.body.tracks.items.map((track) => ({
        name: track.name,
        uri: track.uri,
      }));

      res.send(tracks);
    } else {
      res.status(400).send('Invalid type parameter. Use "artist" or "track".');
    }
  } catch (err) {
    console.error("Search Error:", err);
    res.send("Error occurred during search");
  }
};

spotifyController.play = (req, res) => {
  const { uri } = req.query;

  spotifyApi
    .play({ uris: [uri] })
    .then(() => {
      res.send("Playback started");
    })
    .catch((err) => {
      console.error("Play Error:", err);
      res.send("Error occurred during playback");
    });
};

module.exports = spotifyController;
