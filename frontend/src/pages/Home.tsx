import { useGetAllPicture } from "../common/api/queries/images.queries";
import { Images, Items } from "../types/picture.type";
import { useAuth } from "../context/authContext";
import RenderImages from "../component/renderImages/RenderImages";
import { UserInfo } from "../types/user.type";
import { useAppSelector } from "../hooks";

function Home() {
	// const [pagination, setPagination] = useState({
	// 	page: 1,
	// 	pageSize: 3,
	// });

	// const accessToken = getAccessToken();

	const data = useGetAllPicture();

	console.log("all image", data);

	// const queryClient = useQueryClient();

	// const saveImg = useSaveImg();

	// let savedImg: UseQueryResult<TRes<SavedImg>, Error>;

	const isVerified = useAppSelector((store) => store.userState.info);

	console.log("verified", isVerified);

	// if (accessToken) {
	// 	savedImg = useSavedImgByUser();
	// }

	const items = data.data?.data.metaData.items;

	console.log("items", items);

	const { searchResult } = useAuth();

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
