import axios from "axios";
import { BASE_DOMAIN_API } from "../../constants/app.constant";
import {
	getAccessToken,
	getRefreshToken,
	logOut,
	setAccessToken,
	setRefreshToken,
} from "../../../helpers/auth.helper";
import { ENDPOINT } from "../../constants/endpoint.constant";
import { RefreshToken } from "../../../types/auth.type";
import { promise } from "zod";

export const Api = axios.create({
	baseURL: BASE_DOMAIN_API,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US,en;q=0.5",
	},
});

export const ApiWithToken = axios.create({
	baseURL: BASE_DOMAIN_API,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US,en;q=0.5",
	},
});

const apiRefreshToken = axios.create({
	baseURL: BASE_DOMAIN_API,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US,en;q=0.5",
	},
});

ApiWithToken.interceptors.request.use(
	function (config) {
		config.url = `${config.baseURL}${config.url}`;

		const accessToken = getAccessToken();

		console.log(accessToken);

		if (getAccessToken()) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

let failedQueue: any[] = [];
let isRefreshing = false;

const processQueue = (err: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (err) {
			prom.reject(err);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
	failedQueue.length = 0;
};

ApiWithToken.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const comingApi = error.config;
		if (error.response?.status === 401) {
			logOut();
		}

		if (error.response?.status === 403 && !comingApi._retry) {
			const accessToken = getAccessToken();
			const refreshToken = getRefreshToken();

			if (isRefreshing) {
				console.log("isRefreshing");
				return new Promise((resolve, reject) => {
					return failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						comingApi.headers["Authorization"] = "Bearer " + token;
						return axios(comingApi);
					})
					.catch((err) => Promise.reject(err));
			}

			comingApi._retry = true;
			isRefreshing = true;

			try {
				console.log("try");
				const { data } = await apiRefreshToken.post<RefreshToken>(
					`${ENDPOINT.AUTH.REFRESHTOKEN}`,
					{},
					{
						headers: {
							"x-access-token": accessToken,
							Authorization: `Bearer ${refreshToken}`,
						},
					}
				);
				console.log("data", data);
				console.log("accessToken", data.metaData.accessToken);

				setRefreshToken(data.metaData.refreshToken);
				setAccessToken(data.metaData.accessToken);
				console.log("get Access Token", getAccessToken());

				processQueue(null, data.metaData.accessToken);

				comingApi.headers["Authorization"] =
					"Bearer " + data.metaData.accessToken;

				return axios(comingApi);
			} catch (err) {
				processQueue(err, null);
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	}
);
