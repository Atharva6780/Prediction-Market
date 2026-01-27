const express = require("express");
const router = express.Router();
const { placeTrade } = require("../controllers/betController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/trade", authMiddleware, placeTrade);

module.exports = router;
