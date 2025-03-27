"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const protect_middlewares_1 = __importDefault(require("../common/middlewares/protect.middlewares"));
const commentRouter = express_1.default.Router();
// Tạo route CRUD
commentRouter.post("/add-comment", protect_middlewares_1.default, comment_controller_1.commentController.create);
commentRouter.get("/get-comment", protect_middlewares_1.default, comment_controller_1.commentController.getComment);
commentRouter.post("/reply-to-comment", protect_middlewares_1.default, comment_controller_1.commentController.replyToComment);
commentRouter.get("/get-comments", protect_middlewares_1.default, comment_controller_1.commentController.getComments);
commentRouter.get("/get-replies", protect_middlewares_1.default, comment_controller_1.commentController.getReplies);
exports.default = commentRouter;
