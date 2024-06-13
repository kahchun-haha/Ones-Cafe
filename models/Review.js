const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  ratings: Number,
  create_time: Date,
});

module.exports = mongoose.model("Review", reviewSchema);
