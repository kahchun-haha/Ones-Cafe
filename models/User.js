const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
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
  loyaltyPoints: { type: Number, default: 100 },
  vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
