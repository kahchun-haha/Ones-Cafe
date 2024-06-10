document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const adminLoginButton = document.getElementById('admin-login-button');

    // Function to handle user login
    async function loginUser(email, password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('loyaltyPoints', data.user.loyaltyPoints);
                alert('Login successful!');
                window.location.href = '/';
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Handle the login form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            loginUser(email, password);
        } else {
            alert('Please fill in all the fields.');
        }
    });

    // Redirect to admin login page
    adminLoginButton.addEventListener('click', function () {
        window.location.href = '/admin/adminLogin';
    });
});
