const express = require("express");
const router = express.Router();

const { loginFunction, signupFunction } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", loginFunction);
router.post("/signup", signupFunction);

router.post("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;
