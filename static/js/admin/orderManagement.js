document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-bar");

  async function fetchOrders() {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      const orders = data.orders;
      const orderTableBody = document.getElementById("order-table-body");
      orderTableBody.innerHTML = "";

      orders.forEach((order, index) => {
        const itemDetails = order.items
          .map(
            (item) =>
              `<div><div class="item-title">${item.title}</div><div class="item-quantity">x ${item.quantity}</div></div>`
          )
          .join("");

        const row = document.createElement("tr");
        row.setAttribute("data-order-id", order._id);
        row.innerHTML = `
          <td class="order-index">${index + 1}</td>
          <td class="order-id">${order._id.slice(-8)}</td>
          <td class="item-details">${itemDetails}</td>
          <td>RM ${order.totalAmount.toFixed(2)}</td>
          <td>
            <button class="button1 order-update" data-order-id="${
              order._id
            }">Mark as Done</button>
            <button class="button1 order-delete" data-order-id="${
              order._id
            }">Cancel Order</button>
          </td>
        `;
        orderTableBody.appendChild(row);
      });

      document.querySelectorAll(".order-update").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const orderId = event.target.getAttribute("data-order-id");
          await updateOrderStatus(orderId, "done");
        });
      });

      document.querySelectorAll(".order-delete").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const orderId = event.target.getAttribute("data-order-id");
          await updateOrderStatus(orderId, "cancelled");
        });
      });

      filterOrders();
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Remove the order row from the table
        const orderRow = document.querySelector(
          `tr[data-order-id="${orderId}"]`
        );
        if (orderRow) {
          orderRow.remove();
        }

        updateOrderIndices();

        if (document.querySelector("#order-history-table-body")) {
          fetchOrderHistory();
        }

        // Refresh inventory data after marking order as done
        if (status === "done") {
          fetchInventory();
        }
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function updateOrderIndices() {
    const orderRows = document.querySelectorAll("#order-table-body tr");
    orderRows.forEach((row, index) => {
      const orderIndexCell = row.querySelector(".order-index");
      if (orderIndexCell) {
        orderIndexCell.textContent = index + 1;
      }
    });
  }

  async function fetchInventory() {
    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      const tableBody = document.getElementById("inventory-table-body");
      tableBody.innerHTML = "";

      data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${new Date(item.lastUpdated).toLocaleDateString()}</td>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  }

  function filterOrders() {
    const searchValue = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#order-table-body tr");
    rows.forEach((row) => {
      const orderId = row.querySelector(".order-id").textContent.toLowerCase();
      const itemDetails = row
        .querySelector(".item-details")
        .textContent.toLowerCase();
      const isVisible =
        orderId.includes(searchValue) || itemDetails.includes(searchValue);
      row.style.display = isVisible ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterOrders);

  fetchOrders();
  fetchInventory();
});
