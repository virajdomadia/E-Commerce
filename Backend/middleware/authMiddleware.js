const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Log the headers to check if the Authorization header is present
  console.log("Request Headers:", req.headers);

  // Check if the token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

      // Log the decoded token
      console.log("Decoded Token:", decoded);

      // Attach user info to the request object using decoded.userId
      req.user = await User.findById(decoded.userId).select("-password");

      // Check if the user was found
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      console.log("Authenticated User:", req.user);
      next();
    } catch (err) {
      console.error("Error in authMiddleware:", err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is provided
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
