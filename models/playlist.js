const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  tracks: [
    {
      title: {
        type: String,
        require: true,
      },
      artist: {
        type: String,
        require: true,
      },
      album: {
        type: String,
      },
    },
  ],
});

const Playlist = moongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
