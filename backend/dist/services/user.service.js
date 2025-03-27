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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const init_prisma_1 = require("../common/prisma/init.prisma");
const error_helper_1 = require("../common/helpers/error.helper");
const upload_local_multer_1 = require("../common/multer/upload-local.multer");
const upload_cloud_multer_1 = require("../common/multer/upload-cloud.multer");
const config_multer_1 = require("../common/multer/config.multer");
const __1 = require("..");
exports.userService = {
    findOne: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield init_prisma_1.prisma.users.findUnique({
                where: {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                },
            });
            console.log({ user });
            return user;
        });
    },
    update: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const updatedUser = yield init_prisma_1.prisma.users.update({
                where: {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                },
                data: {
                    email: (_b = req.body) === null || _b === void 0 ? void 0 : _b.email,
                    fullName: (_c = req.body) === null || _c === void 0 ? void 0 : _c.fullName,
                },
            });
            return updatedUser;
        });
    },
    remove: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            return `This action removes a id: ${req.params.id} user`;
        });
    },
    getInfo: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userInfo = yield init_prisma_1.prisma.users.findUnique({
                where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId },
            });
            console.log({ userInfo });
            return userInfo;
        });
    },
    uploadAvatar: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            console.log({ file: req === null || req === void 0 ? void 0 : req.file });
            const file = req.file;
            if (!file)
                throw new error_helper_1.BadRequestError(`Not file`);
            const isImgLocal = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.avatar) === null || _b === void 0 ? void 0 : _b.includes("local");
            console.log({ isImgLocal });
            if (isImgLocal) {
                (0, upload_local_multer_1.deleteLocalImage)((_c = req.user) === null || _c === void 0 ? void 0 : _c.avatar);
            }
            else {
                yield (0, upload_cloud_multer_1.deleteCloudImage)((_d = req.user) === null || _d === void 0 ? void 0 : _d.avatar);
            }
            const updatedUserInfo = yield init_prisma_1.prisma.users.update({
                where: { userId: (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId },
                data: { avatar: file.filename },
            });
            return {
                folder: config_multer_1.UPLOAD_DIR,
                filename: file.filename,
                imgUrl: isImgLocal
                    ? `${`http://localhost:${__1.PORT}`}/${file.path}`
                    : file.path,
            };
        });
    },
};
