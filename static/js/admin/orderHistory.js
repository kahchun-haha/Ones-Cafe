async function fetchOrderHistory() {
  try {
    // Fetch the order history
    const response = await fetch("/api/orders/historyTotal");
    const data = await response.json();
    const orders = data.orders;

    // Fetch the total order amount and the latest order amount with status "done"
    const response2 = await fetch("/api/orders/totalAmount");
    const data2 = await response2.json();
    const totalAmount = data2.totalAmount;
    const latestOrderAmount = data2.latestOrderAmount;

    // Fetch the order counts by status
    const response3 = await fetch("/api/orders/statusCounts");
    const data3 = await response3.json();
    const doneCount = data3.doneCount;
    const cancelledCount = data3.cancelledCount;

    // Update the total earnings in the HTML
    const totalAmountElement = document.querySelector(".total-money");
    totalAmountElement.innerHTML = `RM ${totalAmount.toFixed(2)}`;

    // Update the latest order amount in the HTML
    const latestOrderElement = document.querySelector(
      ".latest-order-money .text"
    );
    latestOrderElement.innerHTML = `
      <img class="plus-button" src="/images/admin/plus.png" alt="">
      Latest Order: + RM ${latestOrderAmount.toFixed(2)}
    `;

    // Update the order counts in the HTML
    const acceptedOrdersElement = document.querySelector(".total-ord.accepted");
    const declinedOrdersElement = document.querySelector(".total-ord.declined");
    acceptedOrdersElement.innerHTML = `
      <img class="plus-button" src="/images/admin/icons8-arrow-up-40.png" alt="">
      ${doneCount} accepted
    `;
    declinedOrdersElement.innerHTML = `
      <img class="plus-button" src="/images/admin/icons8-arrow-down-40.png" alt="">
      ${cancelledCount} declined
    `;

    // Function to render orders
    const renderOrders = (ordersToRender) => {
      const orderHistoryTableBody = document.getElementById(
        "order-history-table-body"
      );
      orderHistoryTableBody.innerHTML = "";

      ordersToRender.forEach((order, index) => {
        const itemDetails = order.items
          .map(
            (item) =>
              `<div><div class="item-title">${item.title}</div><div class="item-quantity">x ${item.quantity}</div></div>`
          )
          .join("");

        const statusClass = `status-${order.status}`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="order-id">${order._id.slice(-8)}</td>
            <td class="item-details">${itemDetails}</td>
            <td>RM ${order.totalAmount.toFixed(2)}</td>
            <td class="${statusClass}">${
          order.status.charAt(0).toUpperCase() + order.status.slice(1)
        }</td>
          `;
        orderHistoryTableBody.appendChild(row);
      });
    };

    // Initial render
    renderOrders(orders);

    // Search functionality
    const searchInput = document.querySelector(".search-bar");

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredOrders = orders.filter((order) =>
        order.items.some((item) =>
          item.title.toLowerCase().includes(searchTerm)
        )
      );
      renderOrders(filteredOrders);
    });

    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const status = button.getAttribute("data-status");
        const filteredOrders =
          status === "all"
            ? orders
            : orders.filter((order) => order.status === status);
        renderOrders(filteredOrders);
      });
    });
  } catch (error) {
    console.error("Failed to fetch order history:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchOrderHistory);

document.addEventListener("DOMContentLoaded", function () {
  // Fetch low stock items
  fetch("/api/inventory-low-stock")
    .then((response) => response.json())
    .then((data) => {
      const lowStockContainer = document.getElementById("inventory-low-stock");
      lowStockContainer.innerHTML = "";

      if (data.length === 0) {
        lowStockContainer.innerHTML = "<div>No low stock items found.</div>";
      } else {
        data.forEach((item) => {
          const stockItem = document.createElement("div");
          stockItem.className = "stock-item";
          stockItem.innerHTML = `
            <div class="stock-name">${item.title}</div>
            <div class="count">${item.quantity}</div>
          `;
          lowStockContainer.appendChild(stockItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching low stock items:", error));
});
