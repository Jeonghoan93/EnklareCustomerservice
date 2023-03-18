const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./config/rateLimiter");
const logger = require("./utils/logger");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRoutes);

app.use(errorHandler);
app.use(rateLimiter);

app.use((error, req, res, next) => {
  console.error("Error:", error.message, "Stack:", error.stack);
  res.status(error.statusCode || 500).json({ message: error.message });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
