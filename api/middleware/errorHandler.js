// This middleware function handles different types of errors, such as validation errors and duplicate key errors, and returns an appropriate status code and error message.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.log(`Error: ${message}`);

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(",");
  }

  if (err.name === "MongoError" && err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
  }

  res.status(statusCode).json({
    error: {
      message: message,
    },
  });
}

module.exports = errorHandler;
