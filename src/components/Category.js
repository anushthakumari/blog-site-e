import { useParams } from "react-router-dom";
import { usePosts } from "./Context/PostContext";
import { Container, Grid, Typography } from "@mui/material";

import FeaturedPost from "./FeaturedPost";

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

function Category() {
  const { cat } = useParams();
  const { posts } = usePosts();
  // const navigate = useNavigate();

  // Filter posts by category
  const finalPosts = posts.filter((item) => item.category === cat);

  // function handleBack() {
  //   navigate(-1);
  // }
  return (
    <>
      {/* <Header title={cat} sections={sections} /> */}
      <div style={{ margin: "50px auto" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "20px 0",
              marginBottom: " 40px",
              color: "#333",
            }}
          >
            {cat}
          </Typography>

          <main>
            {/* <Button
            style={{ position: "absolute", top: "5%", left: "5%" }}
            variant="contained"
            onClick={handleBack}
          >
            Back
          </Button> */}
            {finalPosts.length === 0 ? (
              <Typography variant="h5" align="center">
                No posts available in this category.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {/* Render only the posts that match the category */}
                {finalPosts.map((post) => (
                  <FeaturedPost key={post.id} post={post} />
                ))}
              </Grid>
            )}
          </main>
        </Container>
      </div>
    </>
  );
}

export default Category;
