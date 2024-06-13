const categories = [
  {
    id: "1",
    icon: "bx bx-food-menu",
    name: "Menu Management",
    link: "/admin/menuManagement",
  },
  {
    id: "2",
    icon: "bx bxs-book-content",
    name: "Order Management",
    link: "/admin/orderManagement",
  },
  {
    id: "3",
    icon: "bx bxs-shopping-bag",
    name: "Inventory Management",
    link: "/admin/inventory",
  },
  {
    id: "4",
    icon: "bx bx-pie-chart-alt",
    name: "Sales Reporting",
    link: "/admin/salesReport",
  },
  {
    id: "5",
    icon: "bx bx-message",
    name: "Feedback",
    link: "/admin/viewFeedback",
  },
  {
    id: "6",
    icon: "bx bx-speaker",
    name: "Announcements",
    link: "/admin/announcements",
  },
  { id: "7", icon: "bx bx-log-out", name: "Log Out", link: "/logout" },
];
function initSidebar() {
  const currentUrl = window.location.pathname;
  const menuLinks = document.getElementById("js-menu-links");
  categories.forEach((cat) => {
    const linkPath = new URL(cat.link, window.location.origin).pathname;
    const isActive = currentUrl.endsWith(linkPath);
    const li = document.createElement("li");
    li.className = isActive ? "nav-link active" : "nav-link";
    li.innerHTML = `<a href="${cat.link}" class="${
      isActive ? "active" : ""
    }" id="${cat.id === "7" ? "logout-link" : ""}"><i class="${
      cat.icon
    }"></i> ${cat.name}</a>`;
    menuLinks.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSidebar();

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      fetch("/api/admins/logout", {
        method: "POST",
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("isAdminLoggedIn");
            localStorage.removeItem("admin");
            window.location.href = "/";
          } else {
            alert("Error logging out");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
});
