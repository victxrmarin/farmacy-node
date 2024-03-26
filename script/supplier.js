const supplierForm = document.getElementById('supplier-form')
const supplierList = document.getElementById('supplier-list')
var autoIncrement = 1;


function listSuppliers() {
    fetch('http://localhost:3000/supplier')
        .then(response => response.json())
        .then(data => {
            supplierForm.reset();
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');
            supplierList.innerHTML = '';
            data.forEach(supplier => {
                autoIncrement = data.length + 1
                const deleteButton = document.createElement('button');
                const editButton = document.createElement('button');
                const tr = document.createElement('tr');
                tr.innerHTML = `<td id=c${supplier.id}${supplier.id}>${supplier.id} </td>
                                <td id=c${supplier.id}${supplier.name}>${supplier.name} </td>
                                <td id=c${supplier.id}${supplier.address}>${supplier.address} </td>
                                <td id=c${supplier.id}${supplier.phone_number}>${supplier.phone_number} </td>`;
                tr.appendChild(deleteButton);
                tr.appendChild(editButton)
                supplierList.appendChild(tr);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteSupplier(supplier));
                editButton.textContent = 'Editar'
                editButton.addEventListener('click', () => editSupplier(supplier, editButton));

            });
        })
        .catch(error => console.error('Erro:', error));
}

supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:3000/supplier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: autoIncrement, name: name, address: address, phone_number: phone }),
    })
        .then(response => response.json())
        .then(() => {
            listSuppliers();
            supplierForm.reset();
        })
        .catch(error => console.error('Erro:', error));
});

function editSupplier(supplier, btn) {
    const idElement = document.getElementById(`c${supplier.id}${supplier.id}`);
    const nameElement = document.getElementById(`c${supplier.id}${supplier.name}`);
    const addressElement = document.getElementById(`c${supplier.id}${supplier.address}`);
    const phoneElement = document.getElementById(`c${supplier.id}${supplier.phone_number}`);


    if (idElement && phoneElement) {
        if (supplier.name && nameElement === null) {
            console.error(`Elemento de nome para o cliente ${supplier.id} não foi encontrado.`);
            return;
        }

        if (supplier.address && addressElement === null) {
            console.error(`Elemento de address para o cliente ${supplier.id} não foi encontrado.`);
            return;
        }

        if (btn.textContent === 'Editar') {
            idElement.contentEditable = true;
            nameElement.contentEditable = true;
            addressElement.contentEditable = true;
            phoneElement.contentEditable = true;

            btn.textContent = 'Salvar';
        } else {
            idElement.id = `c${supplier.id}${supplier.id}`;
            nameElement.id = `c${supplier.id}${supplier.name}`;
            addressElement.id = `c${supplier.id}${supplier.address}`;
            phoneElement.id = `c${supplier.id}${supplier.phone_number}`;

            fetch(`http://localhost:3000/supplier/${supplier.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idElement.textContent,
                    name: nameElement.textContent,
                    address: addressElement.textContent,
                    phone_number: phoneElement.textContent
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar o cliente');
                    }
                    return response.json();
                })
                .then(updatedsupplier => {
                    idElement.contentEditable = false;
                    nameElement.contentEditable = false;
                    addressElement.contentEditable = false;
                    phoneElement.contentEditable = false;
                    btn.textContent = 'Editar';
                })
                .catch(error => console.error(error));
        }
    } else {
        console.error('Um ou mais elementos não foram encontrados.');
    }
}



function deleteSupplier(supplier) {
    fetch(`http://localhost:3000/supplier/${supplier.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
}

listSuppliers()