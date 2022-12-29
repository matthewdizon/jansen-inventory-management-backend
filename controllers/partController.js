const Part = require("../models/partsModel");

const getParts = async (req, res) => {
  const pipeline = [
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplier",
      },
    },
  ];
  const parts = await Part.aggregate(pipeline).exec();

  res.status(200).json(parts);
};

const createPart = async (req, res) => {
  const { name, quantity, supplier, price } = req.body;

  if (!name) {
    return res.status(422).send({ error: "Name must be provided" });
  }

  try {
    const part = await Part.create({
      name,
      quantity,
      supplier,
      price,
    });
    res.status(200).json(part);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getParts,
  createPart,
};
