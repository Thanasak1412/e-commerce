const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      min: 2,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      min: 3,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "MEMBER",
      enum: ["MEMBER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
