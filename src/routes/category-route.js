import express from "express";
import category_Controller from "../controllers/Category-controller"

const router = express.Router();

router.use("/", (req, res, next) => next());

router.get("/", category_Controller.getCategory);
router.post("/add", category_Controller.addCategory);
router.put("/update/:id", category_Controller.updateCategory);
router.delete("/delete/:id",category_Controller.deleteCategory);

module.exports = router;
