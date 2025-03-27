import {
	BASE_DOMAIN_API,
	FOLDER_IMAGE_BE,
} from "../common/constants/app.constant";
import { BASE_DOMAIN_CLOUDINARY } from "../constant/app.constant";

export const resError = (error: any, defaultMes: string) => {
	let mes = error.response?.data?.message;
	if (!mes) mes = defaultMes;
	if (Array.isArray(mes)) mes = mes[0];
	return mes;
};

export const checkPathAvatar = (
	path: string | null | undefined
): string | null | undefined => {
	if (!path) return path;
	if (path.includes(`http`)) return path;

	if (path.includes(`local`)) {
		return `${BASE_DOMAIN_API}${FOLDER_IMAGE_BE}${path}`;
	} else {
		return `${BASE_DOMAIN_CLOUDINARY}${path}`;
	}
};
