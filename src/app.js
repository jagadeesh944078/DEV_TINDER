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

// Get user by Id
app.post("/user/id", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const user = await User.findById(_id);
    res.send(user);
    if (!user) {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

// user by email
app.post("/user/email", async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.find({ emailId: emailId });
    if (user.length === 0) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});

// update the user
app.patch("/user", async (req, res) => {
  try {
    const { _id, ...updatedData } = req.body;
    const user = await User.findByIdAndUpdate(_id, updatedData);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
  }
});

// GET /feed - get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
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
