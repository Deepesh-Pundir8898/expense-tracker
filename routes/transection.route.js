import express from "express";

import {
  addTransection,
  editTransection,
  deleteTransection,
  getAllTransection,
} from "../controllers/transection.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//router object
const transectionRouter = express.Router();

//routes
//add transection POST MEthod
transectionRouter.post("/add-transection", addTransection);
//Edit transection POST MEthod
transectionRouter.post("/edit-transection", editTransection);
//Delete transection POST MEthod
transectionRouter.post("/delete-transection", deleteTransection);

//get transections
transectionRouter.post("/get-transection", getAllTransection);

export default transectionRouter;
