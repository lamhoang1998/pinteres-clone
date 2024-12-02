import { responseSuccess } from "../common/helpers/response.helper";
import { RegisterResponse } from "../common/types";
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
};
