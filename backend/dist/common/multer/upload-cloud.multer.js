"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCloudImage = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const app_constant_1 = require("../constant/app.constant");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dsjzgh93p",
    api_key: "614562374816669",
    api_secret: app_constant_1.CLOUDINARY_SECRET_KEY,
});
const deleteCloudImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!publicId) {
        console.log({ publicId });
        return true;
    }
    const data = yield cloudinary_1.v2.uploader.destroy(publicId);
    if ((data === null || data === void 0 ? void 0 : data.result) === `ok`) {
        console.log({ deleted: publicId });
        return true;
    }
    else {
        console.log(`Không thể xóa file ${publicId} trên Cloudinary: ${data === null || data === void 0 ? void 0 : data.error.message}`);
        return false;
    }
});
exports.deleteCloudImage = deleteCloudImage;
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "images",
        };
    }),
});
const uploadCloud = (0, multer_1.default)({ storage: storage });
exports.default = uploadCloud;
