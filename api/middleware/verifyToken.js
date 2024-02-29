const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Forbidden, no token provided" });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      email: user.email,
      id: user._id,
      name: user.name,
    };
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
