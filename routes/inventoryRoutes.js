const express = require("express");
const {
  initializeInventory,
  addInventory,
  getInventory,
  getTotalStock,
  getLatestStock,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/api/inventory/init", initializeInventory);
router.post("/api/inventory/add", addInventory);
router.get("/api/inventory", getInventory);
router.get("/api/inventory/totalStock", getTotalStock);
router.get("/api/inventory/latestStock", getLatestStock);

module.exports = router;
