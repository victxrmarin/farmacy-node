const customerForm = document.getElementById('customer-form')
const customerList= document.getElementById('customer-list')
var autoIncrement;


function listCustomers() {
    fetch('http://localhost:3000/customer')
        .then(response => response.json())
        .then(data => {
            customerList.innerHTML = '';
            data.forEach(customer => {
                autoIncrement = data.length + 1
                const li = document.createElement('li');
                li.innerHTML = `${customer.name} | ${customer.email} | ${customer.phone_number}`;
                const deleteButton = document.createElement('button');
                customerList.appendChild(li);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteCustomer(customer));
                li.appendChild(deleteButton);
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
        body: JSON.stringify({id: autoIncrement, name: name, email: email, phone_number: phone }),
    })
    .then(response => response.json())
    .then(() => {
        listCustomers();
        customerForm.reset();
    })
    .catch(error => console.error('Erro:', error));
});

function deleteCustomer(customer){
    fetch(`http://localhost:3000/customer/${customer.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
}

listCustomers()