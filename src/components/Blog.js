import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
// import Main from "./Main";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { usePosts } from "./Context/PostContext";
// import post1 from "./blog-post.1.md";
// import post2 from "./blog-post.2.md";
// import post3 from "./blog-post.3.md";

const sections = [
  { title: "Academic Resources", url: "#" },
  { title: "Career Services", url: "#" },
  { title: "Campus", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Local Community Resources", url: "#" },
  { title: "Social", url: "#" },
  { title: "Sports", url: "#" },
  { title: "Health and Wellness", url: "#" },
  { title: "Technology", url: "#" },
  { title: "Travel", url: "#" },
  { title: "Alumni", url: "#" },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const { posts } = usePosts();
  const [postList, setPostList] = React.useState([]);
  const mainFeaturedPost = posts[3];

  React.useEffect(() => {
    setPostList(posts);
  }, [JSON.stringify(posts)]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="IIT Student Blog"
          sections={sections}
          setPostList={setPostList}
        />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {postList.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Follow Us!"
        description="For inquiries or collaboration opportunities, contact us at asp@hawk.iit.edu"
      />
    </ThemeProvider>
  );
}
