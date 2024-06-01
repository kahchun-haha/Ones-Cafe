const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route to get all menus (categories with their items)
router.get('/api/menus', menuController.getMenu);

// Route to add a new menu item under a specific category
router.post('/api/menus', menuController.addMenuItem);

module.exports = router;
