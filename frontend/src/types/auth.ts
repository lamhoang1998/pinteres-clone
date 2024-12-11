export type LoginBody = {
	email: string;
	passWord: string;
};

type LoginMetaData = {
	accessToken: string;
	refreshToken: string;
};

export type LoginResult = {
	status: string;
	message: string;
	code: number;
	metaData: LoginMetaData;
};
