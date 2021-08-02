import express from "express";
import product from "./routes/Product-route";
import category from "./routes/category-route";
import photo from "./routes/photos-route";
import userRoute from "./routes/user-routes";
import order from "./routes/order-route";
import orderItem from "./routes/orderItems-route";
import service from "./routes/service-route";
import { connectDB } from "./db";
const path = require("path");
// import {isAdmin, tokenizer} from "./controllers/user-controller";
import path from "path";
import NodeMailer from "./routes/NodeMailer";

const PORT = process.env.PORT || 3001;

const app = express();

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

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const dbConnection = async () => {
  await connectDB();
  app.listen(PORT, () => console.log("listening at port " + PORT));
};

dbConnection();
