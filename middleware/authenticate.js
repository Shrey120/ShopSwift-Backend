const jwt = require("jsonwebtoken");

// @DESC: it will verify incoming request is authenticated and token provided is valid
const isLoggedIn = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access only to Admin" });
    }
    next();
  } catch (e) {
    console.log("Error in admin middleware", e);
    next(e);
  }
};

module.exports = { isLoggedIn, isAdmin };
