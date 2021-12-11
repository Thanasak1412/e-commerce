const { Schema, model } = require("mongoose");

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Brand", BrandSchema);
