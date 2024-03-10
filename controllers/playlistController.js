const express = require('express');
const router = express.Router();
const axios = require('axios');
const Playlist = require('../models/playlistModel');

// Function to handle errors
const handleErrors = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
};

// Route to create a new playlist
router.post('/', async (req, res) => {
    try {
        const { userId, name, tracks } = req.body;
        const playlist = new Playlist({ userId, name, tracks });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Route to get all playlists
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Route to get a single playlist by ID
router.get('/:id', async (req, res) => {
    try {
        const playlistId = req.params.id;
        const playlistResponse = await axios.get(`http://localhost:3000/playlists/${playlistId}`);
        res.json(playlistResponse.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        handleErrors(res, error);
    }
});

// Route to update a playlist by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, tracks } = req.body;
        const playlistId = req.params.id;
        const updatedPlaylist = await axios.put(`http://localhost:3000/playlists/${playlistId}`, { name, tracks });
        res.json(updatedPlaylist.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        handleErrors(res, error);
    }
});

// Route to delete a playlist by ID
router.delete('/:id', async (req, res) => {
    try {
        const playlistId = req.params.id;
        await axios.delete(`http://localhost:3000/playlists/${playlistId}`);
        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        handleErrors(res, error);
    }
});

module.exports = router;
