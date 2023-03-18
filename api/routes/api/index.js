const express = require("express");
const router = express.Router();

const chatRoutes = require("./chat");
const userRoutes = require("./users");
const loanRoutes = require("./loans");

router.use("/chat", chatRoutes);
router.use("/users", userRoutes);
router.use("/loans", loanRoutes);

module.exports = router;
