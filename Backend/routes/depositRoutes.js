const express = require("express");
const router = express.Router();
const { createDeposit } = require("../controllers/depositController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createDeposit);

module.exports = router;
