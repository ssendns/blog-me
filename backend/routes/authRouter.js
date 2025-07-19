const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { signUp, logIn, getProfile } = require("../controllers/authController");

router.post("/sign-up", signUp);
router.post("/log-in", logIn);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
