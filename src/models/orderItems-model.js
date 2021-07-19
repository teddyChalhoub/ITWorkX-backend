import mongoose from "mongoose";

const orderItem = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },

    quantity: { type: Number },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderItem", orderItem);
