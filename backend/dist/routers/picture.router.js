"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const picture_controller_1 = require("../controllers/picture.controller");
const protect_middlewares_1 = __importDefault(require("../common/middlewares/protect.middlewares"));
const upload_cloud_multer_1 = __importDefault(require("../common/multer/upload-cloud.multer"));
const pictureRouter = express_1.default.Router();
// Tạo route CRUD
pictureRouter.post("/upload", protect_middlewares_1.default, upload_cloud_multer_1.default.single("img"), picture_controller_1.pictureController.create);
pictureRouter.put("/update/:imgId", protect_middlewares_1.default, upload_cloud_multer_1.default.single("img"), picture_controller_1.pictureController.update);
pictureRouter.get("/pictures", picture_controller_1.pictureController.getAll);
pictureRouter.get("/search-picture", picture_controller_1.pictureController.searchPicture);
pictureRouter.get("/details/:id", protect_middlewares_1.default, picture_controller_1.pictureController.getPictureDetails);
pictureRouter.get("/saved-picture-list-by-user", protect_middlewares_1.default, picture_controller_1.pictureController.savedPictureListByUser);
pictureRouter.get("/created-pictures-list", protect_middlewares_1.default, picture_controller_1.pictureController.createdPicturesList);
pictureRouter.post("/saved-pictures/:imgId", protect_middlewares_1.default, picture_controller_1.pictureController.savedPicture);
pictureRouter.get("/savedImg-by-user/:imgId", protect_middlewares_1.default, picture_controller_1.pictureController.savedImgByUser);
pictureRouter.delete("/delete/:imgId", protect_middlewares_1.default, picture_controller_1.pictureController.deletePicture);
exports.default = pictureRouter;
