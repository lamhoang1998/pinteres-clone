import { TRes } from "./app.types";

export type UserInfo = {
	userId: number;
	email: string;
	fullName: string;
	avatar: string | null | undefined;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
};

type UploadAvatarCloudMetaData = {
	folder: string;
	filename: string;
	imgUrl: string;
};

export type UploadAvatar = TRes<UploadAvatarCloudMetaData>;
