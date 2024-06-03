// controllers/orderController.js
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();
    res
      .status(201)
      .send({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).send({ message: "Failed to place order", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" }).populate("userId");
    res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).send({ message: "Failed to update order status", error });
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ message: "Order deleted" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete order", error });
  }
};

exports.getCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.status(200).send({ orders });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch completed orders", error });
  }
};

