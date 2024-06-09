const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/api/menus', menuController.getMenu);
router.post('/api/menus', menuController.addMenuItem);
router.delete('/api/menus/:category/:itemId', menuController.deleteMenuItem);
router.put('/api/menus/:category/:itemId', menuController.modifyMenuItem);
router.get('/api/menus/:category/:itemId', menuController.getMenuItem);

module.exports = router;
