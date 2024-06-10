const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.post("/api/admins/login", adminController.loginAdmin);
router.post("/api/admins/logout", adminController.logoutAdmin);

module.exports = router;