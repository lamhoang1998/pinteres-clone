import express from "express";
import { authController } from "../controllers/auth.controller";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);

export default authRouter;
