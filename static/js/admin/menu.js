document.addEventListener("DOMContentLoaded", function () {
  const menuElements = document.querySelector(".menu-elements");
  const categoryLinks = document.querySelectorAll(".category a");
  let currentCategory = null;

  function displayMenuItems(category) {
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
          MenuHTML += `<div class="container">
                      <div class="picture">
                          <img src="${item.image}" alt="${item.name}">
                      </div>
                      <div class="text">
                          <div class="title">
                              <div class="after-user-text">${item.name}</div>
                          </div>
                          <div class="description">
                              ${item.description}
                          </div>
                          <div class="inner-details">
                              <div class="category-for-menu-item"><i class='bx bx-category'></i> Category: ${cat.category}</div>
                              <div class="cost"><i class='bx bx-dollar-circle'></i> Price: ${item.price}</div>
                          </div>
                          <a href="/templates/admin/change-menu.html" class="read-more">Change</a>
                      </div>
                  </div>`;
        });
      }
    });
    menuElements.innerHTML = MenuHTML;
  }

  displayMenuItems();

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedCategory = e.target.getAttribute("data-category");
      displayMenuItems(selectedCategory);
    });
  });
});
