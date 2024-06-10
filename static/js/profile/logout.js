document.addEventListener("DOMContentLoaded", function () {
  const logoutForm = document.getElementById('logoutForm');
  if (logoutForm) {
    logoutForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'same-origin' // Include cookies with the request
      })
        .then(response => {
          if (response.ok) {
            // Clear localStorage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            // Redirect to home page after logout
            window.location.href = '/'; 
          } else {
            alert('Error logging out');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }
});
