import { responseSuccess } from "../common/helpers/response.helper";
import { commentService } from "../services/comment.service";
import { Request, Response, NextFunction } from "express";

export const commentController = {
	create: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await commentService.create(req);
			const response = responseSuccess(result, `Create comment successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
	getComment: async function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = await commentService.getComment(req);
			const response = responseSuccess(result, `Get comment successfully`);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	},
};
