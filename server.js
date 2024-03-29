const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;
const index = "post";

const esClient = new Client({
	node: "http://localhost:9200/",
});

async function indexExist(indexName) {
	const indexExist = await esClient.indices.exists({ index: indexName });

	return indexExist;
}

async function getRealTimeSportEvents(country, city) {
	const { data } = await axios.get("https://serpapi.com/search.json", {
		params: {
			engine: "google",
			q: "sports/events in " + city + " " + country,
			api_key:
				"f12d28cc7e975718a86d00cbb44921e596b3e52dd2bb0fac44d7666bf2f3f180",
			google_domain: "google.com",
		},

		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});

	return data;
}

// Helper function
async function getAllDocs(indexName) {
	try {
		const exists = await indexExist(indexName);

		if (!exists) {
			return [];
		}

		const res = await esClient.search({
			index: indexName,
			size: 10000,
		});

		let allPosts = [];
		allPosts = res.hits.hits
			.map((hit) => hit._source)
			.filter((post) => Object.keys(post).length !== 0);
		console.log(allPosts);
		return allPosts;
	} catch (error) {
		console.error("Error retrieving posts:", error);
		throw error;
	}
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint: Add Post
app.post("/posts", async (req, res) => {
	try {
		let posts = req.body;

		const _docs = await getAllDocs(index);

		const newPosts = [];

		posts.forEach((currentPost) => {
			const index = _docs.findIndex((v) => v.title !== currentPost.title);

			if (index > -1) {
				return;
			}

			newPosts.push(currentPost);
		});

		for (const newPostItem of newPosts) {
			await esClient.index({
				index,
				document: newPostItem,
			});
		}

		const allPosts = await getAllDocs(index);

		res.json({
			status: 200,
			allPosts,
			size: allPosts.length,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// API Endpoint: Search Posts
app.get("/search", async (req, res) => {
	try {
		const { title } = req.query;
		if (title) {
			const result = await esClient.search({
				index,
				query: {
					match: {
						title,
					},
				},
			});
			res.json(result.hits.hits.map((doc) => doc._source));
		} else {
			const allPosts = await getAllDocs(index);
			res.json(allPosts);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.delete("/delete", async (req, res) => {
	try {
		const { index } = req.query;
		const exists = await indexExist(index);

		if (!exists) {
			res.json("Already deleted");
		}

		const deleteResponse = await esClient.indices.delete({ index });
		res.json({ message: "Index deleted", response: deleteResponse });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.use("/real-time-events", async (req, res) => {
	const { city, country } = req.query;

	const data = await getRealTimeSportEvents(country, city);

	res.send(data.events_results);
});

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
