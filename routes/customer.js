const db = require("./db.json");
const fs = require("fs");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const newCustomer = req.body;
  if (!newCustomer.name || !newCustomer.phone_number || !newCustomer.email) {
    return res.status(400).json({ message: "Data Incompleted" });
  } else {
    db.Customers.push(newCustomer);
    saveData(db);
    return res.status(201).json({ message: "Data completed." });
  }
});

router.get("/", (req, res) => {
  return res.json(db.Customers);
});

router.put("/:id", (req, res) => {
  const customerID = parseInt(req.params.id);
  const update = req.body;
  const index = db.Customers.findIndex(
    (Customers) => Customers.id === customerID
  );

  if (index == -1) {
    return res.status(404).json({ message: "Customers not founded." });
  }

  db.Customers[index].name = update.name || db.Customers[index].name;
  db.Customers[index].phone_number = update.phone_number || db.Customers[index].phone_number;
  db.Customers[index].email = update.email || db.Customers[index].email;

  saveData(db);
  return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.Customers = db.Customers.filter((Customers) => Customers.id !== id);
  saveData(db);
  return res.status(200).json({ message: "Customers deleted." });
});

function saveData() {
  fs.writeFileSync(__dirname + "/db.json", JSON.stringify(db, null, 2));
}

module.exports = router