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
exports.pictureController = void 0;
const response_helper_1 = require("../common/helpers/response.helper");
const picture_service_1 = require("../services/picture.service");
exports.pictureController = {
    create: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.create(req);
                const response = (0, response_helper_1.responseSuccess)(result, `upload picture successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    update: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.update(req);
                const response = (0, response_helper_1.responseSuccess)(result, `upload picture successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getAll: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.getAll(req);
                const response = (0, response_helper_1.responseSuccess)(result, `get all pictures successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    searchPicture: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.searchPicture(req);
                const response = (0, response_helper_1.responseSuccess)(result, `get pictures successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getPictureDetails: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.getPictureDetails(req);
                const response = (0, response_helper_1.responseSuccess)(result, `get pictures' details successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    savedPictureListByUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.savedPictureListByUser(req);
                const response = (0, response_helper_1.responseSuccess)(result, `saved pictures successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createdPicturesList: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.createdPicturesList(req);
                const response = (0, response_helper_1.responseSuccess)(result, `get pictures created by user successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    savedPicture: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.savedPicture(req);
                const response = (0, response_helper_1.responseSuccess)(result, `saved picture successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    savedImgByUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.savedImgByUser(req);
                console.log({ result });
                const response = result === null
                    ? (0, response_helper_1.responseSuccess)(result, `this picture is not created by the user`)
                    : (0, response_helper_1.responseSuccess)(result, `get picture created by user successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deletePicture: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield picture_service_1.pictureService.deletePicture(req);
                const response = (0, response_helper_1.responseSuccess)(result, ` delete picture sucessfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
