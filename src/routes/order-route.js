import express from "express";
import orderController from "../controllers/order-controller";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post("/add", orderController.addOrder);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
