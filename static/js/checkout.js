document.addEventListener("DOMContentLoaded", function() {
  loadCartFromLocalStorage();
  updateCartDisplay();
});

let cartItems = [];

function loadCartFromLocalStorage() {
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
}

function updateCartDisplay() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = cartItems.map((item, index) => `
    <div class="cart-item">
      <div class="item-details">
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">Price: RM ${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="item-actions">
        <div class="quantity-container">
          <button class="quantity-btn" onclick="changeItemQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
          <input type="text" class="quantity-input" value="${item.quantity}" aria-labelledby="quantity-label-${index}">
          <button class="quantity-btn" onclick="changeItemQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
          <label id="quantity-label-${index}" class="visually-hidden">Quantity</label>
        </div>
      </div>
    </div>
  `).join("");

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
  let subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  let serviceTax = calculateServiceTax(subtotal);
  let totalAmount = subtotal + serviceTax;

  document.getElementById("subtotal").innerText = `RM ${subtotal.toFixed(2)}`;
  document.getElementById("tax").innerText = `RM ${serviceTax.toFixed(2)}`;
  document.getElementById("total").innerText = `RM ${totalAmount.toFixed(2)}`;
}

function calculateServiceTax(subtotal) {
  const taxRate = 0.06;
  return subtotal * taxRate;
}

function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value;
  const validPromoCode = "10%OnesCafe";
  if (promoCode === validPromoCode) {
    const discount = subtotal() * 0.1;
    cartItems.push({
      image: "/static/images/checkout/Discount.webp",
      name: "One Cafes Discount",
      description: "Opening Special Discount",
      price: -discount
    });

    // Set quantity of all items in the cart to 1
    cartItems.forEach(item => {
      item.quantity = 1;
    });

    updateCartDisplay();
    alert("Promo code applied!");
  } else {
    alert("Invalid promo code");
  }
}

function confirmOrder() {
  console.log("Order confirmed", cartItems);
  alert("Order has been placed successfully.");
  
  // Clear the cartItems array
  cartItems = [];

  // Update the cart display to reflect the changes
  updateCartDisplay();

  // Clear the cartItems from local storage
  localStorage.removeItem('cartItems');

  // Redirect to menu page
  window.location.href = "/templates/menu.html";
}



function subtotal() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}