import { LoginMetaData } from "../types/auth.type";

export function getUserFromLocal() {
	return localStorage.getItem("user");
}

export function setUserToLocal(data: LoginMetaData) {
	localStorage.setItem("user", JSON.stringify(data));
}

export function getAccessToken() {
	return localStorage.getItem("accessToken");
}

export function setAccessToken(data: string) {
	localStorage.setItem("accessToken", JSON.stringify(data));
}

export function getRefreshToken() {
	return localStorage.getItem("refreshToken");
}

export function setRefreshToken(data: string) {
	localStorage.setItem("refreshToken", JSON.stringify(data));
}
