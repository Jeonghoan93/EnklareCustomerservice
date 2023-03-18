// This code sets up a rate limiter using the express-rate-limit package, limiting each IP to 5 requests per minute. You can adjust the windowMs and max values to fine-tune the rate limiting.
const rateLimit = require("express-rate-limit");

const openAIRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "You have exceeded the request limit. Please wait a moment and try again.",
});

module.exports = openAIRateLimiter;
