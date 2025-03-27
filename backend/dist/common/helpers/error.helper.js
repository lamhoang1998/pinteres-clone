"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ForbiddenError = exports.BadRequestError = exports.handleError = void 0;
const response_helper_1 = require("./response.helper");
const handleError = (err, req, res, next) => {
    const resData = (0, response_helper_1.responseError)(err.message, err.code);
    if (resData.message === "jwt expired")
        resData.code = 403;
    console.log({ resData });
    res.status(resData.code).json(resData);
};
exports.handleError = handleError;
class BadRequestError extends Error {
    constructor(message = "BadRequestError") {
        super(message);
        this.code = 400;
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.code = 403;
    }
}
exports.ForbiddenError = ForbiddenError;
class UnauthorizedError extends Error {
    constructor(message = "UnauthorizedError") {
        super(message);
        this.code = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
