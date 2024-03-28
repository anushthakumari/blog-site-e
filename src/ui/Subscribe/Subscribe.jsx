import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ArrowBack, Done } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { usePosts } from "../../components/Context/PostContext";
import FeaturedPost from "../../components/FeaturedPost";

const allTopics = [
  "Academic Resources",
  "Career Services",
  "Campus",
  "Culture",
  "Local Community Resources",
  "Social",
  "Sports",
  "Health and Wellness",
  "Technology",
  "Travel",
  "Alumni",
];

function Subscribe() {
  const [topicsSelected, setTopicsSelected] = useState([]);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [savedTopics, setSavedTopics] = useState([]);
  const [anyChange, setAnyChange] = useState(false);
  const { posts } = usePosts();
  const [topicWisePosts, setTopicWisePosts] = useState([]);

  useEffect(() => {
    setAnyChange(
      JSON.stringify(savedTopics.sort()) !==
        JSON.stringify(topicsSelected.sort())
    );
  }, [JSON.stringify(savedTopics), JSON.stringify(topicsSelected)]);

  useEffect(() => {
    setTopicWisePosts(
      posts.filter((post) => topicsSelected.includes(post.category))
    );
  }, [posts, topicsSelected]);

  useEffect(() => {
    if (localStorage) {
      const fetchedTopics =
        JSON.parse(localStorage.getItem("subscribedTopics")) || [];
      setTopicsSelected(fetchedTopics);
      setSavedTopics(fetchedTopics);
      setAlreadySubscribed(fetchedTopics.length !== 0);
    }
  }, []);

  function handleSubscribe() {
    localStorage.removeItem("subscribedTopics");
    localStorage.setItem(
      "subscribedTopics",
      JSON.stringify(topicsSelected) || ""
    );
    setSavedTopics(topicsSelected);
    setAlreadySubscribed(true);
    alert("Subscribed for topics: " + topicsSelected.join(", "));
  }

  function handleUnsubscribe() {
    const userAgreed = window.confirm("Are you sure to unsubscribe ?");
    if (!userAgreed) return;
    setTopicsSelected([]);
    setAlreadySubscribed(false);
    localStorage.removeItem("subscribedTopics");
  }

  return (
    <>
      <Grid
        container
        sx={{
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          marginInline: "auto",
        }}
        rowSpacing={5}
      >
        <Grid item>
          <RouterLink
            to="/"
            style={{
              color: blue[600],
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.1rem",
                textDecoration: "none",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ArrowBack
                sx={{
                  height: "1.2rem",
                }}
              />
              Home
            </Typography>
          </RouterLink>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Choose topics to subscribe
              </Typography>
            </Grid>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {allTopics.map((topic, i) => (
                  <Button
                    key={i}
                    color="secondary"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "0.7rem",
                    }}
                    variant={
                      topicsSelected.includes(topic) ? "contained" : "outlined"
                    }
                    onClick={() => {
                      if (topicsSelected.includes(topic)) {
                        setTopicsSelected((state) =>
                          state.filter((el) => el !== topic)
                        );
                      } else {
                        setTopicsSelected((state) => [...state, topic]);
                      }
                    }}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
            color="primary"
            onClick={handleSubscribe}
            disabled={topicsSelected.length === 0 || !anyChange}
          >
            {alreadySubscribed ? "Update" : "Subscribe"}
          </Button>
          {alreadySubscribed && (
            <Button
              variant="outlined"
              sx={{
                display: "flex",
                gap: "0.5rem",
              }}
              color="primary"
              onClick={handleUnsubscribe}
            >
              Unsubscribe
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={4} padding={5}>
        {topicWisePosts.map((post) => (
          <FeaturedPost key={post.id} post={post} />
        ))}
      </Grid>
    </>
  );
}
export default Subscribe;
