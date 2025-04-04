import { responseSuccess } from "../common/helpers/response.helper";
import { LoginResponse, RefreshToken, RegisterResponse } from "../common/types";
import { authService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

export const authController = {
	register: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.register(req);
			const response = responseSuccess(result, `registered successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	login: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.login(req);
			const response = responseSuccess(result, `login successfully`);
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
			const response = responseSuccess(result, `successfully sent back token`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	verifyToken: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await authService.verifyToken(req);
			const response = responseSuccess(result, `successfully verified email`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
