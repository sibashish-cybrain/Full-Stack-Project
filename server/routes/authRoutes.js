const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login,
  profile,
  logoutUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshAccessToken
} = require("../controllers/authController");

const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logoutUser);

// User Profile
router.get("/profile", authMiddleware, profile);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

// Password Reset
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token",resetPassword);

// Token Refresh
router.post("/refresh-token", refreshAccessToken);

module.exports = router;