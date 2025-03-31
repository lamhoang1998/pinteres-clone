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
exports.pictureService = void 0;
const init_prisma_1 = require("../common/prisma/init.prisma");
const error_helper_1 = require("../common/helpers/error.helper");
exports.pictureService = {
    create: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const file = req.file;
            if (!file)
                throw new error_helper_1.BadRequestError(`No file in the request`);
            console.log({ body: req.body });
            const newImg = yield init_prisma_1.prisma.images.create({
                data: {
                    imgName: req.body.imgName,
                    url: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename,
                    desc: req.body.desc,
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
                },
            });
            return newImg;
        });
    },
    update: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const imgDetails = yield init_prisma_1.prisma.images.findUnique({
                where: {
                    imgId: +((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.imgId),
                },
            });
            const numberOfKey = Object.keys(req.body).length;
            if (numberOfKey > 3) {
                throw new error_helper_1.BadRequestError(`there is more than required image info`);
            }
            else if (numberOfKey === 0) {
                throw new error_helper_1.BadRequestError(`please give some data about the image that you need to update`);
            }
            for (const key in req.body) {
                if (key !== "imgName" && key !== "desc" && key !== "url") {
                    throw new error_helper_1.BadRequestError(` please submit imgName or desc or url to update the image`);
                }
            }
            const updateImg = yield init_prisma_1.prisma.images.update({
                where: { imgId: +((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.imgId) },
                data: {
                    imgName: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.imgName) ? (_d = req.body) === null || _d === void 0 ? void 0 : _d.imgName : imgDetails === null || imgDetails === void 0 ? void 0 : imgDetails.imgName,
                    url: ((_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.filename) ? (_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.filename : imgDetails === null || imgDetails === void 0 ? void 0 : imgDetails.url,
                    desc: req.body.desc ? req.body.desc : imgDetails === null || imgDetails === void 0 ? void 0 : imgDetails.desc,
                },
            });
            return `success`;
        });
    },
    getAll: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let page = 0;
            let pageSize = 0;
            page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? +req.query.page : 1;
            pageSize = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.pageSize) ? +req.query.pageSize : 3;
            console.log({ pageSize: (_c = req.query) === null || _c === void 0 ? void 0 : _c.pageSize });
            const totalItem = yield init_prisma_1.prisma.images.count();
            console.log({ totalItem });
            const totalPage = Math.ceil(totalItem / pageSize);
            console.log({ totalPage });
            const allPictures = yield init_prisma_1.prisma.images.findMany({
                // take: pageSize,
                // skip: (page - 1) * pageSize,
                include: {
                    users: true,
                },
                orderBy: {
                    created_at: `desc`,
                },
            });
            return {
                pageSize,
                page,
                totalItem,
                totalPage,
                items: allPictures || [],
            };
        });
    },
    //send name as query to request
    searchPicture: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = "";
            name = req.query.name ? req.query.name : "";
            if (!name)
                throw new error_helper_1.BadRequestError(`please enter something to search`);
            const searchedPictures = yield init_prisma_1.prisma.images.findMany({
                where: {
                    imgName: {
                        startsWith: name,
                    },
                },
                include: { users: true },
            });
            return searchedPictures;
        });
    },
    getPictureDetails: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log({ id });
            const pictureDetails = yield init_prisma_1.prisma.images.findUnique({
                where: { imgId: +id },
                select: {
                    imgId: true,
                    imgName: true,
                    url: true,
                    desc: true,
                    users: { select: { userId: true, fullName: true, avatar: true } },
                },
            });
            return pictureDetails;
        });
    },
    savedPictureListByUser: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const savedImage = yield init_prisma_1.prisma.users.findUnique({
                where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId },
                select: {
                    userId: true,
                    savedimage: {
                        select: { images: true },
                    },
                },
            });
            if (!savedImage) {
                return null;
            }
            // Transform the data to the desired structure
            const savedImageFlattened = {
                userId: savedImage.userId,
                images: savedImage.savedimage.map((savedImage) => savedImage.images),
            };
            return savedImageFlattened;
        });
    },
    createdPicturesList: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const createdPictures = yield init_prisma_1.prisma.users.findUnique({
                where: {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                },
                select: {
                    userId: true,
                    images: true,
                },
            });
            return createdPictures;
        });
    },
    savedPicture: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (!req.params.imgId)
                throw new error_helper_1.BadRequestError(`please send the id of the picture that you want to save`);
            const createdByUser = yield init_prisma_1.prisma.images.findUnique({
                where: { imgId: +req.params.imgId },
                select: { userId: true },
            });
            const savedByUser = yield init_prisma_1.prisma.savedimage.findFirst({
                where: {
                    imgId: +req.params.imgId,
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                },
                select: { userId: true },
            });
            console.log({ savedByUser });
            if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId) === (createdByUser === null || createdByUser === void 0 ? void 0 : createdByUser.userId))
                throw new error_helper_1.BadRequestError(`This picture is created by user, please send another imgId`);
            if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === (savedByUser === null || savedByUser === void 0 ? void 0 : savedByUser.userId))
                throw new error_helper_1.BadRequestError(`This picture was already created by the user before`);
            const savedPicture = yield init_prisma_1.prisma.savedimage.create({
                data: {
                    imgId: +req.params.imgId,
                    userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId,
                },
            });
            return savedPicture;
        });
    },
    savedImgByUser: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const savedImg = yield init_prisma_1.prisma.savedimage.findFirst({
                where: {
                    imgId: +req.params.imgId,
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                },
                select: {
                    userId: true,
                },
            });
            return savedImg;
        });
    },
    deletePicture: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.imgId);
            const deletedImg = yield init_prisma_1.prisma.images.delete({
                where: {
                    imgId: +req.params.imgId,
                },
            });
            return deletedImg;
        });
    },
};
