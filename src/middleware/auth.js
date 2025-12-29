const adminAuth = (req, res, next) => {
  const token = "admin123";
  const isAdminAuthenticated = token === "admin123";
  if (!isAdminAuthenticated) {
    res.status(401).send("Unauthorized Access");
  }
  next();
};

module.exports = { adminAuth };
