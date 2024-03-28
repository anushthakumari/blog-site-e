import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import { usePosts } from "./Context/PostContext";
// import { useAuth } from "./Context/AuthContext";
import { useAccounts } from "./Context/AccountsContext";
import { Link } from "react-router-dom";

function FeaturedPost(props) {
  const { post } = props; // Destructure post from props
  const { onDeletePost } = usePosts();
  const { currAcc } = useAccounts();

  function handleDelete() {
    onDeletePost(post.id);
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle2" paragraph>
              Category: {post.category}
            </Typography>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/post/${post.id}`}
            >
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.image}
            alt={post.imageLabel}
          />
          {currAcc.role === "moderator" ? (
            <Button
              style={{ position: "absolute", bottom: 10, right: "30%" }}
              variant="contained"
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          ) : null}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
