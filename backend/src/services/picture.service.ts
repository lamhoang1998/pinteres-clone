import { Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import { BadRequestError } from "../common/helpers/error.helper";

export const pictureService = {
	create: async function (req: Request) {
		const file = req.file;
		if (!file) throw new BadRequestError(`No file in the request`);

		const newImg = await prisma.images.create({
			data: {
				imgName: req.body.imgName,
				url: req?.file?.filename,
				desc: req.body.desc,
				userId: req.user?.userId,
			},
		});

		return newImg;
	},

	getAll: async function (req: Request) {
		let page: number = 0;
		let pageSize: number = 0;

		page = req.query?.page ? +req.query.page : 1;
		pageSize = req.query?.pageSize ? +req.query.pageSize : 3;
		console.log({ pageSize: req.query?.pageSize });

		const totalItem = await prisma.images.count();
		console.log({ totalItem });

		const totalPage = Math.ceil(totalItem / pageSize);
		console.log({ totalPage });

		const allPictures = await prisma.images.findMany({
			take: pageSize,
			skip: (page - 1) * pageSize,
			orderBy: {
				created_at: `desc`,
			},
		});

		return {
			pageSize,
			page,
			totalItem,
			totalPage,
			items: allPictures || [],
		};
	},
	searchPicture: async function (req: Request) {
		let name: string = "";

		name = req.query.name ? (req.query.name as string) : "";

		if (!name) throw new BadRequestError(`please enter something to search`);

		const searchedPictures = await prisma.images.findMany({
			where: {
				imgName: {
					startsWith: name,
				},
			},
		});

		return searchedPictures;
	},

	getPictureDetails: async function (req: Request) {
		const { id } = req.params;
		console.log({ id });

		const pictureDetails = await prisma.images.findUnique({
			where: { imgId: +id },
			select: { imgName: true, desc: true },
		});
		return pictureDetails;
		return `pictureDetails`;
	},
};
