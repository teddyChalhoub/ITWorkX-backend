import express from "express";
import orderItemsController from "../controllers/orderItems-controller";

const router = express.Router();

router.get("/", orderItemsController.getAllOrderItems);
router.post("/add", orderItemsController.addOrderItem);
router.put("/update/:id", orderItemsController.updateOrderItem);
router.delete("/delete/:id",orderItemsController.deleteOrderItem);

module.exports = router;
