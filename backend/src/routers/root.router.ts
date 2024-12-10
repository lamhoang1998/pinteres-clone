import express from "express";
import authRouter from "./auth.router";
import pictureRouter from "./picture.router";
import commentRouter from "./comment.router";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
	response.json(`ok`);
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/picture", pictureRouter);
rootRouter.use("/comment", commentRouter);

export default rootRouter;
