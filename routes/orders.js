const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/api/orders", createOrder);
router.get("/api/orders", getOrders);

module.exports = router;