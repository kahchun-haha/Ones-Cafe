document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting traditionally
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            // Assuming 'user' was stored as an object {email, password} during registration
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && email === storedUser.email && password === storedUser.password) {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                window.location.href = '/'; // Redirect after successful login
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }
});