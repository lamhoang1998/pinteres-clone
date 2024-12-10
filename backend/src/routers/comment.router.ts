import express from "express";
import { commentController } from "../controllers/comment.controller";
import protect from "../common/middlewares/protect.middlewares";

const commentRouter = express.Router();

// Tạo route CRUD
commentRouter.post("/add-comment", protect, commentController.create);
commentRouter.get("/get-comment", protect, commentController.getComment);

export default commentRouter;
