const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/userModel");

// Product routes
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // Assuming the JWT is stored in a cookie called 'jwt'

  // Check if the token is present
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user associated with the token, excluding the password field
    req.user = await User.findById(decoded.userId).select("-password");

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, not an admin");
  }
};

module.exports = { protect, admin };
