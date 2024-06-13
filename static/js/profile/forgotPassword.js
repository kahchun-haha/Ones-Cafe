document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgot-password-form");
  forgotPasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("forgot-email").value;

    try {
      const response = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        alert("OTP sent to your email. Please check your email.");
        sessionStorage.setItem("resetEmail", email);
        window.location.href = `/resetPassword`;
      } else {
        const errorData = await response.json();
        alert(`Failed to send OTP: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  });
});
