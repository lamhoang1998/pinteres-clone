import { Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import { BadRequestError } from "../common/helpers/error.helper";

export const pictureService = {
	create: async function (req: Request) {
		const file = req.file;
		if (!file) throw new BadRequestError(`No file in the request`);

		console.log({ body: req.body });

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

	update: async function (req: Request) {
		const imgDetails = await prisma.images.findUnique({
			where: {
				imgId: +req?.params?.imgId,
			},
		});

		const numberOfKey = Object.keys(req.body).length;

		if (numberOfKey > 3) {
			throw new BadRequestError(`there is more than required image info`);
		} else if (numberOfKey === 0) {
			throw new BadRequestError(
				`please give some data about the image that you need to update`
			);
		}

		for (const key in req.body) {
			if (key !== "imgName" && key !== "desc" && key !== "url") {
				throw new BadRequestError(
					` please submit imgName or desc or url to update the image`
				);
			}
		}

		const updateImg = await prisma.images.update({
			where: { imgId: +req?.params?.imgId },
			data: {
				imgName: req.body?.imgName ? req.body?.imgName : imgDetails?.imgName,
				url: req?.file?.filename ? req?.file?.filename : imgDetails?.url,
				desc: req.body.desc ? req.body.desc : imgDetails?.desc,
			},
		});

		return `success`;
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
			// take: pageSize,
			// skip: (page - 1) * pageSize,
			include: {
				users: true,
			},
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
	//send name as query to request
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
			select: {
				imgId: true,
				imgName: true,
				url: true,
				desc: true,
				users: { select: { userId: true, fullName: true, avatar: true } },
			},
		});
		return pictureDetails;
	},
	savedPictureListByUser: async function (req: Request) {
		const savedImage = await prisma.users.findUnique({
			where: { userId: req.user?.userId },
			select: {
				userId: true,
				savedimage: {
					select: { images: true },
				},
			},
		});

		if (!savedImage) {
			return null;
		}

		// Transform the data to the desired structure
		const savedImageFlattened = {
			userId: savedImage.userId,
			images: savedImage.savedimage.map((savedImage) => savedImage.images),
		};

		return savedImageFlattened;
	},
	createdPicturesList: async function (req: Request) {
		const createdPictures = await prisma.users.findUnique({
			where: {
				userId: req.user?.userId,
			},
			select: {
				userId: true,
				images: true,
			},
		});

		return createdPictures;
	},
	savedPicture: async function (req: Request) {
		if (!req.params.imgId)
			throw new BadRequestError(
				`please send the id of the picture that you want to save`
			);

		const createdByUser = await prisma.images.findUnique({
			where: { imgId: +req.params.imgId },
			select: { userId: true },
		});

		const savedByUser = await prisma.savedimage.findFirst({
			where: {
				imgId: +req.params.imgId,
				userId: req.user?.userId,
			},
			select: { userId: true },
		});

		console.log({ savedByUser });

		if (req.user?.userId === createdByUser?.userId)
			throw new BadRequestError(
				`This picture is created by user, please send another imgId`
			);

		if (req.user?.userId === savedByUser?.userId)
			throw new BadRequestError(
				`This picture was already created by the user before`
			);

		const savedPicture = await prisma.savedimage.create({
			data: {
				imgId: +req.params.imgId,
				userId: req.user?.userId,
			},
		});

		return savedPicture;
	},
	savedImgByUser: async function (req: Request) {
		const savedImg = await prisma.savedimage.findFirst({
			where: {
				imgId: +req.params.imgId,
				userId: req.user?.userId,
			},
			select: {
				userId: true,
			},
		});

		return savedImg;
	},
	deletePicture: async function (req: Request) {
		console.log(req.params.imgId);
		const deletedImg = await prisma.images.delete({
			where: {
				imgId: +req.params.imgId,
			},
		});
		return deletedImg;
	},
};
