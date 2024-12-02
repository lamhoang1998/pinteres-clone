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
