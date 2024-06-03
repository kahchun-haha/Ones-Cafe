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
    res.status(201).send({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).send({ message: "Failed to place order", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId');
    res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
};
