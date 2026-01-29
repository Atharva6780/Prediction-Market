const Bet = require("../models/bet");
const Market = require("../models/market");
const User = require("../models/user");
const { betSchema } = require("../schema/betSchema");
const { sellBetSchema } = require("../schema/sellBetSchema");

/* ---------- Helper: Update implied probabilities ---------- */
const updateMarketProbabilities = (market) => {
  const total = market.yesVolume + market.noVolume;

  const yesProbability =
    total === 0 ? 50 : Math.round((market.yesVolume / total) * 100);

  const noProbability = 100 - yesProbability;

  market.outcomes = [
    { label: "YES", probability: yesProbability },
    { label: "NO", probability: noProbability },
  ];
};

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

    // update volume per outcome
    if (outcome === "YES") {
      market.yesVolume += amount;
    } else {
      market.noVolume += amount;
    }

    // update implied probabilities
    updateMarketProbabilities(market);

    // total market volume
    market.volume += amount;

    const selectedOutcome = market.outcomes.find(
      (o) => o.label === outcome
    );

    const bet = await Bet.create({
      marketId,
      outcome,
      amount,
      price: selectedOutcome.probability, // lock entry price
      userId: req.user.id,
      status: "OPEN",
    });

    user.balance -= amount;
    await user.save();

    await market.save();

    res.status(201).json({
      message: "Trade placed successfully",
      bet,
      balance: user.balance,
      market,
    });
  } catch (error) {
    console.error("Place trade error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- GET MY BETS ---------------- */
const getMyBets = async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.user.id })
      .populate("marketId", "question endDate outcomes")
      .sort({ createdAt: -1 });

    res.status(200).json({ bets });
  } catch (error) {
    console.error("Get bets error:", error);
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

    // reverse outcome volume
    if (bet.outcome === "YES") {
      market.yesVolume = Math.max(0, market.yesVolume - amount);
    } else {
      market.noVolume = Math.max(0, market.noVolume - amount);
    }

    // update implied probabilities
    updateMarketProbabilities(market);

    // update total volume
    market.volume = Math.max(0, market.volume - amount);

    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();

    if (amount === bet.amount) {
      bet.status = "CLOSED";
    } else {
      bet.amount -= amount;
    }

    await bet.save();
    await market.save();

    res.json({
      message: "Position sold successfully",
      bet,
      balance: user.balance,
      market,
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
