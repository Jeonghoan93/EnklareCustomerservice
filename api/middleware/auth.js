const jwt = require("jsonwebtoken");
const User = require("../models/user");

// This middleware checks for the presence of a JWT token in the Authorization header, verifies it, and retrieves the corresponding user.
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = "Authentication failed";
    }
    next(error);
  }
};

module.exports = auth;
