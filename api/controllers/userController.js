const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("User profile data", user);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("User with this email already exists");
      error.statusCode = 400;
      throw error;
    }

    const user = new User({ email, password, firstName, lastName });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...module.exports, register, login, profile };
