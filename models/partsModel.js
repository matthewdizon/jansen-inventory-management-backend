const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: { type: String, required: true, unique: true, dropDups: true },
  quantity: { type: Number, required: false },
  supplier: {
    type: [String],
    required: false,
  },
  quantityThreshold: { type: Number, default: 1 },
});

const Part = mongoose.model("part", partSchema);

module.exports = Part;
