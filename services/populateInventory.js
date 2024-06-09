const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/Menu');
const Inventory = require("../models/Inventory");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

async function populateInventory() {
  try {
    await Inventory.deleteMany({});
    console.log("Existing inventory cleared");

    const menus = await Menu.find();
    for (const menu of menus) {
      for (const item of menu.items) {
        const newInventoryItem = new Inventory({
          menuItemId: item._id,
          title: item.title, // Setting the title from the Menu item
          quantity: 100
        });
        await newInventoryItem.save();
      }
    }
    console.log("Inventory populated successfully!");
  } catch (error) {
    console.error("Failed to populate inventory:", error);
  } finally {
    mongoose.connection.close();
  }
}

populateInventory();