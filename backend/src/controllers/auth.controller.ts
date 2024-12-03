import { responseSuccess } from "../common/helpers/response.helper";
import { LoginResponse, RefreshToken, RegisterResponse } from "../common/types";
import { authService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

export const authController = {
	register: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.register(req);
			console.log({ result });
			const response = responseSuccess<RegisterResponse>(
				result,
				`registered successfully`
			);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	login: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.login(req);
			const response = responseSuccess<LoginResponse>(
				result,
				`login successfully`
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	refreshToken: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await authService.refreshToken(req);
			const response = responseSuccess<RefreshToken>(
				result,
				`successfully sent back token`
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
