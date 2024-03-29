const Part = require("../models/partsModel");
const {
  BuyingTransaction,
  SellingTransaction,
} = require("../models/transactionModels");

const getParts = async (req, res) => {
  const parts = await Part.find({});

  res.status(200).json(parts);
};

const getPart = async (req, res) => {
  const { id } = req.params;

  const part = await Part.findById(id).populate([
    { path: "sellingTransactions", model: SellingTransaction },
    { path: "buyingTransactions", model: BuyingTransaction },
  ]);

  if (!part) {
    return res.status(404).json({ error: "No such part" });
  }

  res.status(200).json(part);
};

const createPart = async (req, res) => {
  const { name, quantity, supplier, quantityThreshold } = req.body;

  if (!name) {
    return res.status(422).send({ error: "Name must be provided" });
  }

  try {
    const part = await Part.create({
      name,
      quantity,
      supplier,
      quantityThreshold,
    });
    res.status(200).json(part);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const deletePart = async (req, res) => {
  const { id } = req.params;

  const part = await Part.findOneAndDelete({ _id: id });

  res.status(200).json(part);
};

const updatePart = async (req, res) => {
  const { slug } = req.body;
  console.log(slug);

  const part = await Part.findOneAndUpdate(
    { _id: slug },
    {
      ...req.body,
    }
  );

  return res.status(200).json(part);
};

module.exports = {
  getParts,
  getPart,
  createPart,
  deletePart,
  updatePart,
};
