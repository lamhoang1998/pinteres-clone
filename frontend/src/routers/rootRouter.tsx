import { createBrowserRouter } from "react-router-dom";
import Login from "../component/Login";
import Register from "../component/Register";

const rootRouter = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

export default rootRouter;
