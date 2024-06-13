const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  user: String,
  experiencing: String,
  email: String,
  create_time: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: String,
    enum: ["Pending", "In Progress", "Solved"],
    default: "Pending",
  },
  reply: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Issue", issueSchema);
