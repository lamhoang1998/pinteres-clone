import { NextFunction, Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import {
	BadRequestError,
	UnauthorizedError,
} from "../common/helpers/error.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import tokenService from "./token.service";
import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant";
import { LoginUserExist, RefreshTokenUser } from "../common/types";

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

		const tokens = tokenService.createTokens<LoginUserExist>(userExists);
		console.log({ tokens });

		return tokens;
	},
	refreshToken: async (req: Request) => {
		const refreshToken = req.headers?.authorization?.split(" ")[1];
		const accessToken = req.headers[`x-access-token`] as string;

		console.log({ refreshToken, accessToken });
		if (!refreshToken) throw new UnauthorizedError();
		if (!accessToken) throw new UnauthorizedError();

		// the verify method check even the expire time, so we use the ignoreExpiration options to omit it, only check if the accesstoken sent to backend from request match access token secret
		const decodeRefreshToken = jwt.verify(
			refreshToken,
			REFRESH_TOKEN_SECRET as string
		) as JwtPayload;

		const decodeAccessToken = jwt.verify(
			accessToken,
			ACCESS_TOKEN_SECRET as string,
			{
				ignoreExpiration: true,
			}
		) as JwtPayload;

		console.log({ decodeRefreshToken, decodeAccessToken });

		if (decodeRefreshToken.userId !== decodeAccessToken.userId)
			throw new UnauthorizedError();

		const user = await prisma.users.findUnique({
			where: {
				userId: decodeRefreshToken.userId,
			},
			select: { userId: true, passWord: true },
		});

		const tokens = tokenService.createTokens<RefreshTokenUser>(user);

		return tokens;
	},
};
