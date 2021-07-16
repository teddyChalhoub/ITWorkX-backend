import express from "express";
// import mongoose from "mongoose";
import { connectDB } from "./db";
import cors from "cors";
import userRoute from "./routes/user-routes";
import {isAdmin, tokenizer} from "./controllers/user-controller";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user",userRoute);

const dbConnection = async () => {
    await connectDB();
    app.listen(5000, () => console.log("listening at port 5000"));
}
dbConnection();



