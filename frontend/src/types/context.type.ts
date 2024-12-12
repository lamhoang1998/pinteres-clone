export type UserInfo =
	| {
			userId: number | undefined;
			email: string | undefined;
			refreshToken: string | undefined;
	  }
	| undefined;

export type AuthContextType = {
	userInfo: UserInfo;
	setUser: (userInfo: UserInfo) => void;
	isLogged: boolean;
};
