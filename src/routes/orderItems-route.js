import express from "express";
import orderItemsController from "../controllers/orderItems-controller";
import { tokenizer } from "../controllers/user-controller";

const router = express.Router();

router.get("/", tokenizer, orderItemsController.getAllOrderItems);
router.post("/add",tokenizer, orderItemsController.addOrderItem);
router.put("/update/:id", tokenizer,orderItemsController.updateOrderItem);
router.delete("/delete/:id",tokenizer, orderItemsController.deleteOrderItem);

module.exports = router;
