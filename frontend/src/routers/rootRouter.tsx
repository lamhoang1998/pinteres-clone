import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AppLayOut from "../component/layouts/AppLayOut";
import clientRouter from "./clientRouter";
import SignUp from "../pages/SignUp";
import EmailVerification from "../pages/EmailVerification";
import RootPage from "../pages/RootPage";

const rootRouter = createBrowserRouter([
	{
		path: "",
		element: <AppLayOut />,
		children: clientRouter,
	},
	{
		path: "/login",
		element: (
			<RootPage>
				<Login />
			</RootPage>
		),
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/sign-up",
		element: (
			<RootPage>
				<SignUp />
			</RootPage>
		),
	},
	{
		path: "email-verify",
		element: (
			<RootPage>
				<EmailVerification />,
			</RootPage>
		),
	},
]);

export default rootRouter;
