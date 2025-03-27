import { useEffect, useRef, useState } from "react";
import styles from "./EditProfile.module.css";
import { Button } from "../component/Button/Button";
import { useUpdateAvatarCloud } from "../common/api/mutation/mutation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks";
import { getInfo } from "../reducers/users.reducers";
import { resError } from "../helpers/function.helper";

function EditProfile() {
	const inputEl = useRef<HTMLInputElement>(null);
	const updateBtnEl = useRef<HTMLDivElement>(null);

	const [avatar, setAvatar] = useState<FileList | null>(null);
	const [preview, setPreview] = useState<string | undefined>(undefined);

	const updateAvatarCloud = useUpdateAvatarCloud();

	const dispatch = useAppDispatch();

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
		<div>
			<div className={styles.changingAvatarContainer}>
				<input
					type="file"
					id="uploadAvatarInput"
					ref={inputEl}
					className={`${styles.uploadAvatarInput}`}
					onChange={(e) => {
						if (e.target.files && e.target.files.length > 0) {
							setAvatar(e.target.files); // Get the actual file name
							setPreview(URL.createObjectURL(e.target.files[0]));
						}
					}}
				/>
				<div className={`${styles.updateBtn} updateBtn`}>
					<div ref={updateBtnEl} className={styles.updateBtnImg}>
						<div className={styles.updateBtnImgContainer}>
							<img
								src={preview ? `${preview}` : `../../public/26448-200.png`}
								className={`${
									preview
										? `${styles.previewImg}`
										: `${styles.updateBtnImgDefault}`
								}`}
							/>
						</div>
					</div>
					<div className={styles.updateBtnText}>
						<Button
							data-action="cloud"
							className={` ${preview ? styles.btnUpdateActive : ``}`}
							onClick={() => {
								const formData = new FormData();

								if (avatar) {
									console.log("avatar", avatar[0]);
									formData.append("avatar", avatar[0]);
								}
								updateAvatarCloud.mutate(formData, {
									onSuccess: () => {
										toast.success(`Upload avatar to local successfully`);
										dispatch(getInfo());
										setPreview(undefined);
									},
									onError: (err) => {
										toast.error(resError(err, `Upload avatar to local failed`));
									},
								});
							}}
						>
							{updateAvatarCloud.isPending ? (
								<AiOutlineLoading3Quarters className={styles.pendingButton} />
							) : (
								"Change avatar"
							)}
						</Button>
					</div>
				</div>
			</div>
			<form action=""></form>
		</div>
	);
}

export default EditProfile;
