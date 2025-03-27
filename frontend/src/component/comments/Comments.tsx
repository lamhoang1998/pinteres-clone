import { useState } from "react";
import { useGetComments } from "../../common/api/queries/comments.queries";
import ErrorDisplay from "../Error/ErrorDisplay";
import ChildComment from "./Comment";
import styles from "./Comments.module.css";
import { useAddComment } from "../../common/api/mutation/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { AddComment } from "../../types/comment.types";

function Comments({ imgId }: { imgId: string | undefined }) {
	const { data, isLoading, isError, error } = useGetComments(imgId);

	const addComment = useAddComment();

	const queryClient = useQueryClient();

	const [comment, setComment] = useState("");

	const comments = data?.metaData;
	console.log("comments", comments);

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
				{comments &&
					comments.map((comment) => (
						<ChildComment
							imgId={imgId}
							commentId={comment.commentId}
							comment={comment.commentContent}
							hierachy={comment.hierachy}
							avatar={comment.users.avatar}
							fullName={comment.users.fullName}
						/>
					))}

				<input
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						const data: AddComment = {
							comment: comment,
							imgId: imgId,
						};

						addComment.mutate(data, {
							onSuccess: () => {
								queryClient.invalidateQueries({ queryKey: ["getComments"] });
								setComment("");
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

export default Comments;
