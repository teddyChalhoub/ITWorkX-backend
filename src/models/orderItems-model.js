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

export default mongoose.model("orderItem", orderItem);
