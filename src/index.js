import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db";
import cors from "cors";
import userRoute from "./routes/user-routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user",userRoute);

const dbConnection = async () => {
    await connectDB();
    app.listen(5000, () => console.log("listening at port 5000"));
}
app.use('/api' , userRoute)
dbConnection();



