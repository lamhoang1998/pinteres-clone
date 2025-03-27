import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserToken } from "../types/context.type";
import { getAccessToken, getUserFromLocal } from "../helpers/auth.helper";
import PostImg from "../component/Image/PostImg";
import ImgForm from "../component/Form/ImgForm";
import { imgDetails, SearchImgResult } from "../types/picture.type";
import { useSearchImg } from "../common/api/queries/images.queries";
import EditImg from "../component/Image/EditImg";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	const [imgDetails, setImgDetails] = useState<imgDetails | undefined>(
		undefined
	);
	const [searchValueContext, setSearchValueContext] = useState<
		string | undefined
	>(undefined);

	// useEffect(() => {
	// 	const token = getAccessToken();
	// 	const storedUser = getUserFromLocal();

	// 	if (token && storedUser) {
	// 		setUserToken(JSON.parse(storedUser));
	// 	}
	// }, []);
	const searchResult = useSearchImg(searchValueContext);

	return (
		<AuthContext.Provider
			value={{
				showModal,
				toggleShowModal: () => {
					setShowModal(!showModal);
				},
				showEdit,
				toggleShowEdit: () => {
					setShowEdit(!showEdit);
				},
				imgDetails,
				setImgDetails: (imgDetails: imgDetails | undefined) => {
					setImgDetails(imgDetails);
				},
				searchValueContext,
				setSearchValueContext: (searchValue: string) => {
					setSearchValueContext(searchValue);
				},
				searchResult: searchResult.data?.metaData,
			}}
		>
			{showModal && <PostImg />}
			{showEdit && <EditImg />}
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context as AuthContextType;
}

export default AuthContextProvider;
