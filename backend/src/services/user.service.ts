import { Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import { BadRequestError } from "../common/helpers/error.helper";
import { deleteLocalImage } from "../common/multer/upload-local.multer";
import { deleteCloudImage } from "../common/multer/upload-cloud.multer";
import { UPLOAD_DIR } from "../common/multer/config.multer";
import { PORT } from "..";

export const userService = {
	findOne: async function (req: Request) {
		const user = await prisma.users.findUnique({
			where: {
				userId: req.user?.userId,
			},
		});

		console.log({ user });

		return user;
	},

	update: async function (req: Request) {
		const updatedUser = await prisma.users.update({
			where: {
				userId: req.user?.userId,
			},
			data: {
				email: req.body?.email,
				fullName: req.body?.fullName,
			},
		});

		return updatedUser;
	},

	remove: async function (req: Request) {
		return `This action removes a id: ${req.params.id} user`;
	},
	getInfo: async function (req: Request) {
		const userInfo = await prisma.users.findUnique({
			where: { userId: req.user?.userId },
		});

		console.log({ userInfo });
		return userInfo;
	},

	uploadAvatar: async function (req: Request) {
		console.log({ file: req?.file });
		const file = req.file;

		if (!file) throw new BadRequestError(`Not file`);

		const isImgLocal = req.user?.avatar?.includes("local");

		console.log({ isImgLocal });

		if (isImgLocal) {
			deleteLocalImage(req.user?.avatar as string);
		} else {
			await deleteCloudImage(req.user?.avatar as string);
		}

		const updatedUserInfo = await prisma.users.update({
			where: { userId: req.user?.userId },
			data: { avatar: file.filename },
		});

		return {
			folder: UPLOAD_DIR,
			filename: file.filename,
			imgUrl: isImgLocal
				? `${`http://localhost:${PORT}`}/${file.path}`
				: file.path,
		};
	},
};
