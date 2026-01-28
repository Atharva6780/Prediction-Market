const Bet = require("../models/bet");
const Market = require("../models/Market");
const User = require("../models/user");
const { betSchema } = require("../schema/betSchema");
const { sellBetSchema } = require("../schema/sellBetSchema");

/* ---------------- PLACE TRADE ---------------- */
const placeTrade = async (req, res) => {
  try {
    const result = betSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid trade data",
        errors: result.error.errors,
      });
    }

    const { marketId, outcome, amount } = result.data;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const market = await Market.findById(marketId);
    if (!market) return res.status(404).json({ message: "Market not found" });

    if (market.status !== "OPEN") {
      return res.status(400).json({ message: "Market is not open" });
    }

    if (new Date(market.endDate) < new Date()) {
      return res.status(400).json({ message: "Market expired" });
    }

    const selectedOutcome = market.outcomes.find(
      (o) => o.label === outcome
    );

    if (!selectedOutcome) {
      return res.status(400).json({ message: "Invalid outcome" });
    }

    const bet = await Bet.create({
      marketId,
      outcome,
      amount,
      price: selectedOutcome.probability,
      userId: req.user.id,
      status: "OPEN",
    });

    user.balance -= amount;
    await user.save();

    market.volume += amount;
    await market.save();

    res.status(201).json({
      message: "Trade placed successfully",
      bet,
      balance: user.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- GET MY BETS ---------------- */
const getMyBets = async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.user.id })
      .populate("marketId", "question endDate")
      .sort({ createdAt: -1 });

    res.status(200).json({ bets });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- SELL BET ---------------- */
const sellMyBets = async (req, res) => {
  try {
    const result = sellBetSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid sell data",
        errors: result.error.errors,
      });
    }

    const { marketId, amount } = result.data;

    const bet = await Bet.findOne({
      userId: req.user.id,
      marketId,
      status: "OPEN",
    });

    if (!bet) {
      return res.status(404).json({ message: "Active bet not found" });
    }

    if (amount > bet.amount) {
      return res
        .status(400)
        .json({ message: "Sell amount exceeds bet amount" });
    }

    const market = await Market.findById(marketId);
    if (!market) {
      return res.status(404).json({ message: "Market not found" });
    }

    // refund logic (simple version)
    const refund = amount;

    const user = await User.findById(req.user.id);
    user.balance += refund;
    await user.save();

    market.volume -= refund;
    await market.save();

    if (amount === bet.amount) {
      bet.status = "CLOSED";
    } else {
      bet.amount -= amount;
    }

    await bet.save();

    res.json({
      message: "Position sold successfully",
      bet,
      balance: user.balance,
    });
  } catch (error) {
    console.error("Sell error:", error);
    res.status(500).json({ message: "Sell failed" });
  }
};

module.exports = {
  placeTrade,
  getMyBets,
  sellMyBets,
};
