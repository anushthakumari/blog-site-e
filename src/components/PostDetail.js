import { useParams } from "react-router-dom";
import { usePosts } from "./Context/PostContext";

function PostDetail() {
  const { id } = useParams();
  const { posts } = usePosts();
  const postDetail = posts.find((item) => item.id === id);
  return (
    <div>
      <h1>{postDetail?.title}</h1>
      <h1>{postDetail?.description}</h1>
    </div>
  );
}

export default PostDetail;
