const User = require("../models/user");

/* ---------------- GET CURRENT USER ---------------- */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "email userName balance"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { getMe };
