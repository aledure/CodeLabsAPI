const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const connectDB = require('./db');
const cors = require('cors');


const app = express();

app.use(cors());


const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());

// auth routes
app.use('/auth', authRoutes);

// user routes
app.use('/user', userRoutes);

// spotify routes
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});