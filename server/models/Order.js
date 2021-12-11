const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    total: {
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

module.exports = model("Order", OrderSchema);
