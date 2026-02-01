const User = require("../models/user");
const { updateProfileSchema } = require("../schema/updateProfile");

const updateProfile = async (req, res) => {
  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid data",
      errors: result.error.errors,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio: result.data.bio },
      { new: true }
    ).select("bio");

    res.json({
      message: "Profile updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateProfile };
