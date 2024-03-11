const db = require("../db.json");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const newMedicine = req.body;
  if (!newMedicine.name || !newMedicine.producer || !newMedicine.quantity) {
    return res.status(400).json({ message: "db Incompleted" });
  } else {
    db.Medicines.push(newMedicine);
    savedb(db);
    return res.status(201).json({ message: "db completed." });
  }
});

router.get("/", (req, res) => {
  return res.json(db.Medicines);
});

router.put("/:id", (req, res) => {
  const medicineID = parseInt(req.params.id);
  const update = req.body;
  const index = db.Medicines.findIndex(
    (Medicines) => Medicines.id === medicineID
  );

  if (index == -1) {
    return res.status(404).json({ message: "Medicines not founded." });
  }

  db.Medicines[index].name = update.name || db.Medicines[index].name;
  db.Medicines[index].producer = update.producer || db.Medicines[index].producer;
  db.Medicines[index].quantity = update.quantity || db.Medicines[index].quantity;

  savedb(db);
  return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.Medicines = db.Medicines.filter((Medicines) => Medicines.id !== id);
  savedb(db);
  return res.status(200).json({ message: "Medicines deleted." });
});

function saveData() {
  fs.writeFileSync(__dirname + "/db.json", JSON.stringify(data, null, 2));
}

module.exports = router;
