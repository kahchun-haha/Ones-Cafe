document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user'));

    if (isLoggedIn === 'true' && user) {
        document.getElementById('name').value = user.username;
        document.getElementById('email').value = user.email;
    } else {
        window.location.href = '/login';
    }
});