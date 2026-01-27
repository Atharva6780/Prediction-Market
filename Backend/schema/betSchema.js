const { z } = require("zod");

const betSchema = z.object({
  marketId: z.string().min(1, "Market ID is required"),

  outcome: z.enum(["YES", "NO"], {
    required_error: "Outcome is required",
  }),

  amount: z
    .number()
    .int()
    .positive("Amount must be greater than 0"),
});

module.exports = { betSchema };
