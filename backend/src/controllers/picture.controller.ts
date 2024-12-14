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
			const response = responseSuccess(result, `get all pictures successfully`);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	searchPicture: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await pictureService.searchPicture(req);
			const response = responseSuccess(result, `get pictures successfully`);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	getPictureDetails: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await pictureService.getPictureDetails(req);
			const response = responseSuccess(
				result,
				`get pictures' details successfully`
			);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},

	saveImg: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await pictureService.saveImg(req);
			const response = responseSuccess(result, `saved pictures successfully`);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	createdPicturesList: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await pictureService.createdPicturesList(req);
			const response = responseSuccess(
				result,
				`get pictures created by user successfully`
			);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	savedPicturesList: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await pictureService.savedPicturesList(req);
			const response = responseSuccess(
				result,
				`get pictures created by user successfully`
			);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	deletePicture: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await pictureService.deletePicture(req);
			const response = responseSuccess(result, ` delete picture sucessfully`);
			console.log({ response });
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
