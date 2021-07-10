import { Router } from "express";
import userController, { addUser, getUser, register } from "../controllers/user-controller"
// import userController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post('/register' , register);
userRouter.get("/", getUser);
userRouter.get("/add", addUser);

// module.exports = router;

export default userRouter;