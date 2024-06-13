const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/api/inventory", inventoryController.getAllInventory);
router.get("/api/inventory/:id", inventoryController.getInventoryById);
router.post("/api/inventory", inventoryController.createInventory);
router.patch("/api/inventory/:id", inventoryController.updateInventory);
router.delete("/api/inventory/:id", inventoryController.deleteInventory);
router.get("/api/inventory-low-stock", inventoryController.getLowStockItems);

module.exports = router;
