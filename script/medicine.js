const medicineForm = document.getElementById('medicine-form')
const medicineList= document.getElementById('medicine-list')
var autoIncrement = 1;


function listMedicines() {
    fetch('http://localhost:3000/medicine')
        .then(response => response.json())
        .then(data => {
            medicineList.innerHTML = '';
            data.forEach(medicine => {
                autoIncrement = data.length + 1
                const li = document.createElement('li');
                li.innerHTML = `${medicine.name} | ${medicine.producer} | ${medicine.quantity}`;
                medicineList.appendChild(li);
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteMedicine(medicine));
                li.appendChild(deleteButton);
            });
        })
        .catch(error => console.error('Erro:', error));
}

medicineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const producer = document.getElementById('producer').value;
    const quantity = document.getElementById('quantity').value;

    fetch('http://localhost:3000/medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: autoIncrement, name: name, producer: producer, quantity: quantity }),
    })
    .then(response => response.json())
    .then(() => {
        listMedicines();
        medicineForm.reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteMedicine(medicine){
    fetch(`http://localhost:3000/medicine/${medicine.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
}

listMedicines()