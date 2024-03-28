import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import axios from "axios";

// CREATE A CONTEXT
const PostContext = createContext();

function createRandomFeature() {
  const categories = [
    "Academic Resources",
    "Career Services",
    "Campus Culture",
    "Local Community Resources",
    "Social",
    "Sports",
    "Health and Wellness",
    "Technology",
    "Travel",
    "Alumni",
    // Add more categories as needed
  ];

  const dates = ["Nov 12", "Nov 11" /* Add more dates as needed */];
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    id: uuidv4(),
    title: `${capitalizeFirstLetter(
      faker.hacker.adjective()
    )} ${capitalizeFirstLetter(faker.hacker.noun())}`,
    date: dates[Math.floor(Math.random() * dates.length)],
    description: faker.hacker.phrase(),
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
    category: categories[Math.floor(Math.random() * categories.length)],
    createdBy: "Vivek",
    comments: [],
  };
}

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts
      ? JSON.parse(storedPosts)
      : Array.from({ length: 20 }, () => createRandomFeature());
  });

  // axios
  //   .post("http://localhost:5000/posts", posts)
  //   .then((res) => console.log(res.data))
  //   .catch(console.log);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  function handleAddPost(post) {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  function handleDeletePost(postId) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }

  const value = {
    posts: posts,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
    onDeletePost: handleDeletePost,
    setPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
