document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('admin-login-email').value;
            const password = document.getElementById('admin-login-password').value;

            if (email && password) {
                try {
                    const response = await fetch('/api/admins/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('isAdminLoggedIn', 'true');
                        localStorage.setItem('admin', JSON.stringify(data.admin));
                        alert('Admin login successful!');
                        window.location.href = '/admin/menuManagement';
                    } else {
                        const errorData = await response.text();
                        console.log('Login failed:', errorData);
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
    } else {
        console.error('Login form not found');
    }
});
