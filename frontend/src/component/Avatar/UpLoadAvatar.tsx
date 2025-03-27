// import React, { useRef, useState } from "react";

// import styles from "./UpLoadAvatar.module.css";
// import {
// 	useUpdateAvatarCloud,
// 	useUpdateAvatarLocal,
// } from "../../common/api/mutation/mutation";
// import { toast } from "react-toastify";
// import { resError } from "../../helpers/function.helper";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import { getInfo } from "../../reducers/users.reducers";
// import { Button } from "../Button/Button";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// function UpLoadAvatar() {
// 	const userInfo = useAppSelector((store) => store.userState.info);
// 	const dispatch = useAppDispatch();

// 	const inputEl = useRef<HTMLInputElement>(null);
// 	const updateBtnEl = useRef<HTMLDivElement>(null);

// 	const updateAvatarLocal = useUpdateAvatarLocal();
// 	const updateAvatarCloud = useUpdateAvatarCloud();

// 	const [avatar, setAvatar] = useState<File | null>(null);
// 	const [preview, setPreview] = useState<string | undefined>(undefined);

// 	return (
// 		<form
// 			className={styles.changingAvatarContainer}
// 			onSubmit={(e) => {
// 				e.preventDefault();
// 				const actionType = (
// 					e.nativeEvent as SubmitEvent
// 				).submitter?.getAttribute("data-action");

// 				if (actionType === "cloud") {
// 					if (avatar === null) return;

// 					console.log("avatar", avatar);
// 					const formData = new FormData();
// 					console.log(formData.getAll(`avatar`));

// 					formData.append("avatar", avatar);

// 					updateAvatarCloud.mutate(formData, {
// 						onSuccess: () => {
// 							toast.success(`Upload avatar to cloud successfully`);
// 							dispatch(getInfo());
// 							setPreview(undefined);
// 						},
// 						onError: (err) => {
// 							toast.error(resError(err, `Upload avatar to cloud failed`));
// 						},
// 					});
// 				} else {
// 					if (avatar === null) return;

// 					console.log("avatar", avatar);
// 					const formData = new FormData();
// 					console.log(formData.getAll(`avatar`));

// 					formData.append("avatar", avatar);

// 					console.log("formData", formData);
// 					updateAvatarLocal.mutate(formData, {
// 						onSuccess: () => {
// 							toast.success(`Upload avatar to local successfully`);
// 							dispatch(getInfo());
// 							setPreview(undefined);
// 						},
// 						onError: (err) => {
// 							toast.error(resError(err, `Upload avatar to local failed`));
// 						},
// 					});
// 				}
// 			}}
// 		>
// 			<input
// 				type="file"
// 				ref={inputEl}
// 				id="uploadAvatarInput"
// 				className={`${styles.uploadAvatarInput}`}
// 				onChange={(e) => {
// 					if (e.target.files && e.target.files.length > 0) {
// 						setAvatar(e.target.files[0]); // Get the actual file name
// 						setPreview(URL.createObjectURL(e.target.files[0]));
// 					}
// 				}}
// 			/>
// 			<div ref={updateBtnEl} className={`${styles.updateBtn} updateBtn`}>
// 				<div className={styles.updateBtnImg}>
// 					<img
// 						src={preview ? `${preview}` : `../../public/26448-200.png`}
// 						className={`${preview ? `${styles.previewImg}` : ""}`}
// 					/>
// 				</div>
// 				<div className={styles.updateBtnText}>
// 					<span>click to upload image</span>
// 				</div>
// 			</div>
// 			<div className={styles.changingBtnContainer}>
// 				<Button
// 					data-action="local"
// 					className={` ${preview ? styles.btnUpdateActive : ``}`}
// 				>
// 					{updateAvatarLocal.isPending ? (
// 						<AiOutlineLoading3Quarters className={styles.pendingButton} />
// 					) : (
// 						"upload local"
// 					)}
// 				</Button>
// 				<Button
// 					data-action="cloud"
// 					className={` ${preview ? styles.btnUpdateActive : ``}`}
// 				>
// 					{updateAvatarCloud.isPending ? (
// 						<AiOutlineLoading3Quarters className={styles.pendingButton} />
// 					) : (
// 						"upload cloud"
// 					)}
// 				</Button>
// 			</div>
// 		</form>
// 	);
// }

// export default UpLoadAvatar;

import { useRef } from "react";
import styles from "./UpLoadAvatar.module.css";
import { Button } from "../Button/Button";

interface UpLoadAvatarProps {
	avatar: File | null;
	preview: string | undefined;
	onAvatarChange: (file: File | null, previewUrl: string | undefined) => void;
}

function UpLoadAvatar({ avatar, preview, onAvatarChange }: UpLoadAvatarProps) {
	const inputEl = useRef<HTMLInputElement>(null);

	return (
		<form
			className={styles.changingAvatarContainer}
			onSubmit={(e) => {
				e.preventDefault();
				const actionType = (
					e.nativeEvent as SubmitEvent
				).submitter?.getAttribute("data-action");

				if (actionType === "cloud" || actionType === "local") {
					if (avatar === null) return;

					const formData = new FormData();
					formData.append("avatar", avatar);

					// Handle the upload logic in the parent component
					// You can pass the formData to the parent if needed
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
						const file = e.target.files[0];
						const previewUrl = URL.createObjectURL(file);
						onAvatarChange(file, previewUrl);
					}
				}}
			/>
			<div className={`${styles.updateBtn} updateBtn`}>
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
					{/* Add loading state if needed */}
					upload local
				</Button>
				<Button
					data-action="cloud"
					className={` ${preview ? styles.btnUpdateActive : ``}`}
				>
					{/* Add loading state if needed */}
					upload cloud
				</Button>
			</div>
		</form>
	);
}

export default UpLoadAvatar;
