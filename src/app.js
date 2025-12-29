const express = require("express");
const { adminAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

//creating instance of express
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Jagadeesh",
    lastName: "Vemula",
    emailId: "vemulajagadeesh26@gmail.com",
    age: 26,
    password: "Abcd@1234",
    gender: "male",
  };
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
