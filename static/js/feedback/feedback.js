async function checkAuth() {
  try {
    const response = await fetch("/api/users/check-auth", {
      credentials: "same-origin",
    });
    if (response.status === 200) {
      return true;
    } else {
      alert("You must be logged in to submit feedback.");
      window.location.href = "/login";
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Handling the center button click event
  const centerButton = document.querySelector(".center_btn");
  if (centerButton) {
    centerButton.addEventListener("click", async function () {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) return;

      let fullName = $("#fullName").val();
      let email = $("#email").val();

      console.log("Full Name:", fullName);
      console.log("Email:", email);

      if (fullName === "" || email === "") {
        alert("Incomplete data");
        return;
      }

      $.ajax({
        method: "post",
        data: { fullName: fullName, email: email },
        url: "/contact",
        success: function (res) {
          if (res == 1) {
            alert("Thank you for your response, we will contact you soon!!!");
            location.reload();
          } else {
            alert("Error");
          }
        },
      });
    });
  }

  const buttons = document.querySelectorAll(".footer_btn");

  if (buttons.length > 0) {
    // Handling suggestions submission
    buttons[0].addEventListener("click", async function () {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) return;

      let request = $("#suggestion").val();

      console.log("Request:", request);

      if (request === "") {
        alert("Incomplete data");
        return;
      }

      $.ajax({
        method: "post",
        data: { request: request },
        url: "/suggestions",
        success: function (res) {
          if (res == 1) {
            alert("Thank you for your response");
            location.reload();
          } else {
            alert("Error");
          }
        },
      });
    });

    // Handling issue reporting
    buttons[1].addEventListener("click", async function () {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) return;

      let experiencing = $("#experiencing").val();
      let email = $("#issue-email").val();
      console.log("Experiencing:", experiencing);
      console.log("Email:", email);

      if (experiencing === "" || email === "") {
        alert("Incomplete data");
        return;
      }

      $.ajax({
        method: "post",
        data: { experiencing: experiencing, email: email },
        url: "/issue",
        success: function (res) {
          if (res == 1) {
            alert("Thank you for your response");
            location.reload();
          } else {
            alert("Error");
          }
        },
      });
    });
  }

  function setupStars() {
    const stars = document.querySelectorAll(".stars img");
    let currentRating = 0;

    stars.forEach((star, index) => {
      star.addEventListener("mouseover", function () {
        fillStars(index + 1);
      });

      star.addEventListener("mouseout", function () {
        fillStars(currentRating);
      });

      star.addEventListener("click", async function () {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) return;

        currentRating = index + 1;
        fillStars(currentRating);

        $.ajax({
          method: "post",
          url: "/review",
          data: { ratings: currentRating },
          success: function (res) {
            if (res == 1) {
              alert("Thank you for your ratings!!!");
              location.reload();
            } else {
              alert("Error");
            }
          },
        });
      });
    });

    function fillStars(rating) {
      for (let i = 0; i < rating; i++) {
        stars[i].src = "/images/feedback/starfilled.png";
      }
      for (let i = rating; i < stars.length; i++) {
        stars[i].src = "/images/icons/star.svg";
      }
    }
  }

  setupStars();
});
