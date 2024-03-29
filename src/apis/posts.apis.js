import axios from "../libs/axios";

export async function getPosts(params) {
	try {
		const { data } = await axios.post("/posts/_search", {
			query: {
				match_all: {},
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function createPostsIndex(posts) {
	try {
		const bulkData = posts.map((post) => {
			return [{ index: { _index: "posts" } }, post];
		});

		const { data } = await axios.post(`/_bulk`, bulkData, {
			headers: { "Content-Type": "application/x-ndjson" },
		});

		if (data.errors) {
			console.error("Errors occurred during indexing:", data.errors);
			throw new Error("Failed to create index or index some posts");
		} else {
			console.log("Posts successfully indexed:", data.items.length);
			return data;
		}
	} catch (error) {
		console.error("Error creating index:", error);
		throw error;
	}
}
