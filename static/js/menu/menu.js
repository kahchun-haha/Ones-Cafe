document.addEventListener("DOMContentLoaded", function () {
  function createMenuItem(item) {
    return `
        <div class="box">
            <div class="image">
                <img src="${item.image}" alt="">
            </div>
            <div class="content">
                <h3>${item.name.toLowerCase()}</h3>
                <p>${item.description}</p>
                <a href="#" class="btn">Add to cart</a>
                <span class="price">${item.price}</span>
            </div>
        </div>
    `;
  }

  function renderMenu() {
    const container = document.getElementById("menuContainer");
    menuData.forEach((category) => {
      let itemsHTML = category.items.map(createMenuItem).join("");
      let categoryHTML = `
            <section class="${category.category.toLowerCase()}" id="${category.category.toLowerCase()}">
                <div class="menu">
                    <h1 class="heading">${category.category.toLowerCase()}</h1>
                    <div class="box-container">
                        ${itemsHTML}
                    </div>
                </div>
            </section>
        `;
      container.innerHTML += categoryHTML;
    });
  }

  renderMenu();

  let menu = document.querySelector(".menu-navbar");
  let navbar = document.querySelector(".categories");

  menu.onclick = () => {
    navbar.classList.toggle("active");
  };

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".menu-navbar .categories a");

  window.onscroll = () => {
    navbar.classList.remove("active");

    menu.style.display = window.scrollY > 5 ? "flex" : "none";

    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        let activeLink = document.querySelector(
          ".menu-navbar .categories a[href='#" + id + "']"
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  let modal = document.getElementById("order-modal");
  let modalTitle = modal.querySelector("h3");
  let modalDescription = modal.querySelector("p");
  let quantityInput = document.getElementById("quantity-input");
  let addToCartButton = document.querySelector(".add-to-cart-btn");
  let closeButton = document.querySelector(".close-btn");
  let increaseButton = document.getElementById("increase-quantity");
  let decreaseButton = document.getElementById("decrease-quantity");

  function updateQuantity(change) {
    let currentQuantity = parseInt(quantityInput.value);
    let newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      quantityInput.value = newQuantity;
    }
  }

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let item = btn.closest(".box");
      let itemName = item.querySelector("h3").textContent;
      let itemDescription = item.querySelector("p").textContent;
      let itemPrice = item.querySelector(".price").textContent;
      let itemImage = item.querySelector(".image img").src;

      modalTitle.textContent = itemName;
      modalDescription.textContent = itemDescription;
      document.getElementById("modalPrice").textContent = itemPrice;
      document.getElementById("modalImage").src = itemImage;

      modal.style.display = "block";
    });
  });

  addToCartButton.addEventListener("click", function (event) {
    event.preventDefault();
    let itemName = modalTitle.textContent;
    let itemQuantity = parseInt(quantityInput.value);
    let itemDescription = modalDescription.textContent;
    let itemPrice = parseFloat(
      document.getElementById("modalPrice").textContent.replace(/[^\d.]/g, "")
    );
    let itemImage = document.getElementById("modalImage").src;

    let cartItem = {
      name: itemName,
      description: itemDescription,
      quantity: itemQuantity,
      price: itemPrice,
      image: itemImage,
    };

    addToLocalStorage(cartItem);

    alert(itemQuantity + " x " + itemName + " added to the cart");
    modal.style.display = "none";
    quantityInput.value = 1;
    document.getElementById("Instructions").value = "";
  });

  function addToLocalStorage(item) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  closeButton.onclick = () => {
    modal.style.display = "none";
    quantityInput.value = 1;
    document.getElementById("Instructions").value = "";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  increaseButton.addEventListener("click", () => updateQuantity(1));
  decreaseButton.addEventListener("click", () => updateQuantity(-1));
});
