const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  item_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema);
