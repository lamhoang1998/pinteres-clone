import fs from "fs";
import multer from "multer";
import path from "path";
import { fileFilter, MAX_FILE_SIZE, UPLOAD_DIR } from "./config.multer";

// make sure the folder storing images exist
if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const storageLocal = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, UPLOAD_DIR);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = path.extname(file.originalname);
		cb(null, `local-${uniqueSuffix}${fileExtension}`);
	},
});

export const deleteLocalImage = (filename: string) => {
	const filePath = path.join(UPLOAD_DIR, filename);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(`Không thể xóa file ${filename}: ${err?.message}`);
		} else {
			console.log({ deleted: filename });
		}
	});
};

export const uploadLocal = multer({
	storage: storageLocal,
	limits: { fileSize: MAX_FILE_SIZE },
	fileFilter: fileFilter,
});
