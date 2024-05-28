const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    items: [itemSchema]
});

const Menu = mongoose.model('Menu', categorySchema);

module.exports = Menu;
