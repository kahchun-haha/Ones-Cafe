document.addEventListener("DOMContentLoaded", function () {
  const menuElements = document.querySelector(".menu-elements");
  const categoryLinks = document.querySelectorAll(".category a");
  const searchInput = document.querySelector(".search-bar");
  let currentCategory = null;
  let menuData = [];

  async function fetchMenuData() {
    try {
      const response = await fetch("/api/menus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      menuData = await response.json();
      displayMenuItems(currentCategory);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  function displayMenuItems(category, searchTerm = "") {
    if (category === currentCategory) {
      category = null;
      currentCategory = null;
    } else {
      currentCategory = category;
    }

    let MenuHTML = "";
    menuData.forEach((cat) => {
      if (!category || cat.category === category) {
        cat.items.forEach((item) => {
          if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            MenuHTML += `<div class="container">
                      <div class="picture">
                          <img src="${item.image}" alt="${item.title}">
                      </div>
                      <div class="text">
                          <div class="title">
                              <div class="after-user-text">${item.title}</div>
                          </div>
                          <div class="description">
                              ${item.description}
                          </div>
                          <div class="inner-details">
                              <div class="category-for-menu-item"><i class='bx bx-category'></i> Category: ${cat.category}</div>
                              <div class="cost"><i class='bx bx-dollar-circle'></i> Price: RM ${item.price}</div>
                          </div>
                          <a href="/admin/modifyMenu?id=${item._id}&category=${cat.category}" class="modify-button">Modify</a>
                          <button class="delete-button" data-id="${item._id}" data-category="${cat.category}">Delete</button>
                      </div>
                  </div>`;
          }
        });
      }
    });
    menuElements.innerHTML = MenuHTML;

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  }

  async function handleDelete(event) {
    const itemId = event.target.getAttribute("data-id");
    const category = event.target.getAttribute("data-category");

    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log(
        `Deleting item with ID: ${itemId} from category: ${category}`
      );

      try {
        const response = await fetch(`/api/menus/${category}/${itemId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Item deleted successfully");
        fetchMenuData();
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    } else {
      console.log("Item deletion canceled");
    }
  }

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedCategory = e.target.getAttribute("data-category");
      displayMenuItems(selectedCategory);
    });
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    displayMenuItems(currentCategory, searchTerm);
  });

  fetchMenuData();
});
