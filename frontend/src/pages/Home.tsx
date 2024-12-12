import React from "react";
import { useAuth } from "../context/authContext";
import { getAccessToken } from "../helpers/auth.helper";

function Home() {
	const { isLogged } = useAuth();
	console.log("isLogged", isLogged);
	console.log("accessToken", getAccessToken());
	return <div>Home</div>;
}

export default Home;
