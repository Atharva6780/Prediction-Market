const { z } = require("zod");
const { signupFunction } = require("../controllers/authController");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z
  .object({
    name: z.string().min(4),
    userName: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPass: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

module.exports = {
  loginSchema,
  signupSchema,
};
