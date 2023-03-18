// This code defines a simple parseOpenAIResponse function that takes the raw response from the OpenAI API,
// removes any newline characters, and trims any extra whitespace.
// You can modify this function to further process and format the response as needed.
function parseOpenAIResponse(response) {
  const parsedResponse = response.replace(/\n+/g, " ").trim();
  return parsedResponse;
}

module.exports = { parseOpenAIResponse };
