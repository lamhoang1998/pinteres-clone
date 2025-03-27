import express from "express";
import { pictureController } from "../controllers/picture.controller";
import protect from "../common/middlewares/protect.middlewares";
import uploadCloud from "../common/multer/upload-cloud.multer";

const pictureRouter = express.Router();

// Tạo route CRUD
pictureRouter.post(
	"/upload",
	protect,
	uploadCloud.single("img"),
	pictureController.create
);

pictureRouter.put(
	"/update/:imgId",
	protect,
	uploadCloud.single("img"),
	pictureController.update
);

pictureRouter.get("/pictures", pictureController.getAll);
pictureRouter.get("/search-picture", pictureController.searchPicture);
pictureRouter.get("/details/:id", protect, pictureController.getPictureDetails);

pictureRouter.get(
	"/saved-picture-list-by-user",
	protect,
	pictureController.savedPictureListByUser
);

pictureRouter.get(
	"/created-pictures-list",
	protect,
	pictureController.createdPicturesList
);

pictureRouter.post(
	"/saved-pictures/:imgId",
	protect,
	pictureController.savedPicture
);

pictureRouter.get(
	"/savedImg-by-user/:imgId",
	protect,
	pictureController.savedImgByUser
);

pictureRouter.delete(
	"/delete/:imgId",
	protect,
	pictureController.deletePicture
);

export default pictureRouter;
