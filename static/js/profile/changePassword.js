document.addEventListener("DOMContentLoaded", function () {
  const oldPasswordInput = document.getElementById("old-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const checkOldPasswordButton = document.getElementById(
    "check-old-password-button"
  );
  const changePasswordButton = document.getElementById(
    "change-password-button"
  );

  checkOldPasswordButton.addEventListener("click", async function () {
    const oldPassword = oldPasswordInput.value;

    try {
      const response = await fetch("/api/users/check-old-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword: oldPassword }),
      });

      if (response.ok) {
        alert("Old password is correct. You can now enter a new password.");
        newPasswordInput.readOnly = false;
        confirmPasswordInput.readOnly = false;
        changePasswordButton.disabled = false;
        checkOldPasswordButton.disabled = true;
      } else {
        const errorData = await response.json();
        alert(`Failed to verify old password: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error verifying old password:", error);
      alert("Error verifying old password. Please try again.");
    }
  });

  document
    .getElementById("change-password-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("/api/users/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        });

        if (response.ok) {
          alert("Password changed successfully");
          window.location.href = "/profile";
        } else {
          const errorData = await response.json();
          alert(`Failed to change password: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error changing password:", error);
        alert("Error changing password. Please try again.");
      }
    });
});
