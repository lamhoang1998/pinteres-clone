import { useQuery } from "@tanstack/react-query";
import { ApiWithToken } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";

export const getInfo = () => {
	return useQuery({
		queryKey: ["userInfo"],
		queryFn: async () => {
			const data = ApiWithToken.get<any>(`${ENDPOINT.USER.GETINFO}`);
			return data;
		},
	});
};
