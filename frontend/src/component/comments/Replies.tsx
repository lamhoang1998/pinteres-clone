import { useState } from "react";
import { useGetReplies } from "../../common/api/queries/comments.queries";
import styles from "./Replies.module.css";
import { checkPathAvatar } from "../../helpers/function.helper";
import { useReply } from "../../common/api/mutation/mutation";
import { TypeReply } from "../../types/comment.types";
import { useQueryClient } from "@tanstack/react-query";

function Replies({
	imgId,
	commentId,
	comment,
	hierachy,
	avatar,
	fullName,
	width,
}: {
	imgId: string | undefined;
	commentId: number | undefined;
	comment: string | undefined;
	hierachy: number | undefined;
	avatar: string | undefined;
	fullName: string | undefined;
	width: number;
}) {
	const replies = useGetReplies(imgId, commentId, hierachy && hierachy + 1);

	const replyToComment = useReply();

	const queryClient = useQueryClient();

	const [isOpen, setIsOpen] = useState(false);

	const [reply, setReply] = useState("");

	return (
		<div style={{ maxWidth: `${width}px` }} className={styles.container}>
			<div className={styles.userAvatarContainer}>
				<img
					src={checkPathAvatar(avatar) as string}
					className={styles.userAvatar}
				/>
				<div className={styles.commentNameContainer}>
					<span>{fullName}</span>
					<span>{comment}</span>
				</div>
			</div>
			<button
				className={styles.replyBtn}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				reply
			</button>
			{isOpen && (
				<div>
					{replies &&
						replies.data?.metaData.map((reply) => (
							<Replies
								imgId={imgId}
								commentId={reply.commentId}
								comment={reply.commentContent}
								hierachy={reply.hierachy}
								avatar={reply.users.avatar}
								fullName={reply.users.fullName}
								width={width - 100}
							/>
						))}
					<input
						value={reply}
						onChange={(e) => {
							setReply(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							const replyData: TypeReply = {
								reply: reply,
								imgId: imgId,
								parentId: commentId,
							};

							replyToComment.mutate(replyData, {
								onSuccess: () => {
									queryClient.invalidateQueries({ queryKey: ["getReplies"] });
									setReply("");
								},
							});
						}}
					>
						reply
					</button>
				</div>
			)}
		</div>
	);
}

export default Replies;
