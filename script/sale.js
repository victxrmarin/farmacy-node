const saleForm = document.getElementById('sale-form')
const saleList= document.getElementById('sale-list')
var autoIncrement=1;


function listSales() {
    fetch('http://localhost:3000/sale')
        .then(response => response.json())
        .then(data => {
            saleForm.reset();
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');
            saleList.innerHTML = '';
            data.forEach(sale => {
                autoIncrement = data.length + 1
                const deleteButton = document.createElement('button');
                const editButton = document.createElement('button');
                const tr = document.createElement('tr');
                tr.innerHTML = `<td id=c${sale.id}${sale.id}>${sale.id} </td>
                                <td id=c${sale.id}${sale.date}>${sale.date} </td>
                                <td id=c${sale.id}${sale.id_customer}>${sale.id_customer} </td>
                                <td id=c${sale.id}${sale.id_medicine}>${sale.id_medicine} </td>`;
                tr.appendChild(deleteButton);
                tr.appendChild(editButton)
                saleList.appendChild(tr);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteSale(sale));
                editButton.textContent = 'Editar'
                editButton.addEventListener('click', () => editSale(sale, editButton));

            });
        })
        .catch(error => console.error('Erro:', error));
}

saleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const id_medicine = document.getElementById('id_medicine').value;
    const id_customer = document.getElementById('id_customer').value;

    fetch('http://localhost:3000/sale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: autoIncrement, date: date, id_medicine: id_medicine, id_customer: id_customer}),
    })
    .then(response => response.json())
    .then(() => {
        listSales();
        saleForm.reset();
    })
    .catch(error => console.error('Erro:', error));
});

function editSale(sale, btn) {
    const idElement = document.getElementById(`c${sale.id}${sale.id}`);
    const dateElement = document.getElementById(`c${sale.id}${sale.date}`);
    const idCustomerElement = document.getElementById(`c${sale.id}${sale.id_customer}`);
    const idMedicineElement = document.getElementById(`c${sale.id}${sale.id_medicine}`);


    if (idElement && idMedicineElement) {
        if (sale.date && dateElement === null) {
            console.error(`Elemento de nome para o cliente ${sale.id} não foi encontrado.`);
            return;
        }

        if (sale.address && idCustomerElement === null) {
            console.error(`Elemento de address para o cliente ${sale.id} não foi encontrado.`);
            return;
        }

        if (btn.textContent === 'Editar') {
            idElement.contentEditable = true;
            dateElement.contentEditable = true;
            idCustomerElement.contentEditable = true;
            idMedicineElement.contentEditable = true;

            btn.textContent = 'Salvar';
        } else {
            idElement.id = `c${sale.id}${sale.id}`;
            dateElement.id = `c${sale.id}${sale.date}`;
            idCustomerElement.id = `c${sale.id}${sale.id_customer}`;
            idMedicineElement.id = `c${sale.id}${sale.id_medicine}`;

            fetch(`http://localhost:3000/sale/${sale.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idElement.textContent,
                    date: dateElement.textContent,
                    address: idCustomerElement.textContent,
                    id_medicine: idMedicineElement.textContent
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar o cliente');
                    }
                    return response.json();
                })
                .then(updatedsale => {
                    idElement.contentEditable = false;
                    dateElement.contentEditable = false;
                    idCustomerElement.contentEditable = false;
                    idMedicineElement.contentEditable = false;
                    btn.textContent = 'Editar';
                })
                .catch(error => console.error(error));
        }
    } else {
        console.error('Um ou mais elementos não foram encontrados.');
    }
}


function deleteSale(sale){
    fetch(`http://localhost:3000/sale/${sale.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
}

listSales()