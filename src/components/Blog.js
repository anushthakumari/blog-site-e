import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
	const [mainFeaturedPost, setMainFeaturedPost] = React.useState({});
	const [suggestedActivities, setSuggestedActivities] = React.useState("");
	const [isLoading, setisLoading] = React.useState(false);

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

	React.useEffect(() => {
		setPostList(posts);
		setMainFeaturedPost(posts[3]);
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
			</Container>
			<Footer
				title="Follow Us!"
				description="For inquiries or collaboration opportunities, contact us at asp@hawk.iit.edu"
			/>
		</ThemeProvider>
	);
}
