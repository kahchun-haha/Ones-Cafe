const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getCompletedOrders,
  getTotalOrderAmount,
  getOrderStatusCounts,

} = require("../controllers/orderController");

const router = express.Router();

router.post("/api/orders", createOrder);
router.get("/api/orders", getOrders);
router.patch("/api/orders/:orderId/status", updateOrderStatus);
router.delete("/api/orders/:orderId", deleteOrder);
router.get("/api/orders/history", getCompletedOrders);
router.get("/api/orders/TotalAmount", getTotalOrderAmount);
router.get("/api/orders/statusCounts", getOrderStatusCounts);

module.exports = router;
