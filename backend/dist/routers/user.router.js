"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const protect_middlewares_1 = __importDefault(require("../common/middlewares/protect.middlewares"));
const upload_cloud_multer_1 = __importDefault(require("../common/multer/upload-cloud.multer"));
const upload_local_multer_1 = require("../common/multer/upload-local.multer");
const userRouter = express_1.default.Router();
// Tạo route CRUD
userRouter.get("/", protect_middlewares_1.default, user_controller_1.userController.findOne);
userRouter.put("/", protect_middlewares_1.default, user_controller_1.userController.update);
userRouter.delete("/:id", protect_middlewares_1.default, user_controller_1.userController.remove);
userRouter.get("/getinfo", protect_middlewares_1.default, user_controller_1.userController.getInfo);
userRouter.put("/uploadAvatarLocal", protect_middlewares_1.default, upload_local_multer_1.uploadLocal.single("avatar"), user_controller_1.userController.uploadAvatarLocal);
userRouter.put("/uploadAvatarCloud", protect_middlewares_1.default, upload_cloud_multer_1.default.single("avatar"), user_controller_1.userController.uploadAvatarCloud);
exports.default = userRouter;
