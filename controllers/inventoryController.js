const Inventory = require('../models/Inventory');

exports.getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory items' });
  }
};

exports.getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory item', error });
  }
};

exports.createInventory = async (req, res) => {
  const { title, quantity, lastUpdated } = req.body;

  try {
    const newItem = new Inventory({
      title,
      quantity,
      lastUpdated: lastUpdated || new Date()
    });

    await newItem.save();
    res.status(201).json({ message: 'Inventory item created', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error });
  }
};

exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity += quantity;
    item.lastUpdated = new Date();
    await item.save();

    res.json({ message: 'Inventory updated', item });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};

exports.deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory item', error });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ quantity: 1 }).limit(5);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock items', error });
  }
};