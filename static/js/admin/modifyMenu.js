document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("modify-menu-form");

  // Extract parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");
  const category = urlParams.get("category");

  // Fetch the menu item details and pre-fill the form
  async function fetchMenuItem() {
    try {
      const response = await fetch(`/api/menus/${category}/${itemId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const menuItem = await response.json();
      document.getElementById("menu-title").value = menuItem.title;
      document.getElementById("menu-description").value = menuItem.description;
      document.getElementById("menu-price").value = menuItem.price;
      document.getElementById("menu-category").value = category;
      document.getElementById("menu-id").value = itemId;
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  }

  fetchMenuItem();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const menuId = formData.get("id");
    const updatedFields = {};
    formData.forEach((value, key) => {
      if (value && key !== "id") {
        updatedFields[key] = value;
      }
    });

    const data = new FormData();
    Object.keys(updatedFields).forEach((key) => {
      data.append(key, updatedFields[key]);
    });

    try {
      const response = await fetch(`/api/menus/${category}/${menuId}`, {
        method: "PUT",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      alert("Menu modified successfully!");
      window.location.href = "/admin/menuManagement";
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to modify menu");
    }
  });
});
