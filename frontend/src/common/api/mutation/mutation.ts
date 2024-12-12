import { useMutation } from "@tanstack/react-query";
import { noAuthApi } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import {
	LoginBody,
	LoginResult,
	RegisterBody,
	RegisterResult,
} from "../../../types/auth.type";
import { toast } from "react-toastify";
import { UserInfo } from "../../../types/context.type";
import { useAuth } from "../../../context/authContext";

export function useLoginMutation() {
	const { userInfo, setUser } = useAuth();

	return useMutation({
		mutationFn: (data: LoginBody) => {
			return noAuthApi.post<LoginResult>(ENDPOINT.AUTH.LOGIN, data);
		},
		onSuccess(loginData) {
			console.log("data", loginData.data.metaData);
			localStorage.setItem("user", JSON.stringify(loginData.data.metaData));
			const user: UserInfo = {
				userId: loginData.data.metaData.userId,
				email: loginData.data.metaData.email,
				refreshToken: loginData?.data.metaData.tokens.refreshToken,
			};

			setUser(user);
			console.log("userInfoMutation", userInfo);
			toast.success("sucessfuly login");
		},
	});
}

export function useRegisterMutation() {
	return useMutation({
		mutationFn: (data: RegisterBody) => {
			return noAuthApi.post<RegisterResult>(ENDPOINT.AUTH.REGISTER, data);
		},
		onSuccess(loginData) {
			console.log("data", loginData.data.metaData);
			toast.success("successfully register");
		},
	});
}
