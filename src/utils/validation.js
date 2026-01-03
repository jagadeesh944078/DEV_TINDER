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

const validationEditProfile = (profileObj) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(profileObj).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validationSignup, validationEditProfile };
