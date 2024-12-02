import { responseSuccess } from "../common/helpers/response.helper";
import { authService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

export const authController = {
	register: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.create(req);
			const response = responseSuccess(`Create auth successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
