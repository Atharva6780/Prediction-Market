const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    // Which market this bet belongs to
    marketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
      required: true,
    },

    // YES or NO
    outcome: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },

    // Amount user bet (₹)
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    // Price (probability) at the time of trade
    // IMPORTANT: this should NEVER change later
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // (Future) user who placed the bet
    // Keep optional for now since you don't have auth
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Bet status (useful later for settlement)
    status: {
      type: String,
      enum: ["OPEN", "WON", "LOST"],
      default: "OPEN",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Bet", betSchema);
