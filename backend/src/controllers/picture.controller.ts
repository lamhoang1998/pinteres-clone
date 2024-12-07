import { responseSuccess } from "../common/helpers/response.helper";
import { GetAllPictures } from "../common/types";
import { pictureService } from "../services/picture.service";
import { Request, Response, NextFunction } from "express";

export const pictureController = {
	create: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await pictureService.create(req);

			const response = responseSuccess(result, `upload picture successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	getAll: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await pictureService.getAll(req);
			const response = responseSuccess<GetAllPictures>(
				result,
				`get all pictures successfully`
			);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};