const db = require("../db.json");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const newSale = req.body;
  if (!newSale.name || !newSale.id_medicine || !newSale.id_customer) {
    return res.status(400).json({ message: "Data Incompleted" });
  } else {
    db.Sales.push(newSale);
    savedb(db);
    return res.status(201).json({ message: "Data completed." });
  }
});

router.get("/", (req, res) => {
  return res.json(db.Saless);
});

router.put("/:id", (req, res) => {
  const saleID = parseInt(req.params.id);
  const update = req.body;
  const index = db.Sales.findIndex(
    (Sales) => Sales.id === saleID
  );

  if (index == -1) {
    return res.status(404).json({ message: "Sales not founded." });
  }

  db.Sales[index].date = update.date || db.Sales[index].date;
  db.Sales[index].id_medicine = update.id_medicine || db.Sales[index].id_medicine;
  db.Sales[index].id_customer = update.id_customer || db.Sales[index].id_customer;

  savedb(db);
  return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.Sales = db.Sales.filter((Sales) => Sales !== id);
  savedb(db);
  return res.status(200).json({ message: "Sales deleted." });
});

function saveData() {
  fs.writeFileSync(__dirname + "/db.json", JSON.stringify(data, null, 2));
}

module.exports = router