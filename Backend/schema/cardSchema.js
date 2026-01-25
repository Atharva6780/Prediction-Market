const { z } = require("zod");

const outcomeSchema = z.object({
  label: z.string().min(1),
  probability: z.number().min(0).max(100),
});

const cardSchema = z.object({
  question: z.string().min(5),

  description: z.string().optional(),

  image: z.string().url().optional(),

  endDate: z.string(),

  outcomes: z.array(outcomeSchema).min(2),
});

module.exports = { cardSchema };
