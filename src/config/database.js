const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vemulajagadeesh26:P3c0Bm5MqrJo8YYC@namastenodejs.mttpbsj.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
