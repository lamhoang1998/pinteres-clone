"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILTRAP_TOKEN = exports.CLOUDINARY_SECRET_KEY = exports.REFRESH_TOKEN_EXPIRED = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_EXPIRED = exports.ACCESS_TOKEN_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED;
exports.CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
exports.MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
console.log({
    ACCESS_TOKEN_SECRET: exports.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRED: exports.ACCESS_TOKEN_EXPIRED,
    REFRESH_TOKEN_SECRET: exports.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRED: exports.REFRESH_TOKEN_EXPIRED,
    CLOUDINARY_SECRET_KEY: exports.CLOUDINARY_SECRET_KEY,
    MAILTRAP_TOKEN: exports.MAILTRAP_TOKEN,
});
