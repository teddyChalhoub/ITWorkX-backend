import express from "express";
import productController from "../controllers/Product-controller";

const router = express.Router();

router.use("/", (req, res, next) => next());

router.get("/", productController.getProducts);
router.get("/:title", productController.getProductsByTitle);
router.post("/add", productController.addProducts);
router.put("/update/:id", productController.updateProductsById);
router.delete("/delete/:id", productController.deleteProductsById);

module.exports = router;
