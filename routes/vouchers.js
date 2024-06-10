const express = require("express");
const voucherController = require("../controllers/voucherController");
const router = express.Router();

router.post("/claim", voucherController.claimVoucher);
router.get("/getVouchers", voucherController.getVouchers);

module.exports = router;
