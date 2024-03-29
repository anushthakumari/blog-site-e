import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "./AddPost";
import { useAccounts } from "./Context/AccountsContext";
import { useAuth } from "./Context/AuthContext";
import { useEffect, useState } from "react";
import {
	Notifications,
	NotificationsActive,
	Search,
} from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { usePosts } from "./Context/PostContext";

function Header(props) {
	const { sections, title, setPostList } = props;
	const navigate = useNavigate();
	const { currAcc } = useAccounts();
	const { isAuthenticated, setAuthenticated } = useAuth();
	const [subscribed, setSubscribed] = useState(false);
	const [searchInp, setSearchInp] = useState("");
	const { posts } = usePosts();

	useEffect(() => {
		if (localStorage) {
			const fetchedTopics =
				JSON.parse(localStorage.getItem("subscribedTopics")) || [];
			setSubscribed(fetchedTopics.length !== 0);
		}
	}, []);

	function handleSubscribe() {
		navigate("/subscribe");
	}

	function handleClick() {
		navigate("/signup");
	}

	function handleAdmin() {
		navigate("/dashboard");
	}

	function handleSignOut() {
		setAuthenticated(false);
		navigate("/signin");
	}

	function handleSearch() {
		// TODO: Implement Search
		// setPostList(
		//   searchInp
		//     ? (state) => state.filter((post) => post.title.includes(searchInp))
		//     : posts
		// );
	}

	return (
		<>
			<Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Button size="small" onClick={handleSubscribe}>
					{subscribed ? (
						<>
							<NotificationsActive
								sx={{
									height: "1.1rem",
								}}
							/>
							Subscribed
						</>
					) : (
						<>
							<Notifications
								sx={{
									height: "1.1rem",
								}}
							/>
							Subscribe
						</>
					)}
				</Button>
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					noWrap
					sx={{ flex: 1 }}>
					{title}
				</Typography>
				{currAcc.role === "admin" && (
					<div style={{ marginRight: "30px" }}>
						<Button variant="contained" size="small" onClick={handleAdmin}>
							Admin Dashboard
						</Button>
					</div>
				)}
				<div style={{ marginRight: "30px" }}>
					<BasicModal />
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={isAuthenticated ? handleSignOut : handleClick}>
					{isAuthenticated ? "Sign out" : "Sign up"}
				</Button>
			</Toolbar>
			<Box
				sx={{
					padding: "1rem",
					fontSize: "0.7rem",
					display: "grid",
					gridTemplateColumns: "1fr auto",
					gap: "0.5rem",
				}}>
				<TextField
					id="outlined-basic"
					label="Search Posts"
					variant="outlined"
					value={searchInp}
					onChange={(e) => setSearchInp(e.target.value)}
				/>
				<Button variant="contained" type="submit" onClick={handleSearch}>
					<Search />
				</Button>
			</Box>

			<Toolbar
				component="nav"
				variant="dense"
				sx={{
					columnGap: "0.5em",
					justifyContent: "left",
					overflowX: "auto",
					flexWrap: "wrap",
				}}>
				{sections.map((section, index) => (
					<Link
						style={{
							color: "inherit",
							cursor: "pointer",
							textDecoration: "underline",
						}}
						to={`/category/${section.title}`}
						color="inherit"
						key={section.title}
						variant="body2"
						href={section.url}
						sx={{
							p: 1,
							marginRight: "8px",
							marginBottom: "16px",
							display: "inline-block",
						}}>
						<p style={{ textDecoration: "none" }}>{section.title}</p>
					</Link>
				))}
			</Toolbar>
		</>
	);
}

Header.propTypes = {
	sections: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
};

export default Header;
