import express from "express";
import { userController } from "../controllers/user.controller";
import protect from "../common/middlewares/protect.middlewares";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get("/", protect, userController.findOne);
userRouter.put("/", protect, userController.update);
userRouter.delete("/:id", protect, userController.remove);

export default userRouter;
