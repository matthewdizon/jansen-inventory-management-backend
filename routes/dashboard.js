const express = require("express");
const {
  getNumberOfProducts,
  getTransactionsMonthlyTotal,
  getUpcomingAndOverduePayments,
  getLowQuantityParts,
  getProfitPerMonth,
} = require("../controllers/dashboardController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/productsCount", authenticateToken, getNumberOfProducts);
router.get(
  "/transactionsMonthlyTotal",
  authenticateToken,
  getTransactionsMonthlyTotal
);
router.get(
  "/upcomingAndOverduePayments",
  authenticateToken,
  getUpcomingAndOverduePayments
);

router.get("/lowQuantityParts", authenticateToken, getLowQuantityParts);

router.get("/getProfitPerMonth", authenticateToken, getProfitPerMonth);

module.exports = router;
