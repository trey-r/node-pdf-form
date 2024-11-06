const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.fetchUsers)
router.post("/login", authController.handleLogin)
router.post("/update-password", authController.updatePassword)

module.exports = router;