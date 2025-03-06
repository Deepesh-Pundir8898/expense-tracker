import express from "express";
import { userSignup, userLogin } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", userSignup);
userRouter.post("/login", userLogin);

export default userRouter;
