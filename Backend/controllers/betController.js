const Bet = require("../models/bet");
const Market = require("../models/Market");
const User = require("../models/user");
const { betSchema } = require("../schema/betSchema");

/* ---------------- PLACE TRADE ---------------- */
const placeTrade = async (req, res) => {
  try {
    // 1️⃣ Validate request body
    const result = betSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid trade data",
        errors: result.error.errors,
      });
    }

    const { marketId, outcome, amount } = result.data;

    // 2️⃣ Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3️⃣ Check balance
    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // 4️⃣ Find market
    const market = await Market.findById(marketId);
    if (!market) {
      return res.status(404).json({
        message: "Market not found",
      });
    }

    // 5️⃣ Check market status
    if (market.status !== "OPEN") {
      return res.status(400).json({
        message: "Market is not open for trading",
      });
    }

    // 6️⃣ Check market end time
    if (new Date(market.endDate) < new Date()) {
      return res.status(400).json({
        message: "Market has expired",
      });
    }

    // 7️⃣ Validate outcome
    const selectedOutcome = market.outcomes.find(
      (o) => o.label === outcome
    );

    if (!selectedOutcome) {
      return res.status(400).json({
        message: "Invalid outcome",
      });
    }

    // 8️⃣ Create bet
    const bet = await Bet.create({
      marketId,
      outcome,
      amount,
      price: selectedOutcome.probability,
      userId: req.user.id,
      status: "OPEN",
    });

    // 9️⃣ Deduct user balance
    user.balance -= amount;
    await user.save();

    // 🔟 Update market volume
    market.volume += amount;
    await market.save();

    // 1️⃣1️⃣ Response
    return res.status(201).json({
      message: "Trade placed successfully",
      bet,
      balance: user.balance, // return updated balance
    });
    
  } catch (error) {
    console.error("Place trade error:", error);
    return res.status(500).json({
      message: "Server error",
    });
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
    console.error("Get bets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { placeTrade, getMyBets };
