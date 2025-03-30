import { useQuery } from "@tanstack/react-query";
import { Api, ApiWithToken } from "../axios/axios";
import { ENDPOINT } from "../../constants/endpoint.constant";
import {
	AllPictures,
	CreatedImg,
	imgDetails,
	SavedImg,
	SearchPicture,
} from "../../../types/picture.type";
import { TRes } from "../../../types/app.types";

export const useGetAllPicture = (page: number = 0, pageSize: number = 0) => {
	return useQuery({
		queryKey: ["pictures", page, pageSize],
		queryFn: async () => {
			const data = await Api.get<AllPictures>(
				`${ENDPOINT.PICTURE.PICTURES}?page=${page}&pageSize=${pageSize}`
			);
			console.log("data query", data);
			return data;
		},
	});
};

export const useImgDetails = (imgId: string | undefined) => {
	return useQuery({
		queryKey: ["imgDetails", imgId],
		queryFn: async () => {
			const data = await ApiWithToken.get<TRes<imgDetails>>(
				`${ENDPOINT.PICTURE.IMGDETAILS}/${imgId}`
			);
			return data;
		},
	});
};

export const useSavedImgByUser = () => {
	return useQuery({
		queryKey: ["savedImg"],
		queryFn: async () => {
			const { data } = await ApiWithToken.get<TRes<SavedImg>>(
				ENDPOINT.PICTURE.SAVEDIMGBYUSER
			);
			return data;
		},
	});
};

export const useCreatedImgByUser = () => {
	return useQuery({
		queryKey: ["createdImg"],
		queryFn: async () => {
			const { data } = await ApiWithToken.get<TRes<CreatedImg>>(
				ENDPOINT.PICTURE.CREATEDPICTURELIST
			);
			return data;
		},
	});
};

export const useSearchImg = (searchValue: string | undefined) => {
	return useQuery({
		queryKey: ["searchImg", searchValue],
		queryFn: async () => {
			const { data } = await Api.get<SearchPicture>(
				`${ENDPOINT.PICTURE.SEARCH}?name=${searchValue}`
			);
			return data;
		},
		enabled: !!searchValue,
	});
};
