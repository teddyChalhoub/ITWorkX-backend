import mongoose from "mongoose";

const order = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

export default mongoose.model("order", order);
