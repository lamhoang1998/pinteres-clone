import { useParams } from "react-router-dom";
import { checkPathAvatar } from "../helpers/function.helper";
import styles from "./ImageDetails.module.css";
import { useImgDetails } from "../common/api/queries/images.queries";
import CommentsV2 from "../component/comments/CommentsV2";
import { useAuth } from "../context/authContext";

function ImageDetails() {
	const { id } = useParams();

	const { toggleShowEdit, setImgDetails } = useAuth();

	const data = useImgDetails(id);
	const details = data.data?.data.metaData;

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<img
					className={styles.img}
					src={checkPathAvatar(details?.url) as string}
				/>
				<div className={styles.detailContainer}>
					<div className={styles.downloadAndSave}>
						<button
							className={styles.editBtn}
							onClick={() => {
								setImgDetails(details);
								toggleShowEdit();
							}}
						>
							Edit
						</button>
						<button className={styles.saveBtn}>Save</button>
					</div>
					<div className={styles.imgDetails}>
						<span className={styles.imgName}>{details?.imgName}</span>
						<span className={styles.imgDesc}>{details?.desc}</span>
						<div className={styles.userAvatarContainer}>
							<img
								src={checkPathAvatar(details?.users.avatar) as string}
								className={styles.userAvatar}
							/>
							<span>{details?.users.fullName}</span>
						</div>
					</div>
				</div>
			</div>

			<CommentsV2 imgId={id} />
		</div>
	);
}

export default ImageDetails;
