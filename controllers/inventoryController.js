const Inventory = require("../models/Inventory");

// Initialize the inventory with initial data
exports.initializeInventory = async (req, res) => {
  try {
    const userId = req.body.userId; // Replace with the actual user ID or get from session
    const initialItems = [
      { item_name: "Item1", amount: 20 },
      { item_name: "Item2", amount: 20 },
      { item_name: "Item3", amount: 20 },
    ];

    for (let item of initialItems) {
      const existingItem = await Inventory.findOne({ item_name: item.item_name, userId });
      if (!existingItem) {
        const newItem = new Inventory({ ...item, userId });
        await newItem.save();
      }
    }

    res.status(200).send({ message: "Inventory initialized successfully" });
  } catch (error) {
    console.error("Error initializing inventory:", error);
    res.status(500).send({ message: "Failed to initialize inventory", error });
  }
};

// Add stock to the inventory
exports.addInventory = async (req, res) => {
  const { item_name, amount, userId } = req.body;

  if (!item_name || !amount || !userId) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const newItem = new Inventory({ userId, item_name, amount });
    await newItem.save();

    res.status(200).send({ message: "Stock added successfully", newItem });
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).send({ message: "Failed to add stock", error });
  }
};



// Get all inventory items
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("userId").sort({ date: -1 });
    res.status(200).send({ inventory });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send({ message: "Failed to fetch inventory", error });
  }
};



// Get total stock amount
exports.getTotalStock = async (req, res) => {
  try {
    const totalStock = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).send({ totalAmount: totalStock[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch total stock amount", error });
  }
};

// Get latest stock details
exports.getLatestStock = async (req, res) => {
  try {
    const latestStock = await Inventory.findOne().sort({ date: -1 }).populate("userId");

    if (!latestStock) {
      return res.status(404).send({ message: "No stock found" });
    }

    res.status(200).send({ latestStock });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch latest stock", error });
  }
};