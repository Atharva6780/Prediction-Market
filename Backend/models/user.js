const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true, // wallet or generated id
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },

    avatar: {
      type: String, // image URL
      default: "",
    },

    socials: {
      twitter: {
        type: String, // twitter handle or oauth id
        default: "",
      },
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
