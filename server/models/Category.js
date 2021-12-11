const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", CategorySchema);
