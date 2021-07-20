import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db";
import cors from "cors";
import NodeMailer from "./routes/NodeMailer";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/NodeMailer", NodeMailer);

const dbConnection = async () => {
  await connectDB();
  app.listen(5000, () => console.log("listening at port 5000"));
};

dbConnection();
