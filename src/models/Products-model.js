import mongoose from "mongoose";

let products = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    price: { type: Number,  required: true },
    description: { type: String },
    numberOfAvailability: { type: Number },
    isAvailable: { type: Boolean, default: true },
    newItem: {type:Boolean,default:true},
    discount:{type:String},
    images: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Images"
    }]

}, { timestamps: true })

module.exports = mongoose.model("product", products);