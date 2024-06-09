document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/inventory')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('inventory-table-body');
      tableBody.innerHTML = '';

      data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td><input type="number" class="restock-amount" placeholder="Amount" data-id="${item._id}"></td>
          <td><input type="number" class="decrease-amount" placeholder="Amount" data-id="${item._id}"></td>
          <td>
            <button class="restock-button" onclick="updateStock('${item._id}', 'increase')">Restock</button>
            <button class="decrease-button" onclick="updateStock('${item._id}', 'decrease')">Decrease</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    });

  window.updateStock = function(itemId, action) {
    const quantityInput = document.querySelector(`input.${action === 'increase' ? 'restock-amount' : 'decrease-amount'}[data-id='${itemId}']`);
    const quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    fetch(`/api/inventory/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: action === 'increase' ? quantity : -quantity })
    })
    .then(response => response.json())
    .then(() => {
      alert('Inventory updated!');
      location.reload(); // Reload to update the table
    })
    .catch(error => console.error('Error updating inventory:', error));
  };

  // Search filter function
  window.filterInventory = function() {
    const searchValue = document.querySelector('.search-bar').value.toLowerCase();
    const rows = document.querySelectorAll('#inventory-table-body tr');
    rows.forEach(row => {
      const isVisible = row.cells[1].textContent.toLowerCase().includes(searchValue);
      row.style.display = isVisible ? '' : 'none';
    });
  };

  // Attach event listener to search bar
  const searchInput = document.querySelector('.search-bar');
  searchInput.addEventListener('input', window.filterInventory);
});
