async function fetchOrders() {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      const orders = data.orders;
      const orderTableBody = document.getElementById('order-table-body');
      orderTableBody.innerHTML = '';

      orders.forEach((order, index) => {
        const itemDetails = order.items.map(item =>
          `<div><div class="item-title">${item.title}</div><div class="item-quantity">x ${item.quantity}</div></div>`
        ).join('');

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td class="order-id">${order._id.slice(-8)}</td>
          <td class="item-details">${itemDetails}</td>
          <td>RM ${order.totalAmount.toFixed(2)}</td>
          <td>
            <button class="button1 order-update">Mark as Done</button>
            <button class="button1 order-delete">Cancel Order</button>
          </td>
        `;
        orderTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchOrders);