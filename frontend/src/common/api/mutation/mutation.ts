import { useMutation } from "@tanstack/react-query";
import { noAuthApi } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import {
	LoginBody,
	LoginResult,
	RegisterBody,
	RegisterResult,
} from "../../../types/auth";
import { toast } from "react-toastify";

export function useLoginMutation() {
	return useMutation({
		mutationFn: (data: LoginBody) => {
			return noAuthApi.post<LoginResult>(ENDPOINT.AUTH.LOGIN, data);
		},
		onSuccess(data, variables, context) {
			console.log(data);
			toast.success("sucessfuly login");
		},
	});
}

export function useRegisterMutation() {
	return useMutation({
		mutationFn: (data: RegisterBody) => {
			return noAuthApi.post<RegisterResult>(ENDPOINT.AUTH.REGISTER, data);
		},
		onSuccess(data) {
			console.log(data);
			toast.success("successfully register");
		},
	});
}
