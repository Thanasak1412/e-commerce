const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contact", ContactSchema);
