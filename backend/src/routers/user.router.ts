import express from "express";
import { userController } from "../controllers/user.controller";
import protect from "../common/middlewares/protect.middlewares";
import uploadCloud from "../common/multer/upload-cloud.multer";
import { uploadLocal } from "../common/multer/upload-local.multer";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get("/", protect, userController.findOne);
userRouter.put("/", protect, userController.update);
userRouter.delete("/:id", protect, userController.remove);
userRouter.get("/getinfo", protect, userController.getInfo);

userRouter.put(
	"/uploadAvatarLocal",
	protect,
	uploadLocal.single("avatar"),
	userController.uploadAvatarLocal
);

userRouter.put(
	"/uploadAvatarCloud",
	protect,
	uploadCloud.single("avatar"),
	userController.uploadAvatarCloud
);

export default userRouter;
