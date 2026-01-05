const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationEditProfile(req.body)) {
      throw new Error("Invalid Profile Data");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({ message: "Profile Updated Successfully", data: loggedInUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { emailId, password, newPassword } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Current Password is incorrect");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();
    res.send("Password Updated Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = profileRouter;
