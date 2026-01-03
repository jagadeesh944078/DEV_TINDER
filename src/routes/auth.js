const express = require("express");
const router = express.Router();
const { validationSignup } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    validationSignup(req.body);
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = { ...req.body, password: passwordHash };
    const user = new User(userData);
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials");
    }
    const token = await user.getJwt();
    res.cookie("token", token);
    res.send("User logged in successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully");
});

module.exports = router;
