const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv")

const customer = require("./routes/customer");
const medicine = require("./routes/medicine");
const sale = require("./routes/sale");
const supplier = require("./routes/supplier");


const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.listen(PORT, () => {
  console.log("Server is running.");
});

server.use("/customer", customer);
server.use("/medicine", medicine);
server.use("/sale", sale);
server.use("/supplier", supplier);

