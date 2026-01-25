const mongoose = require("mongoose");

/* ---------- Outcome Schema ---------- */
const outcomeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true, // YES / NO / ranges like 6–8
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
    //   required: true,
    },

    outcomes: {
      type: [outcomeSchema],
      validate: {
        validator: (v) => v.length >= 2,
        message: "At least two outcomes are required",
      },
    },

    volume: {
      type: Number,
      default: 0, // total money traded
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
    //   required: true,
    },

    resolvedOutcome: {
      type: String, // label of winning outcome
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Market", marketSchema);
