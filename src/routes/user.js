const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
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
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accepted" },
        { toUserId: loggedInUserId, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", USER_SAFE_FIELDS);
    const data = connectionRequests.map((request) => {
      if (request.fromUserId.toString() === loggedInUserId.toString()) {
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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await user
      .find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUserId } },
        ],
      })
      .select(USER_SAFE_FIELDS)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
