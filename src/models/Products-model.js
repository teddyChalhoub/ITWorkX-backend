import mongoose from "mongoose";

let products = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    numberOfAvailability: { type: Number },
    isAvailable: { type: Boolean, default: true },
    newItem: { type: Boolean, default: true },
    discount: { type: String },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "photo",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    orderItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItem",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("product", products);
