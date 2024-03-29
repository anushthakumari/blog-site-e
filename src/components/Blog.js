import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
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

import { getResponseFromOpenAI, getRealTimeEvents } from "../libs/openai";
import { Stack, Typography } from "@mui/material";
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

// const posts = [post1, post2, post3];

// const sidebar = {
//   title: "About",
//   description:
//     "Welcome to our student blog! Here, we aim to provide valuable insights, tips, and resources to help fellow students navigate the challenges of academic life. Whether you are looking for study tips, career advice, or just some inspiration, you will find it here. Our team of passionate students and educators are dedicated to empowering you on your academic journey. Stay tuned for regular updates and engaging content!",
//   archives: [
//     { title: "February 2024", url: "#" },
//     { title: "January 2024", url: "#" },
//     { title: "December 2023", url: "#" },
//     { title: "November 2023", url: "#" },
//     { title: "October 2023", url: "#" },
//     { title: "September 2023", url: "#" },
//     { title: "August 2023", url: "#" },
//     { title: "July 2023", url: "#" },
//     { title: "June 2023", url: "#" },
//     { title: "May 2023", url: "#" },
//     { title: "April 2023", url: "#" },
//   ],
//   social: [
//     { name: "GitHub", icon: GitHubIcon },
//     { name: "X", icon: XIcon },
//     { name: "Facebook", icon: FacebookIcon },
//   ],
// };

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
	const { posts } = usePosts();

	const [suggestedActivities, setSuggestedActivities] = React.useState("");
	const [isLoading, setisLoading] = React.useState(false);

	let featuredPosts = posts;
	const mainFeaturedPost = posts[3];

	const handleSuggestClick = async () => {
		try {
			setisLoading(true);
			const response = await getResponseFromOpenAI(
				"Please recommend activities based on current weather conditions, real-time events/search (current sports events), and location"
			);
			// setSuggestedActivities(response);

			console.log(response);

			// await getRealTimeEvents("india", "mumbai");
		} catch (error) {
			console.log(error);
			console.log("Something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<Container maxWidth="lg">
				<Header title="IIT Student Blog" sections={sections} />
				<main>
					<MainFeaturedPost post={mainFeaturedPost} />
					<Grid container spacing={4}>
						{featuredPosts.map((post) => (
							<FeaturedPost key={post.id} post={post} />
						))}
					</Grid>
					{/* <Grid container spacing={5} sx={{ mt: 3 }}> */}
					{/* <Main title="From the firehose" posts={posts} /> */}
					{/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            // /> */}
					{/* </Grid> */}

					<Stack justifyContent={"center"} alignItems={"center"} my={4}>
						<Typography variant="h6">You Have Read It All!!</Typography>
						<Button
							onClick={handleSuggestClick}
							disableElevation
							disabled={isLoading}>
							{isLoading ? "Thinking..." : "Suggest Me Some Sports And Events"}
						</Button>

						<Typography mt={1} textAlign={"center"} variant="h6">
							<div dangerouslySetInnerHTML={{ __html: suggestedActivities }} />
						</Typography>
					</Stack>
				</main>
			</Container>
			<Footer
				title="Follow Us!"
				description="For inquiries or collaboration opportunities, contact us at asp@hawk.iit.edu"
			/>
		</ThemeProvider>
	);
}
