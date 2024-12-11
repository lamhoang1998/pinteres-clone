import { createContext, useContext } from "react";

export const AuthContext = createContext("");

function AuthContextProvider({ children }: { children: React.ReactNode }) {
	return <AuthContext.Provider value="">{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}

export default AuthContextProvider;
