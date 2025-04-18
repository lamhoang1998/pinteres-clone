import dotenv from "dotenv";

dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const EMAIL_PASSWORD = process.env.SEND_EMAIL_PASSWORD;
export const EMAIL_ADDRESS = process.env.SEND_EMAIL_ADDRESS;
export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;

console.log({
	ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRED,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRED,
	CLOUDINARY_SECRET_KEY,
	EMAIL_PASSWORD,
	EMAIL_ADDRESS,
	MAILTRAP_TOKEN,
});
