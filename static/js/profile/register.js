document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('register');
    if (registerButton) {
        registerButton.addEventListener('click', function () {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (username && email && password) {
                localStorage.setItem('user', JSON.stringify({ username, email, password }));
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                alert('Please fill all the fields.');
            }
        });
    } else {
        console.error('Register button not found');
    }
});