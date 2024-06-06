document.getElementById('logoutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'same-origin' // Include cookies with the request
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/'; // Redirect to home page after logout
      } else {
        alert('Error logging out');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });