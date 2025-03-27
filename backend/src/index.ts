import express from "express";
import cors from "cors";
import rootRouter from "./routers/root.router";
import { handleError } from "./common/helpers/error.helper";

const app = express();

app.use(express.json());
app.use(cors());

app.use(rootRouter);
app.use(handleError);

export const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
