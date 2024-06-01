document.addEventListener("DOMContentLoaded", function () {
  async function fetchMenuData() {
    try {
      const response = await fetch("/api/menus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const menuData = await response.json();
      renderMenu(menuData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  function createMenuItem(item) {
    return `
            <div class="box">
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="btn" aria-label="Add ${item.name} to cart">Add to cart</button>
                    <span class="price">${item.price}</span>
                </div>
            </div>
        `;
  }

  function renderMenu(menuData) {
    const container = document.getElementById("menuContainer");
    container.innerHTML = ""; // Clear any existing content
    menuData.forEach((category) => {
      const itemsHTML = category.items.map(createMenuItem).join("");
      const categoryID = category.category.toLowerCase().replace(" ", "-");
      const categoryHTML = `
                <section class="${categoryID}" id="${categoryID}">
                    <div class="menu">
                        <h1 class="heading">${category.category}</h1>
                        <div class="box-container">
                            ${itemsHTML}
                        </div>
                    </div>
                </section>
            `;
      container.innerHTML += categoryHTML;
    });

    attachModalHandlers();
  }

  function attachModalHandlers() {
    const modal = document.getElementById("order-modal");
    const modalTitle = modal.querySelector("h3");
    const modalDescription = modal.querySelector("p");
    const quantityInput = document.getElementById("quantity-input");
    const addToCartButton = document.querySelector(".add-to-cart-btn");
    const closeButton = document.querySelector(".close-btn");
    const increaseButton = document.getElementById("increase-quantity");
    const decreaseButton = document.getElementById("decrease-quantity");

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
        const item = btn.closest(".box");
        const itemName = item.querySelector("h3").textContent;
        const itemDescription = item.querySelector("p").textContent;
        const itemPrice = item.querySelector(".price").textContent;
        const itemImage = item.querySelector(".image img").src;

        modalTitle.textContent = itemName;
        modalDescription.textContent = itemDescription;
        document.getElementById("modalPrice").textContent = itemPrice;
        document.getElementById("modalImage").src = itemImage;

        modal.style.display = "block";
      });
    });

    addToCartButton.addEventListener("click", function (event) {
      event.preventDefault();
      const itemName = modalTitle.textContent;
      const itemQuantity = parseInt(quantityInput.value);
      const itemDescription = modalDescription.textContent;
      const itemPrice = parseFloat(
        document.getElementById("modalPrice").textContent.replace(/[^\d.]/g, "")
      );
      const itemImage = document.getElementById("modalImage").src;

      const cartItem = {
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
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        cart.push(item);
      }

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
  }

  fetchMenuData();

  // Add smooth scroll for navbar links
  const navLinks = document.querySelectorAll(".menu-navbar .categories a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    });
  });

  const menu = document.querySelector(".menu-navbar");
  window.onscroll = () => {
    menu.style.display = window.scrollY > 5 ? "flex" : "none";

    // Highlight the active section link
    const sections = document.querySelectorAll("section");
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
});
