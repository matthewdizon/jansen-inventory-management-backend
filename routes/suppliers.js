const express = require("express");
const {
  getSuppliers,
  createSupplier,
} = require("../controllers/supplierController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getSuppliers);
router.post("/", authenticateToken, createSupplier);

module.exports = router;
