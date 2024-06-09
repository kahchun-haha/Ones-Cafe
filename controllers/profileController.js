const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  sendVerificationEmail,
  generateOTP,
} = require("../services/emailSender");

async function generateUniqueUserId() {
  const maxAttempts = 10;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate a random 5-digit number
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();

    // Check if this ID already exists in the database
    const existingUser = await User.findOne({ userId: randomId });
    if (!existingUser) {
      return randomId;
    }
  }
  throw new Error(
    "Failed to generate a unique user ID after multiple attempts"
  );
}

exports.registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUserId = await generateUniqueUserId();

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      username,
      otp,
      otpExpires,
      verified: false,
      userId: newUserId,
    });
    await user.save();
    await sendVerificationEmail(email, otp);
    console.log(`OTP sent to ${email} with OTP ${otp}`);
    res
      .status(200)
      .json({ message: "Verification OTP sent. Please check your email." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (isMatch) {
      req.session.isAuthenticated = true; // Set isAuthenticated in session
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    console.log(`Checking email: ${email}`);

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    req.session.resetPasswordEmail = email;
    console.log("Email found and stored in session:", email);

    return res.status(200).json({ message: "Email verification successful" });
  } catch (err) {
    console.error("Error verifying email:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendVerificationEmail(email, otp);
    res.status(200).json({ message: "OTP sent. Please check your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear the token after password reset
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkAuth = (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user); // Return user data if authenticated
  } else {
    res.status(401).send("Not authenticated");
  }
};

exports.checkOldPassword = async (req, res) => {
  const { oldPassword } = req.body;
  if (!req.session.user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userEmail = req.session.user.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      return res.status(200).json({ message: "Old password is correct" });
    } else {
      return res.status(401).json({ message: "Old password is incorrect" });
    }
  } catch (err) {
    console.error("Error checking old password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Change the user's password
exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  if (!req.session.user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userEmail = req.session.user.email; // Use email stored in session
  try {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { password: hashedNewPassword }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userEmail = req.session.user.email;
  try {
    const user = await User.findOneAndDelete({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting session" });
      }
      res.status(200).json({ message: "Account deleted successfully" });
    });
  } catch (err) {
    console.error("Error deleting account:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const email = req.session.user.email;
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
