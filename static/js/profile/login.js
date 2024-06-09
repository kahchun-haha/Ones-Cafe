document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const adminLoginButton = document.getElementById('admin-login-button');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
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
                    alert('Login successful!');
                    window.location.href = '/';
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('Please fill in all the fields.');
        }
    });

    adminLoginButton.addEventListener('click', function () {
        window.location.href = '/admin/adminLogin';
    });
});