import React from "react";
import { useAuth } from "../context/authContext";

function Home() {
	const { userInfo, setUser, isLogged } = useAuth();
	console.log("userInfo", userInfo);
	console.log("isLogged", isLogged);
	return <div>Home</div>;
}

export default Home;
