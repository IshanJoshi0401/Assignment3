const inventory = [];

document.getElementById('inventory-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (isNaN(id) || isNaN(price) || isNaN(quantity) || id === '' || name === '') {
        alert('Invalid product details. Please check and try again.');
        return;
    }

    inventory.push({ id, name, price, quantity });
    document.getElementById('inventory-form').reset();
    InventoryDisplay();
});

function InventoryDisplay() {
    const inventoryTableBody = document.getElementById('inventory').getElementsByTagName('tbody')[0];
    inventoryTableBody.innerHTML = '';

    inventory.forEach(function(item, index) {
        const row = inventoryTableBody.insertRow();
        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const priceCell = row.insertCell();
        const quantityCell = row.insertCell();
        const actionCell = row.insertCell();

        idCell.textContent = item.id;
        nameCell.textContent = item.name;
        priceCell.textContent = item.price.toFixed(2);
        quantityCell.textContent = item.quantity;
        actionCell.innerHTML = `
<button onclick="removeItem(${index})">Delete</button>
        `;
    });
}

function removeItem(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        inventory.splice(index, 1);
        InventoryDisplay();
    }
}

document.getElementById('Total_value').addEventListener('click', function() {
    let totalValue = 0;

    inventory.forEach(item => {
        totalValue += item.price * item.quantity;
    });

    document.getElementById('total-value').textContent = `Total Value: $${totalValue.toFixed(2)}`;
});

InventoryDisplay();