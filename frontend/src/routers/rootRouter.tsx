import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AppLayOut from "../component/layouts/AppLayOut";
import clientRouter from "./clientRouter";
import SignUp from "../pages/SignUp";
import EmailVerification from "../pages/EmailVerification";

const rootRouter = createBrowserRouter([
	{
		path: "",
		element: <AppLayOut />,
		children: clientRouter,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "email-verify",
		element: <EmailVerification />,
	},
]);

export default rootRouter;
