const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

exports.createOrder = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { items, totalAmount } = req.body;
  const userId = req.session.user.userId;

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

    // If the order is marked as done, update the inventory
    if (status === 'done') {
      for (const item of order.items) {
        const inventoryItem = await Inventory.findOne({ title: item.title });
        if (inventoryItem) {
          inventoryItem.quantity -= item.quantity;
          await inventoryItem.save();
        }
      }
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


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
};

exports.getCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "done" }).populate("userId");
    res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch completed orders", error });
  }
};

exports.getTotalOrderAmount = async (req, res) => {
  try {
    const orders = await Order.find({ status: "done" }).sort({ date: -1 });
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const latestOrderAmount = orders.length > 0 ? orders[0].totalAmount : 0;

    res.status(200).send({ totalAmount, latestOrderAmount });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch total order amount", error });
  }
};

exports.getOrderStatusCounts = async (req, res) => {
  try {
    const doneCount = await Order.countDocuments({ status: "done" });
    const cancelledCount = await Order.countDocuments({ status: "cancelled" });

    res.status(200).send({ doneCount, cancelledCount });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch order status counts", error });
  }
};
