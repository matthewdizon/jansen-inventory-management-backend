const Part = require("../models/partsModel");
const {
  BuyingTransaction,
  SellingTransaction,
} = require("../models/transactionModels");

const getNumberOfProducts = async (req, res) => {
  try {
    const count = await Part.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionsMonthlyTotal = async (req, res) => {
  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the transactions for the current month
    const sellingTransactions = await SellingTransaction.find({
      date: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    // Sum the profit of the transactions
    let totalProfit = 0;
    sellingTransactions.forEach((transaction) => {
      totalProfit += transaction.total;
    });

    // Get the transactions for the current month
    const buyingTransactions = await BuyingTransaction.find({
      date: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    // Sum the profit of the transactions
    let totalExpenses = 0;
    buyingTransactions.forEach((transaction) => {
      totalExpenses += transaction.total;
    });

    res.json({ totalProfit, totalExpenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUpcomingAndOverduePayments = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Get the payments that are overdue or near
    const payments = await SellingTransaction.find({
      $or: [
        { collectionDate: { $lt: currentDate } },
        {
          collectionDate: {
            $gte: currentDate,
            $lte: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    });

    // Return the payments
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLowQuantityParts = async (req, res) => {
  try {
    // Get the low-quantity parts
    const parts = await Part.find({
      $expr: {
        $lte: ["$quantity", "$quantityThreshold"],
      },
    });
    // Return the parts
    res.json({ parts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfitPerMonth = async (req, res) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Get the transactions for the current year
    const sellingTransactions = await SellingTransaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalProfit: { $sum: "$total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Create an array to store the profit of each month
    let profitPerMonth = Array(12).fill(0);
    sellingTransactions.forEach((transaction) => {
      profitPerMonth[transaction._id - 1] = transaction.totalProfit;
    });

    // Get the transactions for the current month
    const buyingTransactions = await BuyingTransaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalExpenses: { $sum: "$total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Create an array to store the profit of each month
    let expensesPerMonth = Array(12).fill(0);
    buyingTransactions.forEach((transaction) => {
      expensesPerMonth[transaction._id - 1] = transaction.totalExpenses;
    });

    res.json({ profitPerMonth, expensesPerMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNumberOfProducts,
  getTransactionsMonthlyTotal,
  getUpcomingAndOverduePayments,
  getLowQuantityParts,
  getProfitPerMonth,
};
