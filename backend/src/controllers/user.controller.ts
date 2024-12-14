import { responseSuccess } from "../common/helpers/response.helper";
import { userService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";

export const userController = {
	findOne: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await userService.findOne(req);
			const response = responseSuccess(
				result,
				`Get user #${req.params.id} successfully`
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	update: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await userService.update(req);
			const response = responseSuccess(
				result,
				`Update user ${result.fullName} successfully`
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	remove: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await userService.remove(req);
			const response = responseSuccess(
				result,
				`Remove user #${req.params.id} successfully`
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
