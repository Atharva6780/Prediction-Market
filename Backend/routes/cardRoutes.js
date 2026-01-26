const express = require("express");
const router = express.Router();

const { createCard, getMarkets } = require("../controllers/cardController");
const Market = require("../models/Market"); // ✅ ADD THIS

router.post("/create", createCard);
router.get("/get", getMarkets);

router.get("/:id", async (req, res) => {
  try {
    const market = await Market.findById(req.params.id);

    if (!market) {
      return res.status(404).json({ message: "Market not found" });
    }

    res.json({ market });
  } catch (error) {
    console.error("Get market by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
