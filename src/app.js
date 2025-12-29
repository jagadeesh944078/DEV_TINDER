const express = require("express");
const { adminAuth } = require("./middleware/auth");

//creating instance of express
const app = express();

// Case 1
app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    res.send("User Info 1");
    next();
  },
  (req, res) => {
    res.send("User Info 2");
  }
);

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  throw new Error("Database connection failed");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong:" + err.message);
  }
});

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("All Data Deleted");
});

app.get("/user", (req, res) => {
  next();
});

app.get("/user", (req, res) => {
  res.send("User Info GET Method2");
});

// app.use("/", (req, res) => {
//   res.send("welcome to DEVTINDER");
// });

app.get("/test", (req, res) => {
  res.send({ firstName: "jagadeesh", LastName: "vemula" });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
