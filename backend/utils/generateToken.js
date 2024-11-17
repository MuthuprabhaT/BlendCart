const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 5 days
  });

  // Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent access by JavaScript
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
  });
};

module.exports = generateToken;
