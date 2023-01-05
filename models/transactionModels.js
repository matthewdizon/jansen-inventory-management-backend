const mongoose = require("mongoose");

const sellingTransactionSchema = new mongoose.Schema({
  customer: { type: String },
  date: { type: Date },
  items: [
    {
      part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Part",
      },
      quantity: Number,
      price: Number,
    },
  ],
  collectionDate: { type: Date },
  payments: [
    {
      method: { type: String, enum: ["Cash", "Check"] },
      amount: Number,
      date: Date,
    },
  ],
  charge: Number,
  total: Number,
});

const buyingTransactionSchema = new mongoose.Schema({
  date: { type: Date },
  items: [
    {
      part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Part",
      },
      quantity: Number,
      price: Number,
    },
  ],
  deliveryFee: Number,
  total: Number,
});

const BuyingTransaction = mongoose.model(
  "BuyingTransaction",
  buyingTransactionSchema
);
const SellingTransaction = mongoose.model(
  "SellingTransaction",
  sellingTransactionSchema
);

module.exports = {
  BuyingTransaction,
  SellingTransaction,
};
