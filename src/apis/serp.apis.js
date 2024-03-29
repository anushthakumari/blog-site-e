import axios from "axios";

export async function getRealTimeSportEvents() {
	const { data } = await axios.get("https://serpapi.com/search.json", {
		params: {
			engine: "google",
			q: "sports/events in mumbai india",
			api_key:
				"f12d28cc7e975718a86d00cbb44921e596b3e52dd2bb0fac44d7666bf2f3f180",
			google_domain: "google.com",
		},

		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});

	console.log(data);
}
