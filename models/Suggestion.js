const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  user: String,
  request: String,
  create_time: Date,
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
