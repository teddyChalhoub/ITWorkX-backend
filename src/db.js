import mongoose from "mongoose";
import express from "express";
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('MongoDB connected!!');
  
    } catch (err) {
        console.log('Failed to connect to MongoDB');
    }
};
 
module.exports = { connectDB };