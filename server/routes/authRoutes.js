const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("../config/passport");
const User = require("../models/User");

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

// Initialize Router
const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth

// Redirect user to Google Login page
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google redirects back to this route after successful login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  async (req, res, next) => {
    try {
      // Authenticated user returned by Passport
      const user = req.user;

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      user.refreshToken = hashedRefreshToken;
      await user.save();

      // Cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Redirect to frontend dashboard
      res.redirect("http://localhost:5173/dashboard");

    } catch (error) {
      next(error);
    }
  }
);

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