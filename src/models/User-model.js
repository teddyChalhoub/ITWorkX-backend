import mongoose from "mongoose";
const schema = mongoose.Schema

const userSchema = new schema({
    name : {type:String , required:true},
    email : {type:String ,unique:true, required:true},
    password :{type:String, required:true},
    reenterpassword :{type:String, required:true},
    company :{type:String,required:false},
    numberofemployee :{type:String,required:false},
    country :{type:String,required:true},
    address :{type:String,required:true},
    notes :{type:String,required:false}

},{timestamps:true})

const User = mongoose.model ("User", userSchema)
module.exports = User;