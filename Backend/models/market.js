const mongoose = require("mongoose");

/* ---------- Outcome Schema ---------- */
const outcomeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true, // YES / NO
    },
    probability: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { _id: false }
);

/* ---------- Market Schema ---------- */
const marketSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    endDate: {
      type: Date,
    },

    // 🔹 Outcomes with implied probability
    outcomes: {
      type: [outcomeSchema],
      validate: {
        validator: (v) => v.length >= 2,
        message: "At least two outcomes are required",
      },
    },

    // 🔹 Total traded volume
    volume: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 🔹 Volume per outcome (USED FOR IMPLIED PROBABILITY)
    yesVolume: {
      type: Number,
      default: 0,
      min: 0,
    },

    noVolume: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "RESOLVED"],
      default: "OPEN",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resolvedOutcome: {
      type: String, // YES / NO
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Market || mongoose.model("Market", marketSchema);
