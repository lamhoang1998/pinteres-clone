import { useEffect, useRef, useState } from "react";
import styles from "./UploadImgForm.module.css";
import {
	useUpdateAvatarCloud,
	useUpdateAvatarLocal,
} from "../../common/api/mutation/mutation";
import { Button } from "../Button/Button";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks";
import { getInfo } from "../../reducers/users.reducers";
import { resError } from "../../helpers/function.helper";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function UploadImgForm() {
	const updateAvatarLocal = useUpdateAvatarLocal();
	const updateAvatarCloud = useUpdateAvatarCloud();
	const dispatch = useAppDispatch();

	const [avatar, setAvatar] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | undefined>(undefined);

	const inputEl = useRef<HTMLInputElement>(null);
	const updateBtnEl = useRef<HTMLDivElement>(null);

	useEffect(function () {
		const handleClick = () => {
			if (inputEl.current) {
				inputEl.current.click();
			}
		};

		const currentBtn = updateBtnEl.current;
		currentBtn?.addEventListener("click", handleClick);

		return () => {
			currentBtn?.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<form
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

					console.log("formData", formData);
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
						console.log(e.target.files);
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
				{/* <div className={styles.displayAvatar}></div>
					<div className={styles.updateBtnContainer}></div> */}
			</div>
			<div className={styles.changingBtnContainer}>
				{/* <button type="submit" data-action="local" className={`button`}>
						upload local
					</button>
					<button type="submit" data-action="cloud" className={`button`}>
						upload cloud
					</button> */}
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
		</form>
	);
}

export default UploadImgForm;
