const mongoose = require('mongoose');

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
    createdAt: {
        type: Date,
        default: Date.now
    },
    tracks: [{
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

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
