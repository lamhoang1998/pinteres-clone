export type ResponseSuccess = {
	status: string;
	message: string;
	code: number;
};

export type ResponseError = {
	status: string;
	message: string;
	code: number;
	stack: null;
};
