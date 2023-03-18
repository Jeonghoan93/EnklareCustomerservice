const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chatController");
const openAIRateLimiter = require("../../config/rateLimiter");

router.post("/", openAIRateLimiter, chatController.handleChat);

module.exports = router;
