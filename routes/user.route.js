import express from "express";
import { userSignup, userLogin } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userSignup);

export default userRouter;
