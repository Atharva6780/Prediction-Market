const express = require("express");
const router = express.Router();
const { placeTrade,getMyBets,sellMyBets } = require("../controllers/betController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/trade", authMiddleware, placeTrade);
router.get("/my", authMiddleware, getMyBets);
router.post("/sell", authMiddleware, sellMyBets);

module.exports = router;
