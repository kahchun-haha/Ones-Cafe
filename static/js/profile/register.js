document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register");
  const verifyOtpButton = document.getElementById("verify-otp");
  const otpField = document.getElementById("otp");

  if (registerButton) {
    registerButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (username && email && password) {
        try {
          const response = await fetch("/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
          if (response.ok) {
            alert("Verification OTP sent. Please check your email.");
            otpField.disabled = false;
            verifyOtpButton.disabled = false;
            registerButton.disabled = true;
          } else {
            const error = await response.json();
            alert(`Registration failed: ${error.message}`);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        }
      } else {
        alert("Please fill all the fields.");
      }
    });
  } else {
    console.error("Register button not found");
  }

  if (verifyOtpButton) {
    verifyOtpButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const otp = document.getElementById("otp").value;

      if (email && otp) {
        try {
          const response = await fetch("/api/users/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
          });
          if (response.ok) {
            alert("Email verified successfully. You can now log in.");
            window.location.href = "/login";
          } else {
            alert("OTP verification failed. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        }
      } else {
        alert("Please enter the OTP.");
      }
    });
  } else {
    console.error("Verify OTP button not found");
  }
});
