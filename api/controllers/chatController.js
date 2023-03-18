const openaiService = require("../services/openaiService");
const responseParser = require("../utils/responseParser");

const handleChat = async (req, res, next) => {
  try {
    const userInput = req.body.text;
    console.log("user input:", userInput); // log the user input
    const openaiResponse = await openaiService.generateResponse(userInput);
    console.log("openai response: ", openaiResponse); // log the openai res
    const parsedResponse = responseParser.parseOpenAIResponse(openaiResponse);

    res.status(200).json({ message: parsedResponse });
  } catch (error) {
    console.error("error in handleChat:", error);
    next(error);
  }
};

module.exports = { handleChat };
