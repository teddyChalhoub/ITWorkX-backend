import mongoose from "mongoose";

const PhotoModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
    },
    isCarousel: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("photo", PhotoModel);
