const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const connectionrequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_FIELDS =
  "firstName lastName emailId photoUrl age gender about skills";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);
    const connectionRequests = await ConnectionRequest.find({
      toUserId: userId,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_FIELDS);
    res.json({
      message: "Connection Requests fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const connectionRequests = await connectionrequest
      .find({
        $or: [
          { fromUserId: loggedInUserId, status: "accepted" },
          { toUserId: loggedInUserId, status: "accepted" },
        ],
      })
      .populate("fromUserId toUserId", USER_SAFE_FIELDS);
    const data = connectionRequests.map((request) => {
      if (request.fromUserId.equals(loggedInUserId)) {
        return request.toUserId;
      }
      return request.fromUserId;
    });
    res.json({
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
