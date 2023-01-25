const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: { type: String, required: true, unique: false, dropDups: false },
  quantity: { type: Number, required: false },
  supplier: {
    type: String,
    required: true,
  },
  quantityThreshold: { type: Number, default: 1 },
  sellingTransactions: { type: [String] },
  buyingTransactions: { type: [String] },
});

const Part = mongoose.model("part", partSchema);

module.exports = Part;
