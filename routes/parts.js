const express = require("express");
const { getParts, createPart } = require("../controllers/partController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getParts);
router.post("/", createPart);

module.exports = router;
