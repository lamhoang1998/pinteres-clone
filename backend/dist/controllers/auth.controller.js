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
exports.authController = void 0;
const response_helper_1 = require("../common/helpers/response.helper");
const auth_service_1 = require("../services/auth.service");
exports.authController = {
    register: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield auth_service_1.authService.register(req);
                console.log({ result });
                const response = (0, response_helper_1.responseSuccess)(result, `registered successfully`);
                console.log({ response });
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    login: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield auth_service_1.authService.login(req);
                const response = (0, response_helper_1.responseSuccess)(result, `login successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    refreshToken: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield auth_service_1.authService.refreshToken(req);
                const response = (0, response_helper_1.responseSuccess)(result, `successfully sent back token`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
