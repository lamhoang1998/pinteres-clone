"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = responseSuccess;
exports.responseError = responseError;
function responseSuccess(metaData, message = "ok", code = 200) {
    return {
        status: "success",
        message,
        code,
        metaData,
    };
}
function responseError(message = "Internal Server Error", code = 500, stack = null) {
    return {
        status: "error",
        code,
        message,
        stack,
    };
}
