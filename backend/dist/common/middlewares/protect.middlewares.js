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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_constant_1 = require("../constant/app.constant");
const init_prisma_1 = require("../prisma/init.prisma");
const error_helper_1 = require("../helpers/error.helper");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const accessToken = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!accessToken)
            throw new error_helper_1.UnauthorizedError(`you haven't sent token yet, please include it `);
        const decodeToken = jsonwebtoken_1.default.verify(accessToken, app_constant_1.ACCESS_TOKEN_SECRET);
        const user = yield init_prisma_1.prisma.users.findUnique({
            where: {
                userId: decodeToken.userId,
            },
            select: {
                userId: true,
                fullName: true,
                avatar: true,
                email: true,
            },
        });
        if (!user)
            throw new error_helper_1.ForbiddenError();
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = protect;
