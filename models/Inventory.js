const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 100,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
