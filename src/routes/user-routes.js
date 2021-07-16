import { Router } from "express";
import userController, { addUser, getUser, logIn, logInUser, register } from "../controllers/user-controller"
// import userController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/register" , register);
userRouter.post("/login", logIn); 
userRouter.get("/", getUser); 
userRouter.get("/add", addUser);

// module.exports = router;

export default userRouter;