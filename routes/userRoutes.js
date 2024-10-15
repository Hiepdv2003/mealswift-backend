const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

// Protected routes (Authentication required)
router.get("/:id", authenticate, userController.getUserById); // Get the authenticated user's profile
router.put("/:id", authenticate, userController.updateUser); // Update the authenticated user's profile
router.delete("/:id", authenticate, userController.deleteUser); // Delete the authenticated user's account

// Admin-only routes (Authorization required)
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers); // List all users (Admin access)
router.get("/:id", authenticate, authorize(["admin"]), userController.getUserById); // Get a user by ID (Admin access)
//router.put("/role", authenticate, authorize(["admin"]), userController.updateUserRole); // Update a user's role (Admin access)

module.exports = router;
