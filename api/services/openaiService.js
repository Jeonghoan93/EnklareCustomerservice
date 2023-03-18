const axios = require("axios");
const { OPENAI_API_KEY } = require("../config/openaiApi");

// sets up a connection to the OpenAI API using Axios
const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const enklareDesc =
  "Enklare is a loan comparison service that helps users find the best loan offers with low interest rates. They provide a safe and secure loan application process, comparing rates and terms from various lenders. They offer free, non-binding comparisons, with only one credit check. Users can apply in just 2 minutes.";

async function generateResponse(userInput) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a helpful customer service assistant working for Enklare. ${enklareDesc}`,
      },
      {
        role: "user",
        content:
          "You are a customer service representative. Do not mention that you are an AI.",
      },
      { role: "user", content: userInput },
    ];

    // calculate the length of user input
    const userInputLength = userInput.split("").length;

    // calculate the max tokens based on the user input length
    // Adjust the multiplier (2) or minimum value (10) as desired
    const maxTokens = Math.max(Math.floor(userInputLength * 3), 10);

    // replace the link with the appropriate endpoint for your desired OpenAI model.
    const response = await openaiApi.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.5,
      top_p: 0.8,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      max_tokens: maxTokens,
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in generateResponse:", error);
    throw error;
  }
}

// exports a generateResponse function that takes a prompt and returns a generated response from the API.
module.exports = { generateResponse };
