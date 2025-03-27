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
exports.userController = void 0;
const response_helper_1 = require("../common/helpers/response.helper");
const user_service_1 = require("../services/user.service");
exports.userController = {
    findOne: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.userService.findOne(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Get user #${req.params.id} successfully`);
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
                const result = yield user_service_1.userService.update(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Update user ${result.fullName} successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    remove: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.userService.remove(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Remove user #${req.params.id} successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getInfo: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.userService.getInfo(req);
                const response = (0, response_helper_1.responseSuccess)(result, `get user's info sucessfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    uploadAvatarCloud: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.userService.uploadAvatar(req);
                const response = (0, response_helper_1.responseSuccess)(result, `sucessfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    uploadAvatarLocal: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.userService.uploadAvatar(req);
                const response = (0, response_helper_1.responseSuccess)(result, `sucessfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
