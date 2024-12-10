import { Request } from "express";
import { BadRequestError } from "../common/helpers/error.helper";
import { prisma } from "../common/prisma/init.prisma";

export const commentService = {
	create: async function (req: Request) {
		if (!req.body)
			throw new BadRequestError(`please send comment and picture id`);
		console.log({ user: req.user });
		const comment = req.body.comment;
		const userId = req.user?.userId;
		const imgId = req.body.imgId;

		const newComment = await prisma.comments.create({
			data: {
				userId: userId,
				imgId: imgId,
				commentContent: comment,
			},
		});

		console.log({ newComment });
		return `ok`;
	},

	getComment: async function (req: Request) {
		const imgId = req.query?.imgId;
		if (!imgId)
			throw new BadRequestError(`there is no image id to get comments`);
		const comments = await prisma.comments.findMany({
			where: { imgId: +imgId },
			select: { commentId: true, commentContent: true },
		});
		return comments;
	},
};
