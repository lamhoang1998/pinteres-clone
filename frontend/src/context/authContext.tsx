import { createContext, useContext, useState } from "react";
import { AuthContextType, UserInfo } from "../types/context.type";
import { getAccessToken } from "../helpers/auth.helper";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

	return (
		<AuthContext.Provider
			value={{
				userInfo,
				setUser: (userInfo) => {
					setUserInfo(userInfo);
				},
				isLogged: !!getAccessToken(),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context as AuthContextType;
}

export default AuthContextProvider;
