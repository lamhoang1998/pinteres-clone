import express from "express";
import authRouter from "./auth.router";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
	response.json(`ok`);
});

rootRouter.use("/auth", authRouter);

export default rootRouter;
