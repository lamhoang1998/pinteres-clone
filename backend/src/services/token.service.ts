import jwt from "jsonwebtoken";

import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRED,
	REFRESH_TOKEN_EXPIRED,
} from "../common/constant/app.constant";

const tokenService = {
	createTokens: <T extends { userId: number } | null>(user: T) => {
		const accessToken = jwt.sign(
			{ userId: user?.userId },
			ACCESS_TOKEN_SECRET as string,
			{
				expiresIn: ACCESS_TOKEN_EXPIRED as string,
			}
		);

		const refreshToken = jwt.sign(
			{ userId: user?.userId },
			REFRESH_TOKEN_SECRET as string,
			{
				expiresIn: REFRESH_TOKEN_EXPIRED as string,
			}
		);

		return { accessToken, refreshToken };
	},
};

export default tokenService;
