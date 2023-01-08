const express = require("express");
const {
  getBuyingTransactions,
  getSellingTransactions,
  createBuyingTransaction,
  createSellingTransaction,
  getSellingTransaction,
  getBuyingTransaction,
  deleteSellingTransaction,
  deleteBuyingTransaction,
} = require("../controllers/transactionControllers");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Selling
router.get("/selling", authenticateToken, getSellingTransactions);
router.post("/selling", authenticateToken, createSellingTransaction);
router.get("/selling/:id", getSellingTransaction);
router.delete("/selling/:id", deleteSellingTransaction);

// Buying
router.get("/buying", authenticateToken, getBuyingTransactions);
router.post("/buying", authenticateToken, createBuyingTransaction);
router.get("/buying/:id", getBuyingTransaction);
router.delete("/buying/:id", deleteBuyingTransaction);

module.exports = router;
