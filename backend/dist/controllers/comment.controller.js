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
exports.commentController = void 0;
const response_helper_1 = require("../common/helpers/response.helper");
const comment_service_1 = require("../services/comment.service");
exports.commentController = {
    create: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comment_service_1.commentService.create(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Create comment successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getComment: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comment_service_1.commentService.getComment(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Get comment successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    replyToComment: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comment_service_1.commentService.replyToComment(req);
                const response = (0, response_helper_1.responseSuccess)(result, `replied successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getComments: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comment_service_1.commentService.getComments(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Get comments successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getReplies: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield comment_service_1.commentService.getReplies(req);
                const response = (0, response_helper_1.responseSuccess)(result, `Get replies successfully`);
                res.status(response.code).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
