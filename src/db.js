import mongoose from "mongoose";
import express from "express";
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://teddy92:teddy123456@itworkx.6iufq.mongodb.net/ITWorkX-DB?retryWrites=true&w=majority`, {
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