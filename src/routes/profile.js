const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("No Token Found");
    }
    const decoded = await jwt.verify(token, "jagadeesh#$%@!9627");
    const user = await User.findById(decoded._id);
    const { _id } = decoded;
    if (!_id) {
      throw new Error("Invalid Token");
    }
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
