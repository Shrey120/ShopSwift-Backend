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

module.exports = { isLoggedIn };
