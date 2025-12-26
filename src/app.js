const express = require("express");

//creating instance of express
const app = express();

// app.use("/", (req, res) => {
//   res.send("welcome to DEVTINDER");
// });

app.get("/test", (req, res) => {
  res.send({ firstName: "jagadeesh", LastName: "vemula" });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
