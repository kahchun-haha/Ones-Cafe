const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin credentials
    const allowedAdminEmail = "onescafe6688@gmail.com";
    const allowedAdminPassword = "onescafe"; // Normal word password

    // Encrypt the hardcoded password
    const allowedAdminPasswordHash = await bcrypt.hash(
      allowedAdminPassword,
      10
    );

    // Compare provided email with hardcoded one
    if (email !== allowedAdminEmail) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, allowedAdminPasswordHash);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // If credentials are correct, set session and respond
    req.session.isAuthenticated = true;
    req.session.admin = { email }; // Admin data to store in session
    res.status(200).json({ email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.clearCookie("connect.sid"); // Assuming express-session is used
    res.status(200).send("Logged out");
  });
};
