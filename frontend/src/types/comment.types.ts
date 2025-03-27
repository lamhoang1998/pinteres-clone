import { Users } from "./picture.type";

export type AddComment = {
	comment: string | undefined;
	imgId: string | undefined;
};

export type TypeReply = {
	reply: string | undefined;
	imgId: string | undefined;
	parentId: number | undefined;
};

export type GetComment = {
	commentId: number;
	commentContent: string;
	hierachy: number;
	users: Users;
}[];

export type GetReplies = {
	commentId: number;
	commentContent: string;
	hierachy: number;
	users: Users;
}[];
