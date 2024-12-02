import { ResponseError, ResponseSuccess } from "../types";

export function responseSuccess(message = "ok", code = 200): ResponseSuccess {
	return {
		status: "success",
		message,
		code,
	};
}

export function responseError(
	message = "Internal Server Error",
	code = 500,
	stack = null
): ResponseError {
	return {
		status: "error",
		code,
		message,
		stack,
	};
}
