import styles from "./Profile.module.css";
import { useAppSelector } from "../hooks";
import { useEffect, useRef, useState } from "react";

import { checkPathAvatar } from "../helpers/function.helper";
import { Link } from "react-router-dom";
import {
	useCreatedImgByUser,
	useSavedImgByUser,
} from "../common/api/queries/images.queries";
import RenderImages from "../component/renderImages/RenderImages";
import { Images } from "../types/picture.type";

function Profile() {
	const userInfo = useAppSelector((store) => store.userState.info);

	const createdImg = useCreatedImgByUser();

	const savedImg = useSavedImgByUser();

	const inputEl = useRef<HTMLInputElement>(null);
	const updateBtnEl = useRef<HTMLDivElement>(null);

	const [isUpload, setIsUpload] = useState(true);

	function handleToggleBtn() {
		setIsUpload(!isUpload);
	}

	useEffect(function () {
		const handleClick = () => {
			if (inputEl.current) {
				inputEl.current.click();
			}
		};

		const currentBtn = updateBtnEl.current;
		currentBtn?.addEventListener("click", handleClick);

		// Cleanup function to remove the event listener
		return () => {
			currentBtn?.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className={styles.profileContainer}>
			<div className={styles.avatarContainer}>
				<img
					src={checkPathAvatar(userInfo?.avatar) as string}
					className={styles.avatarProfile}
				/>
				<div className={styles.avatarInfo}>
					<span>{userInfo?.fullName}</span>
				</div>
				<Link to="/editprofile">
					<button className={styles.viewProfileBtn}>Edit Profile</button>
				</Link>
			</div>

			<div className={styles.toggleBtnContainer}>
				<button
					onClick={handleToggleBtn}
					style={{ color: `${!isUpload ? `red` : ``} ` }}
				>
					save
				</button>
				<button
					onClick={handleToggleBtn}
					style={{ color: `${isUpload ? `red` : ``} ` }}
				>
					upload
				</button>
			</div>

			{isUpload ? (
				<div className={styles.uploadedPictureContainer}>
					<RenderImages<Images[]> data={createdImg.data?.metaData.images} />
				</div>
			) : (
				<div className={styles.savedPictureContainer}>
					<RenderImages<Images[]> data={savedImg.data?.metaData.images} />
				</div>
			)}
		</div>
	);
}

export default Profile;
