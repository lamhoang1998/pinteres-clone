"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_constant_1 = require("../common/constant/app.constant");
const tokenService = {
    createTokens: (user) => {
        const accessToken = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.userId }, app_constant_1.ACCESS_TOKEN_SECRET, {
            expiresIn: app_constant_1.ACCESS_TOKEN_EXPIRED,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.userId }, app_constant_1.REFRESH_TOKEN_SECRET, {
            expiresIn: app_constant_1.REFRESH_TOKEN_EXPIRED,
        });
        return { accessToken, refreshToken };
    },
};
exports.default = tokenService;
