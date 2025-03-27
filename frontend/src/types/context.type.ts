import { Images, imgDetails, SearchImgResult } from "./picture.type";

export type UserToken =
	| {
			accessToken: string | undefined;
			refreshToken: string | undefined;
	  }
	| undefined;

export type AuthContextType = {
	showModal: boolean;
	toggleShowModal: () => void;
	showEdit: boolean;
	toggleShowEdit: () => void;
	imgDetails: imgDetails | undefined;
	setImgDetails: (imgDetails: imgDetails | undefined) => void;
	searchValueContext: string | undefined;
	setSearchValueContext: (searchValue: string) => void;
	searchResult: Images[] | undefined;
};
