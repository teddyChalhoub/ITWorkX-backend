import mongoose from "mongoose";

const order = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    orderItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItem"
    }]

},
{ timestamps: true })

module.exports = mongoose.model("order",order);