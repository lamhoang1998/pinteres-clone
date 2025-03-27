import { useState } from "react";
import { getAccessToken } from "../helpers/auth.helper";
import {
	useGetAllPicture,
	useSavedImgByUser,
} from "../common/api/queries/images.queries";
import styles from "./Home.module.css";
import { checkPathAvatar } from "../helpers/function.helper";
import { Link } from "react-router-dom";
import { useSaveImg } from "../common/api/mutation/mutation";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Images, Items, SavedImg } from "../types/picture.type";
import { TRes } from "../types/app.types";
import { AxiosResponse } from "axios";
import { useAuth } from "../context/authContext";
import RenderImages from "../component/renderImages/RenderImages";
import { UserInfo } from "../types/user.type";
import { useAppSelector } from "../hooks";

function Home() {
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 3,
	});

	const accessToken = getAccessToken();

	const data = useGetAllPicture(pagination.page, pagination.pageSize);

	const queryClient = useQueryClient();

	const saveImg = useSaveImg();

	let savedImg: UseQueryResult<TRes<SavedImg>, Error>;

	const isVerified = useAppSelector((store) => store.userState.info);

	console.log("verified", isVerified);

	if (accessToken) {
		savedImg = useSavedImgByUser();
	}

	const items = data.data?.data.metaData.items;

	const { searchResult } = useAuth();
	console.log("search result home", searchResult);

	return (
		<div>
			{searchResult ? (
				<RenderImages<Images[]> data={searchResult} isSaved />
			) : (
				<RenderImages<Items<UserInfo>[]> data={items} isSaved />
			)}
		</div>
	);
}

export default Home;
