const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  description: { type: String, required: true },
  validity: { type: Date, required: true },
  promocode: { type: String, required: true },
  userId: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  used: { type: Boolean, default: false },
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
