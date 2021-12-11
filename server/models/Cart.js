const { Schema, model } = require("mongoose");

const Product = require("../models/Product");

// Cart Item Schema
const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  {
    timestamps: true,
  }
);

CartItemSchema.pre("save", async function (next) {
  const productId = this.product;

  const product = await Product.findById(productId);
  this.totalPrice = this.quantity * product.price;
  next();
});

// Cart Schema
const CartSchema = new Schema(
  {
    products: [CartItemSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = model("Cart", CartSchema);
