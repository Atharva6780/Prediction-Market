const { cardSchema } = require("../schema/cardSchema");
const Market = require("../models/Market");

/* ---------------- CREATE MARKET (ADMIN) ---------------- */
const createCard = async (req, res) => {
  try {
    // 1️⃣ Validate request body using Zod
    const result = cardSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid market data",
        errors: result.error.errors,
      });
    }

    // 2️⃣ Extract validated data
    const { question, description, image, endDate, outcomes, volume, status } =
      result.data;

    // 3️⃣ Create market in DB
    const market = await Market.create({
      question,
      description,
      image,
      endDate,
      outcomes,
      volume: volume || 0,
      status: status || "OPEN",
      //   createdBy: req.user.id, // from JWT
    });

    // 4️⃣ Send response
    res.status(201).json({
      message: "Market created successfully",
      market,
    });
  } catch (error) {
    console.error("Create market error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMarkets = async (req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 });

    res.status(200).json({
      markets,
    });
  } catch (error) {
    console.error("Get markets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createCard,
  getMarkets
};
