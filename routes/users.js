const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      username,
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid credentials");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(password, "Invalid credentials2");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Respond with success message and JWT token
    res.status(200).json({
      msg: "Login successful",
      token, // Send the token in the response
      user: { ...user._doc, password: undefined }, // Exclude password from user object
    });
    console.log("running");
  } catch (error) {
    console.log("running error");
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
