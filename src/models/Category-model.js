import mongoose from "mongoose";

let categories = new mongoose.Schema(
  {
    name: { type: String },
    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("category", categories);
