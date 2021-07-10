import express from "express";
import userController from "../controllers/user-controller"

const router = express.Router();

router.post('/register' ,userController.register)
router.get("/", userController.getUser);
router.get("/add", userController.addUser);


module.exports = router;