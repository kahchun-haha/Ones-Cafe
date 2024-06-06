document.addEventListener("DOMContentLoaded", function () {
  const verifyOtpButton = document.getElementById("verify-otp-forgot-password");
  const resetPasswordButton = document.getElementById("reset-password");
  const otpField = document.getElementById("otp");
  const newPasswordField = document.getElementById("new-password");
  const confirmPasswordField = document.getElementById("confirm-password");

  const email = sessionStorage.getItem("resetEmail");

  if (!email) {
    alert("Invalid request. Email not found.");
    return;
  }

  verifyOtpButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const otp = otpField.value;

    if (otp) {
      try {
        const response = await fetch("/api/users/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
          alert("OTP verified successfully. You can now reset your password.");
          newPasswordField.disabled = false;
          confirmPasswordField.disabled = false;
          resetPasswordButton.disabled = false;
          verifyOtpButton.disabled = true;
          otpField.disabled = true;
        } else {
          alert("OTP verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please enter the OTP.");
    }
  });

  resetPasswordButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const newPassword = newPasswordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      try {
        const response = await fetch("/api/users/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        });

        if (response.ok) {
          alert("Password reset successfully. You can now log in.");
          window.location.href = "/login";
        } else {
          alert("Password reset failed. Please try again.");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  });
});
