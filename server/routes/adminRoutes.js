const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getAllUsers, getUserById, deleteUser } = require("../controllers/adminController");

const router = express.Router();

// Admin Routes
router.get( "/users", authMiddleware, adminMiddleware, getAllUsers );
router.get( "/users/:id", authMiddleware, adminMiddleware, getUserById );
router.delete( "/users/:id", authMiddleware, adminMiddleware, deleteUser );

module.exports = router;