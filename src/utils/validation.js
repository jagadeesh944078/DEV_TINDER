const validator = require("validator");

const validationSignup = (userObj) => {
  const { firstName, lastName, emailId, password } = userObj;
  if (!firstName || !lastName) {
    throw new Error("First Name and Last Name are required");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email Id");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validationSignup };
