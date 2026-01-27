const express = require("express");
const router = express.Router();
const { placeTrade,getMyBets } = require("../controllers/betController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/trade", authMiddleware, placeTrade);
router.get("/my", authMiddleware, getMyBets);

module.exports = router;
