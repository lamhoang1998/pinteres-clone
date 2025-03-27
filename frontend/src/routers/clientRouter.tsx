import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProfileDetails from "../pages/ImageDetails";
import RootPage from "../pages/RootPage";

const clientRouter = [
	{
		path: "/",
		element: (
			<RootPage>
				<Home />
			</RootPage>
		),
	},
	{
		path: "/profile",
		element: (
			<RootPage protect>
				<Profile />
			</RootPage>
		),
	},
	{
		path: "/editprofile",
		element: (
			<RootPage protect>
				<EditProfile />
			</RootPage>
		),
	},
	{
		path: "/imageDetails/:id",
		element: (
			<RootPage protect>
				<ProfileDetails />
			</RootPage>
		),
	},
];

export default clientRouter;
