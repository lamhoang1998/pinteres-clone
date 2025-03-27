"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.ALLOWED_FORMATS = exports.MAX_FILE_SIZE = exports.UPLOAD_DIR = void 0;
const path_1 = __importDefault(require("path"));
const error_helper_1 = require("../helpers/error.helper");
exports.UPLOAD_DIR = "images/";
exports.MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB
exports.ALLOWED_FORMATS = ["jpg", "jpeg", "png", "gif", "webp", "jfif"];
const fileFilter = (req, file, cb) => {
    const fileExtension = path_1.default.extname(file.originalname);
    if (exports.ALLOWED_FORMATS.includes(fileExtension.slice(1))) {
        cb(null, true);
    }
    else {
        cb(new error_helper_1.BadRequestError(`Không hỗ trợ định dạng ${fileExtension}`));
    }
};
exports.fileFilter = fileFilter;
