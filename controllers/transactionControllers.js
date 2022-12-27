const {
  BuyingTransaction,
  SellingTransaction,
} = require("../models/transactionModels");

const Part = require("../models/partsModel");

const getSellingTransactions = async (req, res) => {
  const sellingTransactions = await SellingTransaction.find({});

  res.status(200).json(sellingTransactions);
};

const getBuyingTransactions = async (req, res) => {
  const buyingTransactions = await BuyingTransaction.find({});

  res.status(200).json(buyingTransactions);
};

// const createSellingTransaction = async (req, res) => {
//   // subtract quantity of selected part
//   const { customer, date, items, collectionDate, initialPayment, total } = req.body
//   const paymentAmount = initialPayment.amount
//   const charge = total - initialPayment

//   try {
//     const sellingTransaction = await SellingTransaction.create({
//       name,
//       quantity,
//       supplier,
//       price,
//     });
//     res.status(200).json(part);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

const createBuyingTransaction = async (req, res) => {
  // add quantity of selected part
  const { date, items, deliveryFee } = req.body;

  try {
    let total = 0;

    async function calculateTotal() {
      for await (const item of items.map(async (item) => {
        const part = await Part.findById(item.part);

        await Part.findOneAndUpdate(
          { _id: part._id },
          {
            $inc: { quantity: item.quantity },
          }
        );

        return item.quantity * part.price;
      })) {
        total += item;
      }
    }

    await calculateTotal();

    const buyingTransaction = await BuyingTransaction.create({
      date,
      items,
      deliveryFee,
      total,
    });

    res.status(200).json(buyingTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
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
  getSellingTransactions,
  getBuyingTransactions,
  createBuyingTransaction,
  // createSellingTransaction,
};
