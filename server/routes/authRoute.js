const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createUser,
  login,
  deleteUser,
  logout,
} = require("../controller/authController");

router.post("/register", createUser);
router.post("/login", authMiddleware, login);
router.get("/logout", logout);
router.delete("/delete/:email", deleteUser);
module.exports = router;
