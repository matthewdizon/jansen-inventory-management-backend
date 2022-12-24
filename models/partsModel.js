const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: false },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: false,
  },
  price: { type: Number, required: false },
});

const Part = mongoose.model("part", partSchema);

module.exports = Part;
