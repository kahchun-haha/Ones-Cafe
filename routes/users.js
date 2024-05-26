const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Test endpoint
router.get('/test', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
