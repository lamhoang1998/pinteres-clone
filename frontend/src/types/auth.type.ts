import { TRes } from "./app.types";

export type LoginBody = {
	email: string;
	passWord: string;
};

export type LoginMetaData = {
	userId: number;
	email: string;
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
};

// export type LoginResult = {
// 	status: string;
// 	message: string;
// 	code: number;
// 	metaData: LoginMetaData;
// };

export type LoginResult = TRes<LoginMetaData>;

export type RegisterBody = {
	email: string;
	passWord: string;
};
type RegisterMetaData = {
	userId: number;
	email: string;
	fullName: string;
	avatar: any;
	createdAt: string;
	updatedAt: string;
};

export interface RegisterResult {
	status: string;
	message: string;
	code: number;
	metaData: RegisterMetaData;
}

export type RefreshToken = {
	status: string;
	message: string;
	metaData: {
		accessToken: string;
		refreshToken: string;
	};
};
