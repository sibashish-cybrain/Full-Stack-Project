const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    countryCode: {
      type: String,
      default: "+91"
    },

    mobile: {
      type: String,
      trim: true,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    },

    googleId: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    refreshToken: {
        type: String,
        default: null
    },

    resetPasswordToken: {
      type: String
    },

    resetPasswordExpire: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);