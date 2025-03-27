"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLocal = exports.deleteLocalImage = exports.storageLocal = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_multer_1 = require("./config.multer");
// make sure the folder storing images exist
if (!fs_1.default.existsSync(config_multer_1.UPLOAD_DIR)) {
    fs_1.default.mkdirSync(config_multer_1.UPLOAD_DIR, { recursive: true });
}
exports.storageLocal = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config_multer_1.UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, `local-${uniqueSuffix}${fileExtension}`);
    },
});
const deleteLocalImage = (filename) => {
    const filePath = path_1.default.join(config_multer_1.UPLOAD_DIR, filename);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.log(`Không thể xóa file ${filename}: ${err === null || err === void 0 ? void 0 : err.message}`);
        }
        else {
            console.log({ deleted: filename });
        }
    });
};
exports.deleteLocalImage = deleteLocalImage;
exports.uploadLocal = (0, multer_1.default)({
    storage: exports.storageLocal,
    limits: { fileSize: config_multer_1.MAX_FILE_SIZE },
    fileFilter: config_multer_1.fileFilter,
});
