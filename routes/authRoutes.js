const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/register", authController.signUp);

module.exports = router;
