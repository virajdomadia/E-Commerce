const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Make sure bcrypt is required here
const jwt = require("jsonwebtoken");
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body; // Add `isAdmin` in request
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default isAdmin to false unless specified
    const user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false, // Admin can be true when registering an admin
    });

    // Encrypt password before saving
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expiration time
    });

    res.json({
      token,
      message: "Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
