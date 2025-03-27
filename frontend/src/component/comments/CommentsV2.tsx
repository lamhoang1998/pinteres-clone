import { useState } from "react";
import { useGetComments } from "../../common/api/queries/comments.queries";
import ErrorDisplay from "../Error/ErrorDisplay";
import styles from "./Comments.module.css";
import { useAddComment } from "../../common/api/mutation/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { AddComment } from "../../types/comment.types";
import Reply from "./Reply";

function CommentsV2({ imgId }: { imgId: string | undefined }) {
	const { data, isError, error } = useGetComments(imgId);

	const addComment = useAddComment();

	const queryClient = useQueryClient();

	const [comment, setComment] = useState("");

	const [revealComments, setRevealComments] = useState(false);

	const comments = data?.metaData;

	const numberOfComments = comments?.length;

	const initialWidthForReplies = 1150;

	if (isError) {
		return (
			<div>
				{error && <ErrorDisplay message={error.response?.data.message} />}
			</div>
		);
	}

	if (data) {
		return (
			<div className={styles.commentsContainer}>
				{numberOfComments ? (
					<span
						onClick={() => {
							setRevealComments(true);
						}}
					>
						{numberOfComments} comments
					</span>
				) : (
					<span>what do you think? tell us </span>
				)}
				{comments &&
					revealComments &&
					comments.map((comment) => (
						<Reply
							imgId={imgId}
							commentId={comment.commentId}
							comment={comment.commentContent}
							hierachy={comment.hierachy}
							avatar={comment.users.avatar}
							fullName={comment.users.fullName}
							width={initialWidthForReplies}
						/>
					))}

				<input
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					className={styles.commentInput}
				/>
				<button
					disabled={!comment && true}
					onClick={() => {
						const data: AddComment = {
							comment: comment,
							imgId: imgId,
						};

						addComment.mutate(data, {
							onSuccess: () => {
								queryClient.invalidateQueries({ queryKey: ["getComments"] });
								setComment("");
								setRevealComments(true);
							},
						});
					}}
				>
					comment
				</button>
			</div>
		);
	}
}

export default CommentsV2;
