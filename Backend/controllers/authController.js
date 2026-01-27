const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { loginSchema, signupSchema } = require("../schema/loginSchema");

/* -------------------- LOGIN -------------------- */
const loginFunction = async (req, res) => {
  try {
    // 1️⃣ Validate input
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.errors,
      });
    }

    const { email, password } = result.data;

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // 5️⃣ Response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* -------------------- SIGNUP -------------------- */
const signupFunction = async (req, res) => {
  try {
    // 1️⃣ Validate input
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.errors,
      });
    }

    const { name, userName, email, password } = result.data;

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
      balance: 10000,
    });

    return res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginFunction,
  signupFunction,
};
