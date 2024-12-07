import { responseSuccess } from "../common/helpers/response.helper";
import { pictureService } from "../services/picture.service";
import { Request, Response, NextFunction } from "express";

export const pictureController = {
	create: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await pictureService.create(req);
			const response = responseSuccess(result, `Create picture successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
