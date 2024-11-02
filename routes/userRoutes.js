const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/", authorize(["admin"]), userController.getAllUsers);
router.get(
  "/profile",
  authorize(["admin", "customer"]),
  userController.getUserProfile
);
router.put("/:id", authorize(["admin"]), userController.updateUser);
router.delete("/:id", authorize(["admin"]), userController.deleteUser);
router.get("/roles", authorize(["admin"]), userController.getRoles);

module.exports = router;
