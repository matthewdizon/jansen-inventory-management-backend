const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: String,
});

const Part = mongoose.model("part", partSchema);

module.exports = Part;
