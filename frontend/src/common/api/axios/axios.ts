import axios from "axios";
import { BASE_DOMAIN_API } from "../../constants/app.constant";

export const noAuthApi = axios.create({
	baseURL: BASE_DOMAIN_API,
});
