import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import { prisma } from "../prisma/init.prisma";
import { ForbiddenError, UnauthorizedError } from "../helpers/error.helper";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.headers?.authorization?.split(" ")[1];

		if (!accessToken)
			throw new UnauthorizedError(
				`you haven't sent token yet, please include it `
			);

		const decodeToken = jwt.verify(
			accessToken,
			ACCESS_TOKEN_SECRET as string
		) as JwtPayload;

		const user = await prisma.users.findUnique({
			where: {
				userId: decodeToken.userId,
			},
			select: {
				userId: true,
				fullName: true,
				avatar: true,
				email: true,
			},
		});

		if (!user) throw new ForbiddenError();

		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
};

export default protect;
