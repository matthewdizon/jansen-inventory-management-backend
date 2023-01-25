const express = require("express");
const {
  getParts,
  createPart,
  deletePart,
  getPart,
  updatePart,
} = require("../controllers/partController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getParts);
router.get("/:id", getPart);
router.post("/", createPart);
router.delete("/:id", deletePart);
router.patch("/:id", updatePart);

module.exports = router;
