import { useQuery } from "@tanstack/react-query";
import { ApiWithToken } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import { TRes } from "../../../types/app.types";
import { GetComment, GetReplies } from "../../../types/comment.types";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/error.types";

export const useGetComments = (imgId: string | undefined) => {
	return useQuery<TRes<GetComment>, AxiosError<ApiErrorResponse>>({
		queryKey: ["getComments", imgId],
		queryFn: async () => {
			const { data } = await ApiWithToken.get<TRes<GetComment>>(
				`${ENDPOINT.COMMENT.GETCOMMENTS}?imgId=${imgId}`
			);
			return data;
		},
	});
};

export const useGetReplies = (
	imgId: string | undefined,
	parentId: number | undefined,
	hierachy: number | undefined
) => {
	return useQuery<TRes<GetReplies>, AxiosError<ApiErrorResponse>>({
		queryKey: ["getReplies", imgId, parentId, hierachy],
		queryFn: async () => {
			const { data } = await ApiWithToken.get<TRes<GetReplies>>(
				`${ENDPOINT.COMMENT.GETREPLIES}?imgId=${imgId}&parentId=${parentId}&hierachy=${hierachy}`
			);
			return data;
		},
	});
};
