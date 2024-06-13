const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/api/users/register", profileController.registerUser);
router.post("/api/users/verify-otp", profileController.verifyOtp);
router.post("/api/users/login", profileController.loginUser);
router.put("/api/users/profile", profileController.updateUserProfile);
router.post("/api/users/check-email", profileController.checkEmail);
router.post("/api/users/forgot-password", profileController.forgotPassword);
router.post("/api/users/reset-password", profileController.resetPassword);
router.post("/api/users/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.status(200).send("Logged out successfully");
  });
});
router.get("/api/users/check-auth", profileController.checkAuth);
router.post("/api/users/check-old-password", profileController.checkOldPassword);
router.post("/api/users/change-password", profileController.changePassword);
router.delete("/api/users/delete", profileController.deleteAccount);
router.get("/api/users/getProfile", profileController.getProfile);
router.post("/api/users/:userId/updatePoints", profileController.updatePoints);
router.get("/api/users/:userId/points", profileController.getPoints);

module.exports = router;
