import express from "express";
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Category-controller.js";

const router = express.Router();

router.use("/", (req, res, next) => next());

router.get("/", getCategory);
router.post("/add", addCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
