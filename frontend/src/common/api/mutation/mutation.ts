import { Mutation, useMutation } from "@tanstack/react-query";
import { Api, ApiWithToken } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import {
	LoginBody,
	LoginResult,
	RegisterBody,
	RegisterResult,
} from "../../../types/auth.type";
import { toast } from "react-toastify";

import { UploadAvatar } from "../../../types/user.type";
import { TRes } from "../../../types/app.types";
import { AddComment, TypeReply } from "../../../types/comment.types";
import { SaveImg, UploadImg } from "../../../types/picture.type";
import { ImgFormData } from "../../../component/Form/ImgForm";

export function useLoginMutation() {
	return useMutation({
		mutationFn: (data: LoginBody) => {
			return Api.post<LoginResult>(ENDPOINT.AUTH.LOGIN, data);
		},
		// onSuccess(loginData) {
		// 	console.log("login data", loginData.data.metaData);
		// 	setUserToLocal(loginData.data.metaData);
		// 	setAccessToken(loginData.data.metaData.tokens.accessToken);
		// 	setRefreshToken(loginData.data.metaData.tokens.refreshToken);

		// 	console.log("accessToken", getAccessToken());
		// 	console.log("refreshToken", getRefreshToken());

		// 	toast.success("sucessfuly login");
		// },
	});
}

export function useRegisterMutation() {
	return useMutation({
		mutationFn: (data: RegisterBody) => {
			return Api.post<RegisterResult>(ENDPOINT.AUTH.REGISTER, data);
		},
		onSuccess() {
			toast.success("successfully register");
		},
	});
}

export function useUpdateAvatarCloud() {
	return useMutation({
		mutationFn: (data: FormData) => {
			console.log("data", data);

			return ApiWithToken.put<UploadAvatar>(
				ENDPOINT.USER.UPLOADAVATARCLOUD,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
	});
}

export function useUpdateAvatarLocal() {
	return useMutation({
		mutationFn: (data: FormData) => {
			return ApiWithToken.put<UploadAvatar>(
				ENDPOINT.USER.UPLOADAVATARLOCAL,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
	});
}

export function useAddComment() {
	return useMutation({
		mutationFn: (data: AddComment) => {
			return ApiWithToken.post<TRes<string>>(ENDPOINT.COMMENT.ADDCOMMENT, data);
		},
	});
}

export function useReply() {
	return useMutation({
		mutationFn: (data: TypeReply) => {
			return ApiWithToken.post<TRes<string>>(
				ENDPOINT.COMMENT.REPLYTOCOMMENT,
				data
			);
		},
	});
}

export function useSaveImg() {
	return useMutation({
		mutationFn: (imgId: number | undefined) => {
			return ApiWithToken.post<TRes<SaveImg>>(
				`${ENDPOINT.PICTURE.SAVEIMG}/${imgId}`
			);
		},
	});
}

export function useUploadImg() {
	return useMutation({
		mutationFn: (imgFormData: FormData) => {
			return ApiWithToken.post<TRes<UploadImg>>(
				ENDPOINT.PICTURE.UPLOAD,
				imgFormData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
	});
}

export function useUpdateImg() {
	return useMutation({
		mutationFn: (imgInfo: {
			imgId: number | undefined;
			updateImg: FormData;
		}) => {
			const { imgId, updateImg } = imgInfo;

			return ApiWithToken.put<TRes<string>>(
				`${ENDPOINT.PICTURE.UPDATE}/${imgId}`,
				updateImg,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
	});
}
