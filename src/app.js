const express = require("express");
const { adminAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

//creating instance of express
const app = express();

// no need to pass any route, it will be applied to all routes
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
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
