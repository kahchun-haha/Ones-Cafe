const Menu = require('../models/Menu');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'static', 'images', 'menu');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Prefixing the filename with a timestamp to avoid name conflicts
  }
});
const upload = multer({ storage: storage }).single('image');

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
      return res.status(500).json({ message: "Error in file upload: " + err.message });
    }
    const { title, description, price, topic_id } = req.body;
    const image = req.file ? `/images/menu/${req.file.filename}` : '';

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
