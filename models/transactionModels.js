const mongoose = require("mongoose");

const sellingTransactionSchema = new mongoose.Schema(
  {
    customer: { type: String },
    date: { type: Date },
    items: [
      {
        part: String,
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
    total: Number,
    user: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

sellingTransactionSchema.virtual("totalPayments").get(function () {
  return this.payments
    .map((payment) => payment.amount)
    .reduce((sum, price) => sum + price, 0);
});

sellingTransactionSchema.virtual("charge").get(function () {
  return this.total - this.totalPayments;
});

const buyingTransactionSchema = new mongoose.Schema({
  date: { type: Date },
  items: [
    {
      part: String,
      quantity: Number,
      price: Number,
    },
  ],
  deliveryFee: Number,
  total: Number,
  user: String,
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
