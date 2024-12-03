import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { responseError } from "./response.helper";

export const handleError: ErrorRequestHandler = (
	err,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const resData = responseError(err.message, err.code);
	console.log(resData);
	res.status(resData.code).json(resData);
};

export class BadRequestError extends Error {
	public code: number;
	constructor(message = "BadRequestError") {
		super(message);
		this.code = 400;
	}
}

export class ForbiddenError extends Error {
	public code: number;
	constructor(message = "Forbidden") {
		super(message);
		this.code = 403;
	}
}

export class UnauthorizedError extends Error {
	public code: number;
	constructor(message = "UnauthorizedError") {
		super(message);
		this.code = 401;
	}
}
