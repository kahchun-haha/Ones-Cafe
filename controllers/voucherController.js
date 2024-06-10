const User = require("../models/User");
const Voucher = require("../models/Voucher");

exports.claimVoucher = async (req, res) => {
  const { userId, description, promocode, pointsCost } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.loyaltyPoints < pointsCost) {
      return res.status(400).json({ message: "Not enough points to claim this voucher" });
    }

    const currentDate = new Date();
    const validity = new Date(currentDate.setDate(currentDate.getDate() + 30));

    let discountPercentage;
    if (promocode === "10%off") {
      discountPercentage = 0.10;
    } else if (promocode === "birthday") {
      discountPercentage = 0.15;
    } else {
      discountPercentage = 0.00;
    }

    const voucher = new Voucher({
      description,
      validity,
      promocode,
      userId,
      discountPercentage,
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
    const { userId } = req.query;
    const vouchers = await Voucher.find({ userId, used: false });
    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers", error });
  }
};

exports.applyVoucher = async (req, res) => {
  const { userId, promocode } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.appliedVoucher) {
      return res.status(400).json({ message: "A voucher is already applied" });
    }

    const voucher = await Voucher.findOne({ userId, promocode, used: false });
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found or already used" });
    }

    const currentDate = new Date();
    if (voucher.validity < currentDate) {
      return res.status(400).json({ message: "Voucher has expired" });
    }

    const discountPercentage = voucher.discountPercentage;

    // Mark the voucher as used
    voucher.used = true;
    await voucher.save();

    // Set the applied voucher in the user's record
    user.appliedVoucher = voucher._id;
    await user.save();

    res.status(200).json({ message: "Voucher applied successfully", discountPercentage });
  } catch (error) {
    console.error("Error applying voucher:", error);
    res.status(500).json({ message: "Failed to apply voucher", error });
  }
};
