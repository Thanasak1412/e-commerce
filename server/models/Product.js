const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = Product = model("Product", ProductSchema);
