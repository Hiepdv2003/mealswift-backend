const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

// Protected routes (Authentication required)
router.get("/", authorize(["admin"]), userController.getAllUsers);
router.get("/:id", authorize(["admin"]), userController.getUserById);
router.put("/:id", authorize(["admin"]), userController.updateUser);
router.delete("/:id", authorize(["admin"]), userController.deleteUser);

// Admin-only routes (Authorization required)
//router.put("/role", authenticate, authorize(["admin"]), userController.updateUserRole);

module.exports = router;
