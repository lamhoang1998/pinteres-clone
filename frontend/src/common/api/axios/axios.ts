import axios from "axios";
import { BASE_DOMAIN_API } from "../../constants/app.constant";

export const noAuthApi = axios.create({
	baseURL: BASE_DOMAIN_API,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US,en;q=0.5",
	},
});

export const apiWithValidateToken = axios.create({
	baseURL: BASE_DOMAIN_API,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US,en;q=0.5",
	},
});
