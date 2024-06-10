const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      title: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
