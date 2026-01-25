const express = require("express");
const router = express.Router();

const { createCard } = require("../controllers/cardController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", createCard);

module.exports = router;
