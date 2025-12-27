const express = require("express");

//creating instance of express
const app = express();

// Case 1
app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    res.send("User Info");
    next();
  },
  (req, res) => {
    res.send("User Info");
  }
);
// app.use("/", (req, res) => {
//   res.send("welcome to DEVTINDER");
// });

app.get("/test", (req, res) => {
  res.send({ firstName: "jagadeesh", LastName: "vemula" });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
