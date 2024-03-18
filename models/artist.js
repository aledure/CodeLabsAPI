const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  albums: {
    type: String,
    required: true,
  },
  songs: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Artist", artistSchema);

module.exports = Artist;
