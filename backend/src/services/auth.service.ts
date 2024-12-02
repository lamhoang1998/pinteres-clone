import { Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import { BadRequestError } from "../common/helpers/error.helper";
import bcrypt from "bcrypt";

export const authService = {
	register: async function (req: Request) {
		const { email, passWord, fullName } = req.body;
		console.log({ email, passWord, fullName });

		const userExist = await prisma.users.findFirst({
			where: {
				email,
			},
		});

		console.log(userExist);

		if (userExist)
			throw new BadRequestError(
				`Email already existed, please give another email`
			);

		const hashPassword = bcrypt.hashSync(passWord, 10);
		const newUser = await prisma.users.create({
			data: { email, fullName: fullName, passWord: hashPassword },
		});

		return newUser;
	},
};
