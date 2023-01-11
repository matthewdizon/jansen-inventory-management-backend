var mongoose = require("mongoose");

const {
  BuyingTransaction,
  SellingTransaction,
} = require("../models/transactionModels");

const Part = require("../models/partsModel");

const getSellingTransactions = async (req, res) => {
  const sellingTransactions = await SellingTransaction.find({});

  res.status(200).json(sellingTransactions);
};

const getBuyingTransactions = async (req, res) => {
  const buyingTransactions = await BuyingTransaction.find({});

  res.status(200).json(buyingTransactions);
};

const createSellingTransaction = async (req, res) => {
  // subtract quantity of selected part
  const { customer, date, items, initialPayment, collectionDate } = req.body;

  let payments = [];

  if (initialPayment) payments.push(initialPayment);

  try {
    let total = 0;

    async function calculateTotal() {
      for await (const item of items.map(async (item) => {
        const part = await Part.findOne({ name: item.part });

        await Part.findOneAndUpdate(
          { _id: part._id },
          {
            $inc: { quantity: -item.quantity },
          }
        );

        return item.quantity * item.price;
      })) {
        total += item;
      }
    }

    await calculateTotal();

    const sellingTransaction = await SellingTransaction.create({
      customer,
      date,
      items,
      payments,
      collectionDate,
      total,
    });

    res.status(200).json(sellingTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const createBuyingTransaction = async (req, res) => {
  // add quantity of selected part
  const { date, items, deliveryFee } = req.body;

  try {
    let total = 0;

    async function calculateTotal() {
      for await (const item of items.map(async (item) => {
        const part = await Part.findOne({ name: item.part });

        await Part.findOneAndUpdate(
          { _id: part?._id ?? new mongoose.Types.ObjectId() },
          {
            $set: { name: item.part },
            $inc: { quantity: item.quantity },
            $push: { supplier: item.supplier },
          },
          { upsert: true }
        );

        return item.quantity * item.price;
      })) {
        total += item;
      }
    }

    await calculateTotal();

    const buyingTransaction = await BuyingTransaction.create({
      date,
      items,
      deliveryFee,
      total,
    });

    res.status(200).json(buyingTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const getSellingTransaction = async (req, res) => {
  const { id } = req.params;

  const sellingTransaction = await SellingTransaction.findById(id);

  if (!sellingTransaction) {
    return res.status(404).json({ error: "No such selling transaction" });
  }

  res.status(200).json(sellingTransaction);
};

const getBuyingTransaction = async (req, res) => {
  const { id } = req.params;

  const buyingTransaction = await BuyingTransaction.findById(id);

  if (!buyingTransaction) {
    return res.status(404).json({ error: "No such buying transaction" });
  }

  res.status(200).json(buyingTransaction);
};

const deleteSellingTransaction = async (req, res) => {
  const { id } = req.params;

  const sellingTransaction = await SellingTransaction.findOneAndDelete({
    _id: id,
  });

  res.status(200).json(sellingTransaction);
};

const deleteBuyingTransaction = async (req, res) => {
  const { id } = req.params;

  const buyingTransaction = await BuyingTransaction.findOneAndDelete({
    _id: id,
  });

  res.status(200).json(buyingTransaction);
};

module.exports = {
  getSellingTransactions,
  getBuyingTransactions,
  createBuyingTransaction,
  createSellingTransaction,
  getSellingTransaction,
  getBuyingTransaction,
  deleteSellingTransaction,
  deleteBuyingTransaction,
};
