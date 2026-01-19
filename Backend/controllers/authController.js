const jwt = require("jsonwebtoken");

const { loginSchema, signupSchema } = require("../schema/loginSchema");

const loginFunction = (req, res) => {
  const result = loginSchema.safeParse(req.body);
  console.log("LOGIN API HIT");

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Input",
      errors: result.error.errors,
    });
  }
  const user = {
    id: "123",
    email: "test@example.com",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({
    message: "Login successful",
    token,
  });
};

const signupFunction = (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Input",
      errors: result.error.errors,
    });
  }

  res.status(201).json({
    message: "Signup successful",
  });
};

module.exports = {
  loginFunction,
  signupFunction,
};
