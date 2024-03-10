const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Route to create a new playlist
router.post('/', playlistController.createPlaylist);

// Route to add song to playlist
router.post('/:id/songs', playlistController.addSongToPlaylist);

// Route to get all playlists
router.get('/', playlistController.getAllPlaylists);

// Route to get a single playlist by ID
router.get('/:id', playlistController.getPlaylistById);

// Route to update a playlist by ID
router.put('/:id', playlistController.updatePlaylistById);

// Route to delete a playlist by ID
router.delete('/:id', playlistController.deletePlaylistById);

module.exports = router;
