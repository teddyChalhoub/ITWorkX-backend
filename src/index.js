import express from "express";
import product from "./routes/Product-route";
import category from "./routes/category-route";
import photo from "./routes/photos-route";
import userRoute from "./routes/user-routes";
import order from "./routes/order-route";
import orderItem from "./routes/orderItems-route";
import service from "./routes/service-route";
import { connectDB } from "./db";
import cors from "cors";
// import {isAdmin, tokenizer} from "./controllers/user-controller";
import path from "path";
import NodeMailer from "./routes/NodeMailer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/product", product);
app.use("/category", category);
app.use("/photo", photo);
app.use("/user", userRoute);
app.use("/order", order);
app.use("/orderItem", orderItem);
app.use("/service", service);
app.use("/NodeMailer", NodeMailer);

const dbConnection = async () => {
  await connectDB();
  app.listen(5000, () => console.log("listening at port 5000"));
};

dbConnection();
