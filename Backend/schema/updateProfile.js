const { z } = require("zod");

exports.updateProfileSchema = z.object({
  bio: z.string().max(200).optional(),
});
