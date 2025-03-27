"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const picture_router_1 = __importDefault(require("./picture.router"));
const comment_router_1 = __importDefault(require("./comment.router"));
const user_router_1 = __importDefault(require("./user.router"));
const rootRouter = express_1.default.Router();
rootRouter.get(`/`, (request, response, next) => {
    response.json(`ok`);
});
rootRouter.use("/auth", auth_router_1.default);
rootRouter.use("/picture", picture_router_1.default);
rootRouter.use("/comment", comment_router_1.default);
rootRouter.use("/user", user_router_1.default);
exports.default = rootRouter;
