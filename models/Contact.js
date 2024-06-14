const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: String,
  fullName: String,
  email: String,
  create_time: Date,
});

module.exports = mongoose.model("Contact", contactSchema);
