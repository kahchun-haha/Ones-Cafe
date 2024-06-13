function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  return isLoggedIn && user;
}

function getUserId() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.userId : null;
}

document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage();
  updateCartDisplay();
  loadUserVouchers();
});

let cartItems = [];
let appliedDiscount = 0;
let usedVouchers = [];

function loadCartFromLocalStorage() {
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
}

function updateCartDisplay() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = cartItems
    .map(
      (item, index) => `
      <div class="cart-item">
          <div class="item-details">
              <img src="${item.image}" alt="${item.title}" class="item-image">
              <div class="item-info">
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                  <p class="price">Price: RM ${item.price.toFixed(2)}</p>
              </div>
          </div>
          ${
            item.title !== "Ones Café Discount"
              ? `
          <div class="item-actions">
              <div class="quantity-container">
                  <button class="quantity-btn" onclick="changeItemQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
                  <input type="text" class="quantity-input" value="${item.quantity}" aria-labelledby="quantity-label-${index}">
                  <button class="quantity-btn" onclick="changeItemQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
                  <label id="quantity-label-${index}" class="visually-hidden">Quantity</label>
              </div>
          </div>
          `
              : ""
          }
      </div>
  `
    )
    .join("");

  calculateTotal();
}

function changeItemQuantity(index, change) {
  const newQuantity = cartItems[index].quantity + change;
  if (newQuantity > 0) {
    cartItems[index].quantity = newQuantity;
  } else {
    removeFromCart(index);
  }
  updateCartDisplay();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
}

function calculateTotal() {
  let subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  let discountAmount = subtotal * appliedDiscount;
  let serviceTax = calculateServiceTax(subtotal - discountAmount);
  let totalAmount = subtotal - discountAmount + serviceTax;

  document.getElementById("subtotal").innerText = `RM ${subtotal.toFixed(2)}`;
  document.getElementById(
    "discount"
  ).innerText = `- RM ${discountAmount.toFixed(2)}`;
  document.getElementById("tax").innerText = `RM ${serviceTax.toFixed(2)}`;
  document.getElementById("total").innerText = `RM ${totalAmount.toFixed(2)}`;
}

function calculateServiceTax(subtotal) {
  const taxRate = 0.06;
  return subtotal * taxRate;
}

function applyPromoCode() {
  const promoCodeInput = document.getElementById("promo-code");
  const promoCode = promoCodeInput.value;

  if (!checkAuth()) {
    alert("You are required to login first before applying a promo code.");
    window.location.href = "/login";
    return;
  }

  const userId = getUserId();

  fetch("/applyVoucher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, promocode: promoCode }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Voucher applied successfully") {
        appliedDiscount = data.discountPercentage;
        updateCartDisplay();
        alert("Promo code applied!");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));

  promoCodeInput.value = "";
}

async function confirmOrder() {
  if (!checkAuth()) {
    alert("You are required to login first before placing an order.");
    window.location.href = "/login";
    return;
  }

  const userId = getUserId();
  const orderData = {
    userId: userId,
    items: cartItems.map((item) => ({
      menuItemId: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    totalAmount: (subtotal() + calculateServiceTax(subtotal())).toFixed(2),
  };

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const data = await response.json();
      alert(
        `Order has been placed successfully. You have earned ${data.pointsEarned} points.`
      );

      // Fetch updated points from the server and update local storage
      const pointsResponse = await fetch(`/api/users/${userId}/points`);
      if (pointsResponse.ok) {
        const pointsData = await pointsResponse.json();
        const updatedUser = JSON.parse(localStorage.getItem("user")) || {};
        updatedUser.loyaltyPoints = pointsData.loyaltyPoints;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("loyaltyPoints", pointsData.loyaltyPoints);
      } else {
        console.error(
          "Failed to fetch updated points:",
          await pointsResponse.json()
        );
      }

      // Clear cart and redirect
      cartItems = [];
      updateCartDisplay();
      localStorage.removeItem("cartItems");
      window.location.href = "/menu";
    } else {
      const result = await response.json();
      alert(`${result.message}`);
    }
  } catch (error) {
    alert("Error placing order. Please try again.");
    console.error("Error:", error);
  }
}

function loadUserVouchers() {
  const userId = getUserId();
  fetch(`/getVouchers?userId=${userId}`, { method: "GET" })
    .then((response) => response.json())
    .then((vouchers) => {
      localStorage.setItem("vouchers", JSON.stringify(vouchers));
    })
    .catch((error) => console.error("Error fetching vouchers:", error));
}

function subtotal() {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
