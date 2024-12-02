import { NextFunction, Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import { BadRequestError } from "../common/helpers/error.helper";
import bcrypt from "bcrypt";
import tokenService from "./token.service";

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
	login: async (req: Request) => {
		const { email, passWord } = req.body;

		const userExists = await prisma.users.findFirst({
			where: { email },
			select: { userId: true, passWord: true },
		});

		if (!userExists)
			throw new BadRequestError("The email doesn't exist, please register");

		const passHash = userExists.passWord;

		const match = bcrypt.compareSync(passWord, passHash);

		if (!match)
			throw new BadRequestError(
				`you entered the wrong password, please reenter or register`
			);

		const tokens = tokenService.createTokens(userExists);
		console.log({ tokens });

		return tokens;
	},
};
