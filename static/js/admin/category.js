const categories = [
  { id: "1", icon: "bx bx-food-menu", name: "Menu Management", link: "menu-management.html" },
  { id: "2", icon: "bx bxs-book-content", name: "Order Management", link: "order-management.html" },
  { id: "3", icon: "bx bxs-shopping-bag", name: "Inventory Management", link: "inventory.html" },
  { id: "4", icon: "bx bx-pie-chart-alt", name: "Sales reporting", link: "sales-report.html" },
  { id: "5", icon: "bx bx-log-out", name: "Log Out", link: "/templates/index.html" }
];

function initSidebar() {
  const currentUrl = window.location.pathname;
  const menuLinks = document.getElementById('js-menu-links');
  categories.forEach(cat => {
      const linkPath = new URL(cat.link, window.location.origin).pathname;
      const isActive = currentUrl.endsWith(linkPath);
      const li = document.createElement('li');
      li.className = isActive ? 'nav-link active' : 'nav-link';
      li.innerHTML = `<a href="${cat.link}" class="${isActive ? 'active' : ''}"><i class="${cat.icon}"></i> ${cat.name}</a>`;
      menuLinks.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", initSidebar);
