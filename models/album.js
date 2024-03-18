const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
