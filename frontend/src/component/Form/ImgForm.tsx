import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hotelSchema } from "../../types/hotelSchema";

import styles from "./ImgForm.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { imgDetails } from "../../types/picture.type";
import { checkPathAvatar } from "../../helpers/function.helper";

export type ImgFormData = {
	imgName: string;
	description: string;
	img: FileList;
	url: string;
};

type ImgFormProps = {
	onSave: (imgFormData: FormData) => void;
	image?: imgDetails;
	isEdit?: boolean;
};

function ImgForm({ onSave, image, isEdit = false }: ImgFormProps) {
	console.log("image", image);

	const { register, handleSubmit, reset, watch } = useForm<ImgFormData>({
		resolver: zodResolver(hotelSchema),
	});

	const imageFormData = useMemo(() => {
		return {
			imgName: image?.imgName,
			description: image?.desc,
			url: image?.url,
		};
	}, [image]);

	useEffect(() => {
		reset(imageFormData);
	}, [reset, imageFormData]);

	const existImgUrl = watch("url");

	console.log("img url", existImgUrl);

	const { toggleShowModal, toggleShowEdit } = useAuth();

	const [preview, setPreview] = useState<string | undefined>(undefined);

	const [isDelete, setIsDelete] = useState(false);

	const inputEl = useRef<HTMLInputElement>(null);
	const updateBtnEl = useRef<HTMLDivElement>(null);

	const img = register("img");

	// useEffect(function () {
	// 	function handleClick() {
	// 		console.log("click");
	// 		inputEl?.current?.click();
	// 	}

	// 	const currentBtn = updateBtnEl.current;

	// 	currentBtn?.addEventListener("click", handleClick);

	// 	return () => {
	// 		currentBtn?.removeEventListener("click", handleClick);
	// 	};
	// }, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	}

	const onSubmit = handleSubmit(
		(data) => {
			console.log("img form data", data);
			const imgFormData = new FormData();
			imgFormData.append("imgName", data.imgName);
			imgFormData.append("desc", data.description);
			if (data.img && data.img.length > 0) {
				imgFormData.append("img", data.img[0]);
			}

			onSave(imgFormData);
		},
		(errors) => {
			console.error("Form errors", errors);
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.backDrop}></div>
			<div className={styles.postBody}>
				<button
					className={styles.closeBtn}
					onClick={isEdit ? toggleShowEdit : toggleShowModal}
				>
					close
				</button>
				<form className={styles.form} onSubmit={onSubmit}>
					<label className={styles.label} htmlFor="imgName">
						Image Name
					</label>
					<input
						className={styles.input}
						type="text"
						id="imgName"
						{...register("imgName")}
					/>
					<label className={styles.label} htmlFor="description">
						description
					</label>
					<textarea
						id="descrption"
						{...register("description")}
						rows={5}
						className={styles.textarea}
					></textarea>
					<label className={styles.label} htmlFor="img">
						upload image
					</label>
					<input
						type="file"
						id="uploadAvatarInput"
						className={styles.updateImgInput}
						name={img.name}
						ref={(e) => {
							img.ref(e);
							if (e) {
								(
									inputEl as React.MutableRefObject<HTMLInputElement | null>
								).current = e;
							}
						}}
						onChange={(e) => {
							img.onChange(e);
							handleChange(e);
						}}
						onBlur={img.onBlur}
					/>
					<div
						ref={updateBtnEl}
						onClick={() => {
							inputEl?.current?.click();
						}}
					>
						<div className={styles.updateBtnImg}>
							{existImgUrl && !isDelete ? (
								<div className={styles.editImgContainer}>
									<img
										src={checkPathAvatar(existImgUrl) as string}
										className={styles.previewImg}
									/>
									<button
										type="button"
										className={styles.deleteImg}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											setIsDelete(!isDelete);
										}}
									>
										delete
									</button>
								</div>
							) : (
								<img
									src={preview ? `${preview}` : `../../public/26448-200.png`}
									className={`${preview ? `${styles.previewImg}` : ""}`}
								/>
							)}
						</div>
						<div className={styles.updateBtnText}>
							<span>click to upload image</span>
						</div>
					</div>

					<button type="submit" className={styles.button}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default ImgForm;
