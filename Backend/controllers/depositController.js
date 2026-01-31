const Deposit = require("../models/Deposit");
const User = require("../models/User");

/* ---------------- CREATE DEPOSIT ---------------- */
const createDeposit = async (req, res) => {
  try {
    const { amount, referenceId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 1️⃣ Create deposit request
    const deposit = await Deposit.create({
      user: req.user.id,
      amount,
      referenceId,
    });

    // 2️⃣ AUTO APPROVE (demo purpose)
    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();

    deposit.status = "SUCCESS";
    await deposit.save();

    res.status(201).json({
      message: "Deposit successful",
      balance: user.balance,
      deposit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDeposit,
};
