document
  .getElementById("add-menu-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch("/api/menus", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Menu added successfully!");
        window.location.href = "/admin/menuManagement";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add menu");
      });
  });
