import { useState } from "react";
import styles from "./Comment.module.css";
import { useGetReplies } from "../../common/api/queries/comments.queries";
import Replies from "./Replies";
import { checkPathAvatar } from "../../helpers/function.helper";
import { useReply } from "../../common/api/mutation/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { TypeReply } from "../../types/comment.types";

console.log(styles);

function ChildComment({
	imgId,
	commentId,
	comment,
	hierachy,
	avatar,
	fullName,
}: {
	imgId: string | undefined;
	commentId: number | undefined;
	comment: string | undefined;
	hierachy: number | undefined;
	avatar: string | undefined;
	fullName: string | undefined;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [reply, setReply] = useState("");

	const replies = useGetReplies(imgId, commentId, hierachy && hierachy + 1);
	console.log("replies", replies);

	const replyToComment = useReply();

	const queryClient = useQueryClient();

	const initialWidthForReplies = 1080;

	return (
		<div className={styles.container}>
			<div className={styles.userAvatarContainer}>
				<img
					src={checkPathAvatar(avatar) as string}
					className={styles.userAvatar}
				/>
				<div className={styles.commentNameContainer}>
					<span>{fullName}</span>
					<span className={styles.commentContent}>{comment}</span>
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
								width={initialWidthForReplies}
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
								onSuccess: (data) => {
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

export default ChildComment;
