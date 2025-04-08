import { NextFunction, Request } from "express";
import { prisma } from "../common/prisma/init.prisma";
import {
	BadRequestError,
	UnauthorizedError,
} from "../common/helpers/error.helper";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import tokenService from "./token.service";
import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant";
import { LoginUserExist, RefreshTokenUser } from "../common/types";
// import sendEmail from "../common/email/sendEmail.email";
import sendEmail from "../common/nodemailer/sendMail.nodemailer";

export const authService = {
	register: async function (req: Request) {
		const { email, passWord, fullName } = req.body;

		const userExist = await prisma.users.findFirst({
			where: {
				email,
			},
		});

		if (userExist)
			throw new BadRequestError(
				`Email already existed, please give another email`
			);

		const hashPassword = bcrypt.hashSync(passWord, 10);

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

		const verificationTokenExpiresAt = expirationTime.toISOString();

		const newUser = await prisma.users.create({
			data: {
				email,
				fullName: fullName,
				passWord: hashPassword,
				verificationToken: verificationToken,
				verificationTokenExpiresAt: verificationTokenExpiresAt,
			},
		});

		sendEmail(newUser.email, verificationToken);

		return newUser;
	},
	login: async (req: Request) => {
		const { email, passWord } = req.body;

		const userExists = await prisma.users.findFirst({
			where: { email },
			select: { userId: true, email: true, avatar: true, passWord: true },
		});

		console.log({ userExists });

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

		return {
			userId: userExists.userId,
			email: userExists.email,
			avatar: userExists.avatar,
			tokens,
		};
	},
	refreshToken: async (req: Request) => {
		const refreshToken = req.headers?.authorization?.split(" ")[1];
		const accessToken = req.headers[`x-access-token`] as string;
		console.log({ header: req.headers.authorization });

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
	verifyToken: async (req: Request) => {
		const { verificationToken } = req.body;

		if (verificationToken && typeof verificationToken === "string") {
			const user = await prisma.users.findFirst({
				where: { verificationToken: verificationToken },
			});

			const submittedDate = new Date();

			if (user && user?.verificationTokenExpiresAt) {
				if (submittedDate <= user?.verificationTokenExpiresAt) {
					await prisma.users.update({
						where: { userId: user.userId },
						data: {
							isVerified: true,
						},
					});
				} else {
					throw new BadRequestError("token is invalid");
				}
			}

			return `success`;
		} else {
			throw new BadRequestError("verificationToken is not a string ");
		}
	},
};
