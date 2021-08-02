import express from "express";
import {
  getProducts,
  getProductsByTitle,
  addProducts,
  updateProductsById,
  deleteProductsById,
} from "../controllers/Product-controller.js";

const router = express.Router();

router.use("/", (req, res, next) => next());

router.get("/", getProducts);
router.get("/:title", getProductsByTitle);
router.post("/add", addProducts);
router.put("/update/:id", updateProductsById);
router.delete("/delete/:id", deleteProductsById);

export default router;
