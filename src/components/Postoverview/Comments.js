import { useState, useEffect } from "react";
import {
	Button,
	TextField,
	Switch,
	Stack,
	Typography,
	CircularProgress,
} from "@mui/material";

import "./Comments.css";
import { usePosts } from "../Context/PostContext";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs
import { useAccounts } from "../Context/AccountsContext";

import { generatePostReply } from "../../libs/openai";

function Comments({ post }) {
	const { posts, setPosts } = usePosts();
	const [newComment, setNewComment] = useState("");
	const [suggetedReplies, setsuggetedReplies] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const { currAcc } = useAccounts();

	const [isAiReplyEnabled, setIsAiReplyEnabled] = useState(false);

	const handleAddComment = () => {
		if (!newComment?.trim()) {
			return;
		}

		const updatedPosts = posts.map((p) => {
			if (p.id === post.id) {
				const comment = {
					id: uuidv4(),
					text: newComment,
					createdAt: new Date().toLocaleString(undefined, {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
					}), // Store current timestamp as the creation time
					createdBy: currAcc.name, // Replace "Vivek" with the actual creator's name
				};
				return {
					...p,
					comments: [...p.comments, comment],
				};
			}
			return p;
		});
		setPosts(updatedPosts);
		setNewComment(""); // Clear the input field after adding the comment
	};

	const handleSwitchChange = (e) => {
		const checked = e.target.checked;
		setIsAiReplyEnabled(checked);
	};

	const handleReplyClick = (reply = "") => {
		setNewComment(reply);
	};

	useEffect(() => {
		if (isAiReplyEnabled && !suggetedReplies.length) {
			async function fetchReply() {
				try {
					setisLoading(true);
					const replyArr = await generatePostReply(
						post.title,
						post.category,
						post.description
					);

					if (replyArr) {
						setsuggetedReplies(replyArr);
					}
				} catch (error) {
					console.log("error generating reply!");
				} finally {
					setisLoading(false);
				}
			}

			fetchReply();
		}
	}, [
		isAiReplyEnabled,
		post.title,
		post.description,
		post.category,
		suggetedReplies.length,
	]);

	return (
		<div>
			<div className="conatiner">
				<p className="comment-title">Comment</p>
				<TextField
					id="outlined-basic"
					label="Comment"
					variant="outlined"
					value={newComment}
					multiline
					fullWidth
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<Stack direction={"row"} mb={1}>
					<Switch
						size="small"
						checked={isAiReplyEnabled}
						onChange={handleSwitchChange}
					/>
					<Typography component="span">
						Suggest me AI generated Reply
					</Typography>
				</Stack>
				<Stack mt={2} direction={"row"} gap={2}>
					{isLoading ? <CircularProgress size={18} /> : null}
					{isAiReplyEnabled
						? suggetedReplies.map((v) => {
								return (
									<Typography
										component={"button"}
										sx={{
											backgroundColor: "#d1d1d1",
											padding: "0.8rem",
											borderRadius: "8px",
											outline: "none",
											textAlign: "left",
											border: "none",
											cursor: "pointer",
										}}
										onClick={handleReplyClick.bind(this, v)}
										textOverflow={"ellipsis"}
										key={v}>
										{v}
									</Typography>
								);
						  })
						: null}
				</Stack>
				<Button variant="contained" onClick={handleAddComment}>
					Add Comment
				</Button>
			</div>
			<div className="comments">
				{post.comments.map((comment, i) => (
					<div className="comment" key={comment.id}>
						<p>{comment.text}</p>
						<p>Created By: {comment.createdBy}</p>
						<p>Created At: {comment.createdAt}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Comments;
