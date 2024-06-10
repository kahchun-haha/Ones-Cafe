const User = require("../models/User");
const Voucher = require("../models/Voucher");

exports.claimVoucher = async (req, res) => {
  const { userId, description, validity, promocode, pointsCost } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.loyaltyPoints < pointsCost) {
      return res.status(400).json({ message: "Not enough points to claim this voucher" });
    }

    const voucher = new Voucher({
      description,
      validity,
      promocode,
      userId: userId,
    });

    await voucher.save();

    user.vouchers.push(voucher._id);
    user.loyaltyPoints -= pointsCost;
    await user.save();

    res.status(201).json({ message: "Voucher claimed successfully", newPoints: user.loyaltyPoints });
  } catch (error) {
    console.error("Error claiming voucher:", error);
    res.status(500).json({ message: "Failed to claim voucher", error });
  }
};

exports.getVouchers = async (req, res) => {
  try {
    const { userId } = req.query; // Assuming userId is passed as a query parameter
    const vouchers = await Voucher.find({ userId });
    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers", error });
  }
};
