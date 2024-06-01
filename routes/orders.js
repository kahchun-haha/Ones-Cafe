const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order"); // Adjust the path as needed

const router = express.Router();

router.post("/api/orders", async (req, res) => {
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
});

module.exports = router;
