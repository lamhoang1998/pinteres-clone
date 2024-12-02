import { ResponseError, ResponseSuccess } from "../types";

export function responseSuccess<T>(
	metaData: T,
	message = "ok",
	code = 200
): ResponseSuccess<T> {
	return {
		status: "success",
		message,
		code,
		metaData,
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
