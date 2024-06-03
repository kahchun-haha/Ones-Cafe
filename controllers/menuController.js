const Menu = require("../models/Menu");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "static", "images", "menu");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Prefixing the filename with a timestamp to avoid name conflicts
  },
});
const upload = multer({ storage: storage }).single("image");

// Function to retrieve all menu items
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to add a new menu item
exports.addMenuItem = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error in file upload: " + err.message });
    }
    const { title, description, price, topic_id } = req.body;
    const image = req.file ? `/images/menu/${req.file.filename}` : "";

    try {
      let category = await Menu.findOne({ category: topic_id });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const newItem = { title, description, price, image };
      category.items.push(newItem);
      await category.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: "Error adding item: " + error.message });
    }
  });
};

// Function to delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { category, itemId } = req.params;
  try {
    const menu = await Menu.findOne({ category });
    if (!menu) {
      return res.status(404).json({ message: "Category not found" });
    }
    const itemIndex = menu.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "static",
      menu.items[itemIndex].image
    );

    menu.items.splice(itemIndex, 1); // Remove the item from the array
    await menu.save(); // Save the updated menu

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
      }
    });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item: " + error.message });
  }
};

// Function to modify a menu item
exports.modifyMenuItem = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error in file upload:", err);
      return res
        .status(500)
        .json({ message: "Error in file upload: " + err.message });
    }

    const { category, itemId } = req.params;
    const { title, description, price, topic_id } = req.body; // topic_id is the new category
    const image = req.file ? `/images/menu/${req.file.filename}` : null;

    try {
      let oldCategory = await Menu.findOne({ category });
      if (!oldCategory) {
        console.error("Old category not found");
        return res.status(404).json({ message: "Old category not found" });
      }

      const itemIndex = oldCategory.items.findIndex(
        (item) => item._id.toString() === itemId
      );
      if (itemIndex === -1) {
        console.error("Item not found in old category");
        return res
          .status(404)
          .json({ message: "Item not found in old category" });
      }

      const updatedFields = {};
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
      if (price) updatedFields.price = price;
      if (image) updatedFields.image = image;

      // If category has changed, move the item to the new category
      if (topic_id && topic_id !== category) {
        let newCategory = await Menu.findOne({ category: topic_id });
        if (!newCategory) {
          console.error("New category not found");
          return res.status(404).json({ message: "New category not found" });
        }

        const itemToMove = {
          ...oldCategory.items[itemIndex]._doc,
          ...updatedFields,
        };
        oldCategory.items.splice(itemIndex, 1);
        newCategory.items.push(itemToMove);
        await oldCategory.save();
        await newCategory.save();
        console.log("Item moved to new category and updated");
        return res.status(200).json(itemToMove);
      }

      // If category has not changed, update the item in place
      oldCategory.items[itemIndex] = {
        ...oldCategory.items[itemIndex]._doc,
        ...updatedFields,
      };
      await oldCategory.save();
      console.log(
        "Menu item updated in the same category:",
        oldCategory.items[itemIndex]
      );
      res.status(200).json(oldCategory.items[itemIndex]);
    } catch (error) {
      console.error("Error modifying item:", error);
      res
        .status(400)
        .json({ message: "Error modifying item: " + error.message });
    }
  });
};

// Function to get a specific menu item
exports.getMenuItem = async (req, res) => {
  const { category, itemId } = req.params;
  try {
    const menu = await Menu.findOne({ category });
    if (!menu) {
      console.error("Category not found");
      return res.status(404).json({ message: "Category not found" });
    }
    const menuItem = menu.items.id(itemId);
    if (!menuItem) {
      console.error("Item not found");
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(400).json({ message: "Error fetching item: " + error.message });
  }
};
