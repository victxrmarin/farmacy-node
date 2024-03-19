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
  const id = parseInt(req.params.id);
  const { name, email, phone_number } = req.body;

  // Procura o cliente na lista pelo ID
  const customerIndex = db.Customers.findIndex(customer => customer.id === id);

  // Se o cliente não foi encontrado, retorna um erro
  if (customerIndex === -1) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  // Atualiza os dados do cliente com os valores fornecidos
  db.Customers[customerIndex] = {
      ...db.Customers[customerIndex],
      name: name || customers[customerIndex].name,
      email: email || customers[customerIndex].email,
      phone_number: phone_number || customers[customerIndex].phone_number
  };

  saveData(db);
  // Retorna os dados atualizados do cliente
  res.json(db.Customers[customerIndex]);
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