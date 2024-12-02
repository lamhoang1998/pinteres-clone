"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootRouter = express_1.default.Router();
rootRouter.get(`/`, (request, response, next) => {
    response.json(`ok`);
});
exports.default = rootRouter;
