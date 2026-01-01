const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id");
        }
      },
    },
    age: { type: Number, min: 18 },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL for photo");
        }
      },
    },
    about: { type: String, default: "this is the default about the user" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

// here you have to write normal function only not arrow function because arrow function do not bind this keyword
userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "jagadeesh#$%@!9627", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare(userInputByUser, passwordHash);
  return isPasswordMatch;
};
module.exports = mongoose.model("User", userSchema);
