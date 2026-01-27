const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/balance", authMiddleware, getMe);

module.exports = router;
