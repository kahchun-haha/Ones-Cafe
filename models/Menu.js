const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  items: [itemSchema],
});

const Menu = mongoose.model("Menu", categorySchema);

module.exports = Menu;
