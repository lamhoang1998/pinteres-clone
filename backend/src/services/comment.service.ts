import { Request } from "express";
import { BadRequestError } from "../common/helpers/error.helper";
import { prisma } from "../common/prisma/init.prisma";

export const commentService = {
	create: async function (req: Request) {
		if (!req.body)
			throw new BadRequestError(`please send comment and picture id`);
		const comment = req.body.comment;
		const userId = req.user?.userId;
		const imgId = +req.body.imgId;

		const newComment = await prisma.comments.create({
			data: {
				userId: userId,
				imgId: imgId,
				commentContent: comment,
				hierachy: 1,
			},
		});

		await prisma.parentchildrencomment.create({
			data: {
				parentCommentId: newComment.commentId,
				childrenCommentId: newComment.commentId,
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
			select: {
				imgId: true,
				commentId: true,
				commentContent: true,
				users: true,
			},
		});
		return comments;
	},

	replyToComment: async function (req: Request) {
		console.log({ body: req?.body });

		if (!req.body)
			throw new BadRequestError(`please send properties to da body`);

		const parentHierachy = await prisma.comments.findFirst({
			where: { commentId: +req?.body?.parentId },
			select: { hierachy: true },
		});

		console.log({ parentHierachy });

		const newReplyComment = await prisma.comments.create({
			data: {
				userId: req.user?.userId,
				imgId: +req?.body?.imgId,
				commentContent: req?.body?.reply,
				hierachy: parentHierachy?.hierachy && parentHierachy.hierachy + 1,
			},
		});

		const isParentinParentChildrenTable =
			await prisma.parentchildrencomment.findFirst({
				where: {
					parentCommentId: +req?.body?.parentId,
					childrenCommentId: +req?.body?.parentId,
				},
			});

		if (!isParentinParentChildrenTable) {
			await prisma.parentchildrencomment.create({
				data: {
					parentCommentId: +req?.body?.parentId,
					childrenCommentId: +req?.body?.parentId,
				},
			});
		}

		const previousParent = await prisma.parentchildrencomment.findMany({
			where: {
				childrenCommentId: +req?.body?.parentId,
			},
			select: { parentCommentId: true },
		});

		await prisma.parentchildrencomment.createMany({
			data: previousParent.map((parent) => ({
				parentCommentId: parent.parentCommentId,
				childrenCommentId: newReplyComment.commentId,
			})),
		});

		return `replyToComment`;
	},

	getComments: async function (req: Request) {
		const imgId = req.query?.imgId;
		if (!imgId)
			throw new BadRequestError(`there is no image id to get comments`);
		const comments = await prisma.comments.findMany({
			where: { imgId: +imgId, hierachy: 1 },
			select: {
				commentId: true,
				commentContent: true,
				hierachy: true,
				users: { select: { userId: true, fullName: true, avatar: true } },
			},
		});
		return comments;
	},

	getReplies: async function (req: Request) {
		const imgId = req.query?.imgId;
		const parentId = req.query?.parentId;
		const hierachy = req.query?.hierachy;

		console.log({ parentId });

		if (!imgId || !parentId || !hierachy)
			throw new BadRequestError("please give queries!");

		const reply = await prisma.comments.findMany({
			where: {
				imgId: +imgId,
				hierachy: +hierachy,
				parentchildrencomment_parentchildrencomment_childrenCommentIdTocomments:
					{
						some: {
							parentCommentId: +parentId,
						},
					},
			},
			select: {
				commentId: true,
				commentContent: true,
				hierachy: true,
				users: { select: { userId: true, fullName: true, avatar: true } },
			},
		});
		return reply;
	},
};
