const customerForm = document.getElementById('customer-form')
const customerList = document.getElementById('customer-list')
var autoIncrement = 1;


function listCustomers() {
    fetch('http://localhost:3000/customer')
        .then(response => response.json())
        .then(data => {
            customerForm.reset();
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');
            customerList.innerHTML = '';
            data.forEach(customer => {
                autoIncrement = data.length + 1
                const deleteButton = document.createElement('button');
                const editButton = document.createElement('button');
                const tr = document.createElement('tr');
                tr.innerHTML = `<td id=c${customer.id}${customer.id}>${customer.id} </td>
                                <td id=c${customer.id}${customer.name}>${customer.name} </td>
                                <td id=c${customer.id}${customer.email}>${customer.email} </td>
                                <td id=c${customer.id}${customer.phone_number}>${customer.phone_number} </td>`;
                tr.appendChild(deleteButton);
                tr.appendChild(editButton)
                customerList.appendChild(tr);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteCustomer(customer));
                editButton.textContent = 'Editar'
                editButton.addEventListener('click', () => editCustomer(customer, editButton));

            });
        })
        .catch(error => console.error('Erro:', error));
}

customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:3000/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: autoIncrement, name: name, email: email, phone_number: phone }),
    })
        .then(response => response.json())
        .then(() => {
            listCustomers();
            customerForm.reset();
        })
        .catch(error => console.error('Erro:', error));
});

function editCustomer(customer, btn) {
    const idElement = document.getElementById(`c${customer.id}${customer.id}`);
    const nameElement = document.getElementById(`c${customer.id}${customer.name}`);
    const emailElement = document.getElementById(`c${customer.id}${customer.email}`);
    const phoneElement = document.getElementById(`c${customer.id}${customer.phone_number}`);

    // Verificar se todos os elementos foram encontrados
    if (idElement && phoneElement) {
        // Verificar se o ID do elemento 'name' é válido
        if (customer.name && nameElement === null) {
            console.error(`Elemento de nome para o cliente ${customer.id} não foi encontrado.`);
            return;
        }

        // Verificar se o ID do elemento 'email' é válido
        if (customer.email && emailElement === null) {
            console.error(`Elemento de email para o cliente ${customer.id} não foi encontrado.`);
            return;
        }

        if (btn.textContent === 'Editar') {
            // Tornar os elementos editáveis
            idElement.contentEditable = true;
            nameElement.contentEditable = true;
            emailElement.contentEditable = true;
            phoneElement.contentEditable = true;

            btn.textContent = 'Salvar';
        } else {
            // Atualizar os IDs dos elementos com os novos dados do cliente
            idElement.id = `c${customer.id}${customer.id}`;
            nameElement.id = `c${customer.id}${customer.name}`;
            emailElement.id = `c${customer.id}${customer.email}`;
            phoneElement.id = `c${customer.id}${customer.phone_number}`;

            // Enviar a requisição PUT para atualizar o cliente
            fetch(`http://localhost:3000/customer/${customer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idElement.textContent,
                    name: nameElement.textContent,
                    email: emailElement.textContent,
                    phone_number: phoneElement.textContent
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o cliente');
                }
                return response.json();
            })
            .then(updatedCustomer => {
                // Desabilitar a edição dos elementos
                idElement.contentEditable = false;
                nameElement.contentEditable = false;
                emailElement.contentEditable = false;
                phoneElement.contentEditable = false;
                btn.textContent = 'Editar';
            })
            .catch(error => console.error(error));
        }
    } else {
        console.error('Um ou mais elementos não foram encontrados.');
    }
}




function deleteCustomer(customer) {
    fetch(`http://localhost:3000/customer/${customer.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
}

listCustomers()