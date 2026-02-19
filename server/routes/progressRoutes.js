const express = require("express");
const router = express.Router();
const { toggleProgress } = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/:problemId", authMiddleware, toggleProgress);

module.exports = router;
