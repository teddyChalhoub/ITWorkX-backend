import express from "express";
import orderController from "../controllers/order-controller";
import { tokenizer } from "../controllers/user-controller";

const router = express.Router();

router.get("/",tokenizer, orderController.getAllOrders);
router.get("/userOrder",tokenizer, orderController.getAllOrdersByUser);
router.post("/add", tokenizer,orderController.addOrder);
router.put("/update/:id",tokenizer, orderController.updateOrder);
router.delete("/delete/:id", tokenizer,orderController.deleteOrder);

module.exports = router;
