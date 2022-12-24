const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: String,
});

const Supplier = mongoose.model("supplier", supplierSchema);

module.exports = Supplier;
