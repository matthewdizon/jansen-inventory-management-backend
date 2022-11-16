const Part = require("../models/partsModel");

const getParts = async (req, res) => {
  const parts = await Part.find({});

  res.status(200).json(parts);
};

const createPart = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).send({ error: "Name must be provided" });
  }

  try {
    const part = await Part.create({
      name,
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