const db = require("../db.json");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const newSupplier = req.body;
  if (!newSupplier.name || !newSupplier.address || !newSupplier.phone_number) {
    return res.status(400).json({ message: "db Incompleted" });
  } else {
    db.Suppliers.push(newSupplier);
    savedb(db);
    return res.status(201).json({ message: "db completed." });
  }
});

router.get("/", (req, res) => {
  return res.json(db.Supplierss);
});

router.put("/:id", (req, res) => {
  const supplierID = parseInt(req.params.id);
  const update = req.body;
  const index = db.Suppliers.findIndex(
    (Suppliers) => Suppliers.id === supplierID
  );

  if (index == -1) {
    return res.status(404).json({ message: "Suppliers not founded." });
  }

  db.Suppliers[index].name = update.name || db.Suppliers[index].name;
  db.Suppliers[index].address = update.address || db.Suppliers[index].address;
  db.Suppliers[index].phone_number =
    update.phone_number || db.Suppliers[index].phone_number;

  savedb(db);
  return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.Suppliers = db.Suppliers.filter((Suppliers) => Suppliers.id !== id);
  savedb(db);
  return res.status(200).json({ message: "Suppliers deleted." });
});

function saveData() {
  fs.writeFileSync(__dirname + "/db.json", JSON.stringify(data, null, 2));
}

module.exports = router;
