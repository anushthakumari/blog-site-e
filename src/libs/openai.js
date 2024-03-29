import OpenAI from "openai";

import { getRealTimeSportEvents } from "../apis/serp.apis";

const openai = new OpenAI({
	apiKey: "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",
	dangerouslyAllowBrowser: true,
});

async function getLocation() {
	const response = await fetch("https://ipapi.co/json/");
	const locationData = await response.json();
	return locationData;
}

async function getCurrentWeather(latitude, longitude) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
	const response = await fetch(url);
	const weatherData = await response.json();
	return weatherData;
}

export async function getRealTimeEvents(country, city) {
	const url = "http://localhost:5000/real-time-events";

	const response = await fetch(
		url +
			"?country=" +
			encodeURIComponent(country) +
			"&city=" +
			encodeURIComponent(city)
	);
	const events = await response.json();

	return events;
}

const tools = [
	{
		type: "function",
		function: {
			name: "getCurrentWeather",
			description: "Get the current weather in a given location",
			parameters: {
				type: "object",
				properties: {
					latitude: {
						type: "string",
					},
					longitude: {
						type: "string",
					},
				},
				required: ["longitude", "latitude"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "getLocation",
			description: "Get the user's location based on their IP address",
			parameters: {
				type: "object",
				properties: {},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "getRealTimeEvents",
			description:
				"Get the real time sports/event/activities in provided country and city",
			parameters: {
				type: "object",
				properties: {
					country: {
						type: "string",
					},

					city: {
						type: "string",
					},
				},
				required: ["country", "city"],
			},
		},
	},
];

let messages = [
	{
		role: "system",
		content:
			"You are a helpful assistant. Only use the functions you have been provided with. You are also an api that respond in json.",
	},
];

const availableTools = {
	getCurrentWeather,
	getLocation,
	getRealTimeEvents,
};

export async function getEvents(params) {
	return await getRealTimeSportEvents();
}

export async function getResponseFromOpenAI(userInput) {
	messages.push({
		role: "user",
		content: userInput,
	});
	for (let i = 0; i < 5; i++) {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: messages,
			tools: tools,
		});
		const { finish_reason, message } = response.choices[0];

		if (finish_reason === "tool_calls" && message.tool_calls) {
			const functionName = message.tool_calls[0].function.name;
			const functionToCall = availableTools[functionName];
			const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
			const functionArgsArr = Object.values(functionArgs);
			const functionResponse = await functionToCall.apply(
				null,
				functionArgsArr
			);

			messages.push({
				role: "function",
				name: functionName,
				content: `
          The result of the last function was this: ${JSON.stringify(
						functionResponse
					)}
          `,
			});
		} else if (finish_reason === "stop") {
			messages.push(message);
			return message.content;
		}
	}
	return "We could not find anything!";
}

export async function generatePostReply(
	title = "Virtual System",
	category = "Technology",
	body = "transmitting the array won't do anything, we need to index the auxiliary API microchip!"
) {
	const messages = [
		{
			role: "system",
			content:
				"You are a helpful assistant that helps to generate positive 3 post comments based on provided blog post category, title and its content. the response should be in json containting array of only comments",
		},
	];

	const prompt = `Blog Post Category: ${category}, Blog Post Title: ${title}, Blog Content: ${body}`;

	messages.push({
		role: "user",
		content: prompt,
	});

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messages,
	});

	const generated_json = response["choices"][0]?.["message"]?.["content"];

	return generated_json ? JSON.parse(generated_json).comments : [];
}
