import { Request } from "express";
import { prisma } from "../common/prisma/init.prisma";

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
};
