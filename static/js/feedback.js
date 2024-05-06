const centerButton = document.querySelector('.center_btn');

    centerButton.addEventListener('click', function() {
        alert('Thank you for your response, we will contact you soon!!!');
    });

const buttons = document.querySelectorAll('.footer_btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Thank you for your response');
        });
    });

    function setupStars() {
        const stars = document.querySelectorAll('.stars img');
    
        stars.forEach((star, index) => {
            // Handle mouseover event for each star
            star.addEventListener('mouseover', function() {
                fillStars(index + 1);
            });
    
            // Reset the stars to the current rating on mouseout
            star.addEventListener('mouseout', function() {
                fillStars(currentRating);
            });
    
            // Handle click event for each star
            star.addEventListener('click', function() {
                currentRating = index + 1; // Update the current rating
                fillStars(currentRating);
                alert('Thank you for your ratings!!!');
            });
        });
    
        // Keeps track of the current rating
        let currentRating = 0;
    
        // Function to fill the stars up to the specified rating
        function fillStars(rating) {
            for (let i = 0; i < rating; i++) {
                stars[i].src = "/static/images/feedback/starfilled.png";
            }
            for (let i = rating; i < stars.length; i++) {
                stars[i].src = "/static/images/icons/star.svg";
            }
        }
    }
    
    // Initialize the star rating functionality
    document.addEventListener('DOMContentLoaded', setupStars);
    



    