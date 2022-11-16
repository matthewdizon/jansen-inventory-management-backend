const express = require("express");
const { getParts, createPart } = require("../controllers/partController");

const router = express.Router();

router.get("/", getParts);
router.post("/", createPart);

module.exports = router;
