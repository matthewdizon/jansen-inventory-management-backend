const express = require("express");
const {
  getBuyingTransactions,
  getSellingTransactions,
  createBuyingTransaction,
  createSellingTransaction,
} = require("../controllers/transactionControllers");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Selling
router.get("/selling", authenticateToken, getSellingTransactions);
router.post("/selling", authenticateToken, createSellingTransaction);

// Buying
router.get("/buying", authenticateToken, getBuyingTransactions);
router.post("/buying", authenticateToken, createBuyingTransaction);

module.exports = router;
