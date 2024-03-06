const mongoose = require('mongoose');

// Define schema for playlist
const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    tracks: [{
        // Define schema for each track in the playlist
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String
        },
    }]
});

// Create model from schema
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
