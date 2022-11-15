const express = require("express");

const app = express();
const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running");
});

app.get("/", (_req, res) => res.status(200).send("OK"));
