import { Router } from "express";
import { logIn, register } from "../controllers/user-controller"
// import userController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/register" , register);
userRouter.post("/login", logIn);

// module.exports = router;

export default userRouter;