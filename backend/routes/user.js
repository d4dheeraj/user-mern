import express from "express";
import { createUser, getAllUser } from "../controller/user.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/create", createUser);

export default userRouter;
