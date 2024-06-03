async function fetchOrderHistory() {
  try {
    const response = await fetch("/api/orders/history");
    const data = await response.json();
    const orders = data.orders;
    const orderHistoryTableBody = document.getElementById(
      "order-history-table-body"
    );
    orderHistoryTableBody.innerHTML = "";

    orders.forEach((order, index) => {
      const itemDetails = order.items
        .map(
          (item) =>
            `<div><div class="item-title">${item.title}</div><div class="item-quantity">x ${item.quantity}</div></div>`
        )
        .join("");

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td class="order-id">${order._id.slice(-8)}</td>
          <td class="item-details">${itemDetails}</td>
          <td>RM ${order.totalAmount.toFixed(2)}</td>
          <td> ${order.status}</td>
        `;
      orderHistoryTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to fetch order history:", error);
  }
}


document.addEventListener("DOMContentLoaded", fetchOrderHistory);
