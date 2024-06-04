document.addEventListener("DOMContentLoaded", () => {
  const initializeInventory = async () => {
    const userId = "60b8d6c9e1d2c3f4b5a4d5f6"; // Replace with actual user ID
    try {
      await fetch("/api/inventory/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      console.log("Inventory initialized successfully");
    } catch (error) {
      console.error("Failed to initialize inventory:", error);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      const inventory = data.inventory;

      // Sort inventory by date (newest first)
      inventory.sort((a, b) => new Date(b.date) - new Date(a.date));

      renderInventory(inventory);
      populateDropdown(inventory);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };
  
  const populateDropdown = (inventory) => {
    const uniqueItems = [...new Set(inventory.map(item => item.item_name))];

    const restockItemSelect = document.querySelector(".restock-item");
    restockItemSelect.innerHTML = "";
    uniqueItems.forEach(itemName => {
      const option = document.createElement("option");
      option.value = itemName;
      option.textContent = itemName;
      restockItemSelect.appendChild(option);
    });
  };

  const addInventory = async () => {
    const restockAmountInput = document.querySelector(".restock-amount");
    const restockItemSelect = document.querySelector(".restock-item");

    const item_name = restockItemSelect.value;
    const amount = parseInt(restockAmountInput.value, 10);
    const userId = "60b8d6c9e1d2c3f4b5a4d5f6"; // Use a valid ObjectId string

    try {
      await fetch("/api/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_name, amount, userId }),
      });

      await fetchInventory();
    } catch (error) {
      console.error("Failed to add inventory:", error);
    }
  };

  const searchInventory = async () => {
    const searchInput = document.querySelector(".search-bar");
    const searchTerm = searchInput.value.toLowerCase();

    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();

      const inventory = data.inventory;
      const filteredInventory = inventory.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm)
      );

      renderInventory(filteredInventory);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const renderInventory = (inventory) => {
    const inventoryTableBody = document.getElementById("inventory-table-body");
    inventoryTableBody.innerHTML = "";

    inventory.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${new Date(item.date).toLocaleString()}</td>
        <td>${item.userId ? item.userId._id : ''}</td>
        <td>${item.item_name}</td>
        <td>${item.amount}</td>
      `;
      inventoryTableBody.appendChild(row);
    });
  };

  document.querySelector(".search-button").addEventListener("click", searchInventory);

  document.querySelector(".restock-button").addEventListener("click", addInventory);

  initializeInventory();
  fetchInventory();
});
