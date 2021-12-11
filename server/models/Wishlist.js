const { Schema, model } = require("mongoose");

const WishlistSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Wishlist", WishlistSchema);
