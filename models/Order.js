const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
