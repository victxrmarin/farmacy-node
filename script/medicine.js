const medicineForm = document.getElementById('medicine-form')
const medicineList= document.getElementById('medicine-list')
var autoIncrement = 1;


function listMedicines() {
    fetch('http://localhost:3000/medicine')
        .then(response => response.json())
        .then(data => {
            medicineForm.reset();
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');
            medicineList.innerHTML = '';
            data.forEach(medicine => {
                autoIncrement = data.length + 1
                const deleteButton = document.createElement('button');
                const editButton = document.createElement('button');
                const tr = document.createElement('tr');
                tr.innerHTML = `<td id=c${medicine.id}${medicine.id}>${medicine.id} </td>
                                <td id=c${medicine.id}${medicine.name}>${medicine.name} </td>
                                <td id=c${medicine.id}${medicine.producer}>${medicine.producer} </td>
                                <td id=c${medicine.id}${medicine.quantity}>${medicine.quantity} </td>`;
                tr.appendChild(deleteButton);
                tr.appendChild(editButton)
                medicineList.appendChild(tr);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteMedicine(medicine));
                editButton.textContent = 'Editar'
                editButton.addEventListener('click', () => editMedicine(medicine, editButton));

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

function editMedicine(medicine, btn) {
    const idElement = document.getElementById(`c${medicine.id}${medicine.id}`);
    const nameElement = document.getElementById(`c${medicine.id}${medicine.name}`);
    const producerElement = document.getElementById(`c${medicine.id}${medicine.producer}`);
    const phoneElement = document.getElementById(`c${medicine.id}${medicine.quantity}`);

    if (idElement && phoneElement) {
        if (medicine.name && nameElement === null) {
            console.error(`Elemento de nome para o cliente ${medicine.id} não foi encontrado.`);
            return;
        }

        if (medicine.producer && producerElement === null) {
            console.error(`Elemento de producer para o cliente ${medicine.id} não foi encontrado.`);
            return;
        }

        if (btn.textContent === 'Editar') {
            idElement.contentEditable = true;
            nameElement.contentEditable = true;
            producerElement.contentEditable = true;
            phoneElement.contentEditable = true;

            btn.textContent = 'Salvar';
        } else {
            idElement.id = `c${medicine.id}${medicine.id}`;
            nameElement.id = `c${medicine.id}${medicine.name}`;
            producerElement.id = `c${medicine.id}${medicine.producer}`;
            phoneElement.id = `c${medicine.id}${medicine.quantity}`;

            fetch(`http://localhost:3000/medicine/${medicine.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idElement.textContent,
                    name: nameElement.textContent,
                    producer: producerElement.textContent,
                    quantity: phoneElement.textContent
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o cliente');
                }
                return response.json();
            })
            .then(updatedmedicine => {
                // Desabilitar a edição dos elementos
                idElement.contentEditable = false;
                nameElement.contentEditable = false;
                producerElement.contentEditable = false;
                phoneElement.contentEditable = false;
                btn.textContent = 'Editar';
            })
            .catch(error => console.error(error));
        }
    } else {
        console.error('Um ou mais elementos não foram encontrados.');
    }
}



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