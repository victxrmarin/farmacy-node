const saleForm = document.getElementById('sale-form')
const saleList= document.getElementById('sale-list')
var autoIncrement=1;


function listSales() {
    fetch('http://localhost:3000/sale')
        .then(response => response.json())
        .then(data => {
            saleList.innerHTML = '';
            data.forEach(sale => {
                autoIncrement = data.length + 1
                const li = document.createElement('li');
                li.innerHTML = `${sale.date} | ${sale.id_medicine} | ${sale.id_producer}`;
                const deleteButton = document.createElement('button');
                saleList.appendChild(li);
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deletesale(sale));
                li.appendChild(deleteButton);
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