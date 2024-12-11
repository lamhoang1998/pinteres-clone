import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noAuthApi } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import { LoginBody, LoginResult } from "../../../types/auth";

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: LoginBody) => {
			console.log("data", data);
			return noAuthApi.post<LoginResult>(ENDPOINT.AUTH.LOGIN, data);
		},
		onSuccess(data, variables, context) {
			console.log("success");
		},
	});
}
