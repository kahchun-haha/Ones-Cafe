const Menu = require('../models/Menu');

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
