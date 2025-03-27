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
exports.commentService = void 0;
const error_helper_1 = require("../common/helpers/error.helper");
const init_prisma_1 = require("../common/prisma/init.prisma");
exports.commentService = {
    create: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!req.body)
                throw new error_helper_1.BadRequestError(`please send comment and picture id`);
            const comment = req.body.comment;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const imgId = +req.body.imgId;
            const newComment = yield init_prisma_1.prisma.comments.create({
                data: {
                    userId: userId,
                    imgId: imgId,
                    commentContent: comment,
                    hierachy: 1,
                },
            });
            yield init_prisma_1.prisma.parentchildrencomment.create({
                data: {
                    parentCommentId: newComment.commentId,
                    childrenCommentId: newComment.commentId,
                },
            });
            console.log({ newComment });
            return `ok`;
        });
    },
    getComment: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const imgId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.imgId;
            if (!imgId)
                throw new error_helper_1.BadRequestError(`there is no image id to get comments`);
            const comments = yield init_prisma_1.prisma.comments.findMany({
                where: { imgId: +imgId },
                select: {
                    imgId: true,
                    commentId: true,
                    commentContent: true,
                    users: true,
                },
            });
            return comments;
        });
    },
    replyToComment: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            console.log({ body: req === null || req === void 0 ? void 0 : req.body });
            if (!req.body)
                throw new error_helper_1.BadRequestError(`please send properties to da body`);
            const parentHierachy = yield init_prisma_1.prisma.comments.findFirst({
                where: { commentId: +((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.parentId) },
                select: { hierachy: true },
            });
            console.log({ parentHierachy });
            const newReplyComment = yield init_prisma_1.prisma.comments.create({
                data: {
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
                    imgId: +((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.imgId),
                    commentContent: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.reply,
                    hierachy: (parentHierachy === null || parentHierachy === void 0 ? void 0 : parentHierachy.hierachy) && parentHierachy.hierachy + 1,
                },
            });
            const isParentinParentChildrenTable = yield init_prisma_1.prisma.parentchildrencomment.findFirst({
                where: {
                    parentCommentId: +((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.parentId),
                    childrenCommentId: +((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.parentId),
                },
            });
            if (!isParentinParentChildrenTable) {
                yield init_prisma_1.prisma.parentchildrencomment.create({
                    data: {
                        parentCommentId: +((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.parentId),
                        childrenCommentId: +((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.parentId),
                    },
                });
            }
            const previousParent = yield init_prisma_1.prisma.parentchildrencomment.findMany({
                where: {
                    childrenCommentId: +((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.parentId),
                },
                select: { parentCommentId: true },
            });
            yield init_prisma_1.prisma.parentchildrencomment.createMany({
                data: previousParent.map((parent) => ({
                    parentCommentId: parent.parentCommentId,
                    childrenCommentId: newReplyComment.commentId,
                })),
            });
            return `replyToComment`;
        });
    },
    getComments: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const imgId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.imgId;
            if (!imgId)
                throw new error_helper_1.BadRequestError(`there is no image id to get comments`);
            const comments = yield init_prisma_1.prisma.comments.findMany({
                where: { imgId: +imgId, hierachy: 1 },
                select: {
                    commentId: true,
                    commentContent: true,
                    hierachy: true,
                    users: { select: { userId: true, fullName: true, avatar: true } },
                },
            });
            return comments;
        });
    },
    getReplies: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const imgId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.imgId;
            const parentId = (_b = req.query) === null || _b === void 0 ? void 0 : _b.parentId;
            const hierachy = (_c = req.query) === null || _c === void 0 ? void 0 : _c.hierachy;
            console.log({ parentId });
            if (!imgId || !parentId || !hierachy)
                throw new error_helper_1.BadRequestError("please give queries!");
            const reply = yield init_prisma_1.prisma.comments.findMany({
                where: {
                    imgId: +imgId,
                    hierachy: +hierachy,
                    parentchildrencomment_parentchildrencomment_childrenCommentIdTocomments: {
                        some: {
                            parentCommentId: +parentId,
                        },
                    },
                },
                select: {
                    commentId: true,
                    commentContent: true,
                    hierachy: true,
                    users: { select: { userId: true, fullName: true, avatar: true } },
                },
            });
            return reply;
        });
    },
};
