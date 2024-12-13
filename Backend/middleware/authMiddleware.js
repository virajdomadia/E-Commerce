const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract the token
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

    const user = await User.findById(decoded.userId).select("-password"); // Fetch user details

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error("Error in protect middleware:", err.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
