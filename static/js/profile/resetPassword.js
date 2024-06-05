document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reset-password-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var newPassword = document.getElementById('new-password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        var user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            user.password = newPassword;
            localStorage.setItem('user', JSON.stringify(user));
            alert("Password has been reset successfully!");
        } else {
            alert("No registered user found.");
        }
    });
});