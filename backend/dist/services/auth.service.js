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
exports.authService = void 0;
const init_prisma_1 = require("../common/prisma/init.prisma");
const error_helper_1 = require("../common/helpers/error.helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_service_1 = __importDefault(require("./token.service"));
const app_constant_1 = require("../common/constant/app.constant");
const sendEmail_email_1 = __importDefault(require("../common/email/sendEmail.email"));
exports.authService = {
    register: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, passWord, fullName } = req.body;
            const userExist = yield init_prisma_1.prisma.users.findFirst({
                where: {
                    email,
                },
            });
            if (userExist)
                throw new error_helper_1.BadRequestError(`Email already existed, please give another email`);
            const hashPassword = bcrypt_1.default.hashSync(passWord, 10);
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const verificationTokenExpiresAt = expirationTime.toISOString();
            const newUser = yield init_prisma_1.prisma.users.create({
                data: {
                    email,
                    fullName: fullName,
                    passWord: hashPassword,
                    verificationToken: verificationToken,
                    verificationTokenExpiresAt: verificationTokenExpiresAt,
                },
            });
            (0, sendEmail_email_1.default)(newUser.email, verificationToken);
            return newUser;
        });
    },
    login: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, passWord } = req.body;
        const userExists = yield init_prisma_1.prisma.users.findFirst({
            where: { email },
            select: { userId: true, email: true, avatar: true, passWord: true },
        });
        console.log({ userExists });
        if (!userExists)
            throw new error_helper_1.BadRequestError("The email doesn't exist, please register");
        const passHash = userExists.passWord;
        const match = bcrypt_1.default.compareSync(passWord, passHash);
        if (!match)
            throw new error_helper_1.BadRequestError(`you entered the wrong password, please reenter or register`);
        const tokens = token_service_1.default.createTokens(userExists);
        console.log({ tokens });
        return {
            userId: userExists.userId,
            email: userExists.email,
            avatar: userExists.avatar,
            tokens,
        };
    }),
    refreshToken: (req) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const refreshToken = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const accessToken = req.headers[`x-access-token`];
        console.log({ header: req.headers.authorization });
        console.log({ refreshToken, accessToken });
        if (!refreshToken)
            throw new error_helper_1.UnauthorizedError();
        if (!accessToken)
            throw new error_helper_1.UnauthorizedError();
        // the verify method check even the expire time, so we use the ignoreExpiration options to omit it, only check if the accesstoken sent to backend from request match access token secret
        const decodeRefreshToken = jsonwebtoken_1.default.verify(refreshToken, app_constant_1.REFRESH_TOKEN_SECRET);
        const decodeAccessToken = jsonwebtoken_1.default.verify(accessToken, app_constant_1.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: true,
        });
        console.log({ decodeRefreshToken, decodeAccessToken });
        if (decodeRefreshToken.userId !== decodeAccessToken.userId)
            throw new error_helper_1.UnauthorizedError();
        const user = yield init_prisma_1.prisma.users.findUnique({
            where: {
                userId: decodeRefreshToken.userId,
            },
            select: { userId: true, passWord: true },
        });
        const tokens = token_service_1.default.createTokens(user);
        return tokens;
    }),
    verifyToken: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { verificationToken } = req.body;
        if (verificationToken && typeof verificationToken === "string") {
            const user = yield init_prisma_1.prisma.users.findFirst({
                where: { verificationToken: verificationToken },
            });
            const submittedDate = new Date();
            if (user && (user === null || user === void 0 ? void 0 : user.verificationTokenExpiresAt)) {
                if (submittedDate <= (user === null || user === void 0 ? void 0 : user.verificationTokenExpiresAt)) {
                    yield init_prisma_1.prisma.users.update({
                        where: { userId: user.userId },
                        data: {
                            isVerified: true,
                        },
                    });
                }
                else {
                    throw new error_helper_1.BadRequestError("token is invalid");
                }
            }
            return `success`;
        }
        else {
            throw new error_helper_1.BadRequestError("verificationToken is not a string ");
        }
    }),
};
