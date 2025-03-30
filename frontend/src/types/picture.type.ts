import { TRes } from "./app.types";
import { UserInfo } from "./user.type";

export type Items<T> = {
	imgId: number;
	imgName: string;
	url: string;
	desc: string;
	userId: number;
	created_at: Date;
	updated_at: Date;
	users: T;
};

export type AllPictures = {
	code: number;
	message: string;
	metaData: {
		page: number;
		pageSize: number;
		totalItem: number;
		totalPage: number;
		items: Items<UserInfo>[];
	};
};


export type imgDetails = {
	imgId: number;
	imgName: string;
	url: string;
	desc: string;
	users: Users;
};

export type Users = {
	userId: number;
	fullName: string;
	avatar: string;
};

export type SaveImg = {
	savedImgId: number;
	userId: number;
	imgId: number;
	created_at: string;
	updated_at: string;
};

export type SavedImg = {
	userId: number;
	images: Images[];
};

export type Images = {
	imgId: number;
	imgName: string;
	desc: string;
	url: string;
	userId: number;
	created_at: Date;
	updated_at: Date;
};

export type UploadImg = {
	imgId: number;
	imgName: string;
	desc: string;
	url: string;
	userId: number;
	created_at: string;
	updated_at: string;
};

type Imgs = {
	imgId: number;
	imgName: string;
	desc: string;
	url: string;
};

export type RenderImg = {
	userId: number;
	images: Imgs[];
};

export type CreatedImg = {
	userId: number;
	images: Images[];
};

export type SearchImgResult = {
	imgId: number;
	imgName: string;
	url: string;
	desc: string;
	userId: number;
	created_at: string;
	updated_at: string;
};

export type SearchPicture = TRes<Items<UserInfo>[]>;

export type EditImgData = {
	imgId?: string;
	desc?: string;
};
