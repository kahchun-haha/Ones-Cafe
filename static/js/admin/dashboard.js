const categories = [
  { id: "1", icon: "bx bx-food-menu", name: "Menu Management", link: "/admin/menuManagement" },
  { id: "2", icon: "bx bxs-book-content", name: "Order Management", link: "/admin/orderManagement" },
  { id: "3", icon: "bx bxs-shopping-bag", name: "Inventory Management", link: "/admin/inventory" },
  { id: "4", icon: "bx bx-pie-chart-alt", name: "Sales reporting", link: "/admin/salesReport" },
  { id: "5", icon: "bx bx-log-out", name: "Log Out", link: "/" }
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
