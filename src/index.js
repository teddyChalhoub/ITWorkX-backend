import express from "express";
import product from "./routes/Product-route";
import category from "./routes/category-route";
import photo from "./routes/photos-route";
import order from "./routes/order-route";
import orderItem from "./routes/orderItems-route";
import { connectDB } from "./db";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/product", product);
app.use("/category", category);
app.use("/photo", photo);
app.use("/order", order);
app.use("/orderItem", orderItem);

const dbConnection = async () => {
  await connectDB();
  app.listen(5000, () => console.log("listening at port 5000"));
};

dbConnection();
