const Supplier = require("../models/suppliersModel");

const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({});

  res.status(200).json(suppliers);
};

const createSupplier = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).send({ error: "Name must be provided" });
  }

  try {
    const supplier = await Supplier.create({
      name,
    });
    res.status(200).json(supplier);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSuppliers,
  createSupplier,
};
