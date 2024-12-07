import express from "express";
import authRouter from "./auth.router";
import pictureRouter from "./picture.router";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
	response.json(`ok`);
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/picture", pictureRouter);

export default rootRouter;
