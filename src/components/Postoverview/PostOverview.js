import React from "react";
import Comments from "./Comments";
import "./PostOverview.css";
import { useParams } from "react-router-dom";
import { usePosts } from "../Context/PostContext";
import ProductHeader from "../../ui/ProductHeader/ProductHeader";
// import Header from "../Header";
// import { Button } from "@mui/material";
// const sections = [
//   { title: "Academic Resources", url: "#" },
//   { title: "Career Services", url: "#" },
//   { title: "Campus", url: "#" },
//   { title: "Culture", url: "#" },
//   { title: "Local Community Resources", url: "#" },
//   { title: "Social", url: "#" },
//   { title: "Sports", url: "#" },
//   { title: "Health and Wellness", url: "#" },
//   { title: "Technology", url: "#" },
//   { title: "Travel", url: "#" },
//   { title: "Alumni", url: "#" },
// ];
function PostOverview() {
  const { id } = useParams();
  const { posts } = usePosts();
  const finalPost = posts.find((item) => item.id === id);
  console.log(finalPost);
  // const navigate = useNavigate();
  // function handleBack() {
  //   navigate(-1);
  // }
  return (
    <div>
      {/* <Header title="IIT Student Blog" sections={sections} /> */}
      <ProductHeader />
      <div>
        <div className="conatiner">
          {/* <Button
            size="small"
            style={{ position: "absolute", top: 0 }}
            variant="contained"
            onClick={handleBack}
          >
            Back
          </Button> */}
          <div>
            <p className="post-title">{finalPost.title}</p>
            <div className="post-info">
              <img className="user-image" src={finalPost.image} alt="user" />
              <p>Written by {finalPost.createdBy}</p>
              <p>created At : {finalPost.date}</p>
            </div>
          </div>
          <div>
            <img className="post-image" src={finalPost.image} alt="user" />
          </div>
          <p>{finalPost.description}</p>
        </div>
        <Comments post={finalPost} />
      </div>
    </div>
  );
}

export default PostOverview;
