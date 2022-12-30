const express = require("express");
const {
  getParts,
  createPart,
  deletePart,
  getPart,
} = require("../controllers/partController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getParts);
router.get("/:id", getPart);
router.post("/", createPart);
router.delete("/:id", deletePart);

module.exports = router;
