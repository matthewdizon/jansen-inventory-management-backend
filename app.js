require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const getUsers = require("./routes/users");
const getParts = require("./routes/parts");
const getSuppliers = require("./routes/suppliers");
const getTransactions = require("./routes/transactions");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (_req, res) => res.status(200).send("OK"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.use("/api/users", getUsers);
app.use("/api/parts", getParts);
app.use("/api/suppliers", getSuppliers);
app.use("/api/transactions", getTransactions);
