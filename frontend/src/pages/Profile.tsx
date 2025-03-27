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
			{/* <form
				className={styles.changingAvatarContainer}
				onSubmit={(e) => {
					e.preventDefault();
					console.log(avatar);
					const actionType = (
						e.nativeEvent as SubmitEvent
					).submitter?.getAttribute("data-action");

					if (actionType === "cloud") {
						if (avatar === null) return;

						console.log("avatar", avatar);
						const formData = new FormData();
						console.log(formData.getAll(`avatar`));

						formData.append("avatar", avatar);

						updateAvatarCloud.mutate(formData, {
							onSuccess: () => {
								toast.success(`Upload avatar to cloud successfully`);
								dispatch(getInfo());
								setPreview(undefined);
							},
							onError: (err) => {
								toast.error(resError(err, `Upload avatar to cloud failed`));
							},
						});
					} else {
						if (avatar === null) return;

						console.log("avatar", avatar);
						const formData = new FormData();
						console.log(formData.getAll(`avatar`));

						formData.append("avatar", avatar);

						console.log("formData", formData);
						updateAvatarLocal.mutate(formData, {
							onSuccess: () => {
								toast.success(`Upload avatar to local successfully`);
								dispatch(getInfo());
								setPreview(undefined);
							},
							onError: (err) => {
								toast.error(resError(err, `Upload avatar to local failed`));
							},
						});
					}
				}}
			>
				<input
					type="file"
					ref={inputEl}
					id="uploadAvatarInput"
					className={`${styles.uploadAvatarInput}`}
					onChange={(e) => {
						if (e.target.files && e.target.files.length > 0) {
							setAvatar(e.target.files[0]); // Get the actual file name
							setPreview(URL.createObjectURL(e.target.files[0]));
						}
					}}
				/>
				<div ref={updateBtnEl} className={`${styles.updateBtn} updateBtn`}>
					<div className={styles.updateBtnImg}>
						<img
							src={preview ? `${preview}` : `../../public/26448-200.png`}
							className={`${preview ? `${styles.previewImg}` : ""}`}
						/>
					</div>
					<div className={styles.updateBtnText}>
						<span>click to upload image</span>
					</div>
				</div>
				<div className={styles.changingBtnContainer}>
					<Button
						data-action="local"
						className={` ${preview ? styles.btnUpdateActive : ``}`}
					>
						{updateAvatarLocal.isPending ? (
							<AiOutlineLoading3Quarters className={styles.pendingButton} />
						) : (
							"upload local"
						)}
					</Button>
					<Button
						data-action="cloud"
						className={` ${preview ? styles.btnUpdateActive : ``}`}
					>
						{updateAvatarCloud.isPending ? (
							<AiOutlineLoading3Quarters className={styles.pendingButton} />
						) : (
							"upload cloud"
						)}
					</Button>
				</div>
			</form> */}

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
