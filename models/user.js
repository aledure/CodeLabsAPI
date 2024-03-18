const mongoose = require("mongoose");
const playlist = require("./playlist");
const bcrypt = require("bcrpyt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
