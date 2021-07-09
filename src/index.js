import express from "express";
import product from "./routes/Product-route"
import category from "./routes/category-route"
import { connectDB } from "./db";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/product",product);
app.use("/category",category);

const dbConnection = async () => {
    await connectDB();
    app.listen(5000, () => console.log("listening at port 5000"));
}

dbConnection();



