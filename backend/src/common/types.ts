import { Request } from "express";

export type ResponseSuccess<T> = {
	status: string;
	message: string;
	code: number;
	metaData: T;
};

export type ResponseError = {
	status: string;
	message: string;
	code: number;
	stack: null;
};

export type RegisterResponse = {
	userId: number;
	email: string;
	fullName: string | null;
	avatar: string | null;
	createdAt: Date | null;
	updatedAt: Date | null;
};

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

export type RefreshToken = {
	accessToken: string;
	refreshToken: string;
};

export type LoginUserExist = {
	userId: number;
	passWord: string;
};

export type RefreshTokenUser = {
	userId: number;
	passWord: string;
} | null;

export type User = {
	userId: number;
	email: string;
	fullName: string | null;
	avatar: string | null;
} | null;
