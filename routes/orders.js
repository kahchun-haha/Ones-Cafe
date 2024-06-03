const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getCompletedOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/api/orders", createOrder);
router.get("/api/orders", getOrders);
router.patch("/api/orders/:orderId/status", updateOrderStatus);
router.delete("/api/orders/:orderId", deleteOrder);
router.get("/api/orders/history", getCompletedOrders);

module.exports = router;
