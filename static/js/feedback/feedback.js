const centerButton = document.querySelector('.center_btn');

centerButton.addEventListener('click', function () {
    let fullName = $("#fullName").val();
    let phoneNumber = $("#phoneNumber").val();

    if (fullName === "" || phoneNumber === "") {
        alert("incomplete data");
        return;
    }

    $.ajax({
        method: 'post',
        data: { "fullName": fullName, "phoneNumber": phoneNumber },
        url: '/contact', // This should match the route defined in feedbackRoutes.js
        success: function (res) {
            if (res == 1) {
                alert('Thank you for your response, we will contact you soon!!!');
                location.reload();
            } else {
                alert('Error');
            }
        }
    })
});
    

const buttons = document.querySelectorAll('.footer_btn');

buttons[0].addEventListener('click', function () {
    let request = $("#Suggestion").val();

    if (request === "") {
        alert("incomplete data");
        return;
    }

    $.ajax({
        method: 'post',
        data: { "request": request },
        url: '/suggestions', // Updated URL
        success: function (res) {
            if (res == 1) {
                alert('Thank you for your response');
                location.reload();
            } else {
                alert('Error');
            }
        }
    })
});

buttons[1].addEventListener('click', function () {
    let experiencing = $("#Report").val();
    let email = $("#email").val();

    if (experiencing === "" || email === "") {
        alert("incomplete data");
        return;
    }

    $.ajax({
        method: 'post',
        data: { "experiencing": experiencing, "email": email },
        url: '/issue', // Updated URL
        success: function (res) {
            if (res == 1) {
                alert('Thank you for your response');
                location.reload();
            } else {
                alert('Error');
            }
        }
    })
});

function setupStars() {
    const stars = document.querySelectorAll('.stars img');

    stars.forEach((star, index) => {
        // Handle mouseover event for each star
        star.addEventListener('mouseover', function () {
            fillStars(index + 1);
        });

        // Reset the stars to the current rating on mouseout
        star.addEventListener('mouseout', function () {
            fillStars(currentRating);
        });

        // Handle click event for each star
        star.addEventListener('click', function () {
            currentRating = index + 1; // Update the current rating
            fillStars(currentRating);

            $.ajax({
                method: 'post',
                url: '/review', // Updated URL
                data: { ratings: currentRating },
                success: function (res) {
                    if (res == 1) {
                        alert('Thank you for your ratings!!!');
                        location.reload();
                    } else {
                        alert('Error');
                    }
                }
            })
        });
    });

    // Keeps track of the current rating
    let currentRating = 0;

    // Function to fill the stars up to the specified rating
    function fillStars(rating) {
        for (let i = 0; i < rating; i++) {
            stars[i].src = "/images/feedback/starfilled.png";
        }
        for (let i = rating; i < stars.length; i++) {
            stars[i].src = "/images/icons/star.svg";
        }
    }
}

// Initialize the star rating functionality
document.addEventListener('DOMContentLoaded', setupStars);
