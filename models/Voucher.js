const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  description: { type: String, required: true },
  validity: { type: String, required: true },
  promocode: { type: String, required: true },
  userId: { type: String, required: true } // Store userId as string
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
