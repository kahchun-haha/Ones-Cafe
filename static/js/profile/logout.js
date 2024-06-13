document.addEventListener("DOMContentLoaded", function () {
  const logoutForm = document.getElementById("logoutForm");
  if (logoutForm) {
    logoutForm.addEventListener("submit", function (event) {
      event.preventDefault();
      fetch("/api/users/logout", {
        method: "POST",
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.ok) {
            // Clear localStorage
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            localStorage.removeItem("loyaltyPoints");
            // Redirect to home page after logout
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
