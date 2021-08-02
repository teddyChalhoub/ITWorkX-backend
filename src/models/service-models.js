import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: [{ type: mongoose.Schema.Types.ObjectId, ref: "photo" }],
    price: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("services", serviceSchema);