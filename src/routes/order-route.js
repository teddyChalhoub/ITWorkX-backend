import express from "express";
import {
  getAllOrdersById,
  getAllOrdersByUser,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order-controller.js";
import { tokenizer } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", tokenizer, getAllOrdersById);
router.get("/userOrder", tokenizer, getAllOrdersByUser);
router.post("/add", tokenizer, addOrder);
router.put("/update/:id", tokenizer, updateOrder);
router.delete("/delete/:id", tokenizer, deleteOrder);

export default router;
