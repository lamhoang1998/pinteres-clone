"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
// Tạo route CRUD
authRouter.post("/register", auth_controller_1.authController.register);
authRouter.post("/login", auth_controller_1.authController.login);
authRouter.post("/refresh-token", auth_controller_1.authController.refreshToken);
exports.default = authRouter;
