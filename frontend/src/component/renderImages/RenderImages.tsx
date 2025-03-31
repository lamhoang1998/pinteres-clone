import { Link } from "react-router-dom";
import { Images, Items, SavedImg } from "../../types/picture.type";
import styles from "./RenderImage.module.css";
import { checkPathAvatar } from "../../helpers/function.helper";
import { useSaveImg } from "../../common/api/mutation/mutation";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { getAccessToken } from "../../helpers/auth.helper";
import { useSavedImgByUser } from "../../common/api/queries/images.queries";
import { TRes } from "../../types/app.types";
import { UserInfo } from "../../types/user.type";

type RenderImagesProps<T> = {
	data: T | undefined;
	isSaved?: boolean;
};

function RenderImages<T extends Items<UserInfo>[] | Images[]>({
	data,
	isSaved,
}: RenderImagesProps<T>) {
	const saveImg = useSaveImg();

	const queryClient = useQueryClient();

	const accessToken = getAccessToken();

	let savedImg: UseQueryResult<TRes<SavedImg>, Error>;

	if (accessToken) {
		savedImg = useSavedImgByUser();
	}

	return (
		<div className={styles.Container}>
			{data?.map((img) => {
				isSaved = savedImg?.data?.metaData.images.some(
					(savedImg) => savedImg.imgId === img.imgId
				);

				const userInfo = "users" in img && img.users;

				return (
					<Link to={`/imageDetails/${img.imgId}`} key={img.imgId}>
						<div className={styles.imgContainer}>
							<img
								key={img.imgId}
								className={`${styles.img}`}
								src={checkPathAvatar(img.url) as string}
								alt="Dynamic Image"
							/>
							{userInfo && (
								<div className={styles.userInfoContainer}>
									<span>{img.imgName}</span>
									<div className={styles.userInfo}>
										<span className={styles.fullName}>
											{img.users.fullName}
										</span>
										<img
											className={styles.userAvatar}
											src={checkPathAvatar(img.users?.avatar) as string}
										/>
									</div>
								</div>
							)}
							{isSaved ? (
								<button className={styles.savedBtn}>saved</button>
							) : (
								<button
									className={styles.saveBtn}
									onClick={(e) => {
										e.preventDefault();
										saveImg.mutate(img.imgId, {
											onSuccess: () => {
												// Invalidate the query to refetch saved images
												queryClient.invalidateQueries({
													queryKey: ["savedImg"],
												});
											},
										});
									}}
								>
									{saveImg.isPending && saveImg.variables === img.imgId
										? `saving...`
										: `save`}
								</button>
							)}
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default RenderImages;
