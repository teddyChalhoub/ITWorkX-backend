import mongoose from "mongoose";

const PhotoModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    isCarousel: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("photo", PhotoModel);
