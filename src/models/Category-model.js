import mongoose from "mongoose";

let categories = new mongoose.Schema({
   name: {type:String},
   parent_category: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "category"
}

}, { timestamps: true })

module.exports = mongoose.model("category", categories);