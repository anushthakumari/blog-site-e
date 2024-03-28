import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Comments.css";
import { usePosts } from "../Context/PostContext";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs
import { useAccounts } from "../Context/AccountsContext";

function Comments({ post }) {
  const { posts, setPosts } = usePosts();
  const [newComment, setNewComment] = useState("");
  const { currAcc } = useAccounts();

  const handleAddComment = () => {
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

  return (
    <div>
      <div className="conatiner">
        <p className="comment-title">Comment</p>
        <TextField
          id="outlined-basic"
          label="Comment"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          inputProps={{
            style: {
              height: "100px",
              width: "500px",
            },
          }}
        />
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
