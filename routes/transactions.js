const express = require("express");
const {
  getBuyingTransactions,
  getSellingTransactions,
  createBuyingTransaction,
} = require("../controllers/transactionControllers");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Selling
router.get("/selling", authenticateToken, getSellingTransactions);

// Buying
router.get("/buying", authenticateToken, getBuyingTransactions);
router.post("/buying", authenticateToken, createBuyingTransaction);

module.exports = router;
