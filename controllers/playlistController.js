const Playlist = require('../models/playlistModel');
const axios = require('axios');

// Function to handle errors
const handleErrors = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
};

// Controller to create a new playlist
const createPlaylist = async (req, res) => {
    try {
        const { userId, name, tracks } = req.body;
        const playlist = new Playlist({ userId, name, tracks });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to add song to playlist
const addSongToPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const { songId } = req.body;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        playlist.tracks.push(songId);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to get all playlists
const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to get a single playlist by ID
const getPlaylistById = async (req, res) => {
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
};

// Controller to update a playlist by ID
const updatePlaylistById = async (req, res) => {
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
};

// Controller to delete a playlist by ID
const deletePlaylistById = async (req, res) => {
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
};

// Export controllers
module.exports = {
    createPlaylist,
    addSongToPlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById
};
