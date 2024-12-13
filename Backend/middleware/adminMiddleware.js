const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("isAdmin");

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (err) {
    console.error("Error in adminMiddleware:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminMiddleware;
