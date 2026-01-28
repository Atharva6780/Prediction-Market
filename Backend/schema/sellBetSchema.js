const { z } = require("zod");

const sellBetSchema = z.object({
  marketId: z.string().min(1),
  outcome: z.enum(["YES", "NO"]),
  amount: z.number().positive(),
});

module.exports = { sellBetSchema };
