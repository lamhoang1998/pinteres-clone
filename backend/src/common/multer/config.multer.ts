import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";
import { BadRequestError } from "../helpers/error.helper";

export const UPLOAD_DIR = "images/";
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB
export const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "gif", "webp", "jfif"];

export const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const fileExtension = path.extname(file.originalname);
	if (ALLOWED_FORMATS.includes(fileExtension.slice(1))) {
		cb(null, true);
	} else {
		cb(new BadRequestError(`Không hỗ trợ định dạng ${fileExtension}`));
	}
};
