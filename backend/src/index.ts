import express from "express";
import cors from "cors";
import rootRouter from "./routers/root.router";

const app = express();

app.use(express.json());
app.use(cors());

app.use(rootRouter);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
