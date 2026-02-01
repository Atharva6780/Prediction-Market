const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfile } = require("../controllers/updateProfile");

router.get("/balance", authMiddleware, getMe);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile)
router.get("/profile", authMiddleware, getMe);

module.exports = router;
