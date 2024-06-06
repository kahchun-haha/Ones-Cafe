const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: String, default: "" },
  gender: { type: String, default: "" },
  contactNumber: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postcode: { type: String, default: "" },
  otp: { type: String },
  otpExpires: { type: Date },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// Logout route
router.post("/api/users/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid"); // Clear the cookie
    res.redirect("/"); // Redirect to home page after logout
  });
});

module.exports = User;
