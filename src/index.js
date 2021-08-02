import express from "express";
import product from "./routes/Product-route.js";
import category from "./routes/category-route.js";
import photo from "./routes/photos-route.js";
import userRoute from "./routes/user-routes.js";
import order from "./routes/order-route.js";
import orderItem from "./routes/orderItems-route.js";
import service from "./routes/service-route.js";
import { connectDB } from "./db.js";
// import {isAdmin, tokenizer} from "./controllers/user-controller";
import path, { dirname } from "path";
import NodeMailer from "./routes/NodeMailer.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use(express.static(path.resolve(__dirname, "../ITWorkX-frontend/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../ITWorkX-frontend/build", "index.html")
  );
});

const dbConnection = async () => {
  await connectDB;
  app.listen(PORT, "0.0.0.0", () => console.log("listening at port " + PORT));
};

dbConnection();
