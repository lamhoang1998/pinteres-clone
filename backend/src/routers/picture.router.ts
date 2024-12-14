import express from "express";
import { pictureController } from "../controllers/picture.controller";
import protect from "../common/middlewares/protect.middlewares";
import uploadCloud from "../common/multer/upload-cloud.multer";

const pictureRouter = express.Router();

// Tạo route CRUD
pictureRouter.post(
	"/upload",
	protect,
	uploadCloud.single("image"),
	pictureController.create
);

pictureRouter.get("/pictures", protect, pictureController.getAll);
pictureRouter.get("/search-picture", protect, pictureController.searchPicture);
pictureRouter.get("/details/:id", protect, pictureController.getPictureDetails);
pictureRouter.get("/save-img/:id", protect, pictureController.saveImg);
pictureRouter.get(
	"/created-pictures-list/:userId",
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
