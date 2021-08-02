import express from "express";
import {
  getAllOrderItems,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItems-controller.js";
import { tokenizer } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", tokenizer, getAllOrderItems);
router.post("/add", tokenizer, addOrderItem);
router.put("/update/:id", tokenizer, updateOrderItem);
router.delete("/delete/:id", tokenizer, deleteOrderItem);

export default router;
