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
      row.setAttribute("data-order-id", order._id); // Add data-order-id attribute to the row
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

    // Add event listeners to buttons
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
      const orderRow = document.querySelector(`tr[data-order-id="${orderId}"]`);
      if (orderRow) {
        orderRow.remove();
      }

      // Update the order index numbers
      updateOrderIndices();

      // Optionally, update the order history list if it is visible
      if (document.querySelector("#order-history-table-body")) {
        fetchOrderHistory(); // Refresh order history
      }
    } else {
      console.error("Failed to update order status");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


async function deleteOrder(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the order row from the table
      const orderRow = document.querySelector(`tr[data-order-id="${orderId}"]`);
      if (orderRow) {
        orderRow.remove();
      }

      // Update the order index numbers
      updateOrderIndices();
    } else {
      console.error("Failed to delete order");
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

document.addEventListener("DOMContentLoaded", fetchOrders);
