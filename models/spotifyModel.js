// Load environment variables from the .env file.
require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');

// Initialize the Spotify API with credentials from environment variables.
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL
});

module.exports = spotifyApi;
