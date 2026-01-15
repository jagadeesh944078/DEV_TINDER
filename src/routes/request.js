const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatuses = ["interested", "ignored"];
      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type:" + status });
      }

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid User Id" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId: fromUserId,
            toUserId: toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      console.log(connectionRequest, "connectionRequest");
      await connectionRequest.save();
      res.send({
        message: "Connection Request Sent Successfully",
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;
      console.log(
        status,
        requestId,
        loggedInUser._id,
        "status, requestId, loggedInUser"
      );
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type:" + status });
      }
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ message: "Invalid Request Id" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      console.log(connectionRequest, "connectionRequest");
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request not found" });
      }
      connectionRequest.status = status;
      await connectionRequest.save();
      res.send({
        message: "Connection Request Reviewed Successfully",
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
