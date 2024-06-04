document.addEventListener('DOMContentLoaded', function () {
    async function checkLoginStatus() {
        try {
            const response = await fetch('/api/users/check-auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const authButtons = document.getElementById('auth-buttons');
            if (response.ok) {
                const user = await response.json();
                loadUserData(user);
                authButtons.innerHTML = `
                    <button class="button btn-dark-outline" onclick="location.href='/profile';">Profile</button>
                    <button class="button btn-dark" onclick="window.logout();">Log Out</button>
                `;
            } else {
                authButtons.innerHTML = `
                    <button class="button btn-dark-outline" onclick="location.href='/login';">Sign in</button>
                    <button class="button btn-dark" onclick="location.href='/register';">Join now</button>
                `;
            }
        } catch (error) {
            console.error('Error checking login status', error);
        }
    }

    window.logout = async function() {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Failed to log out.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    function loadUserData(user) {
        console.log('User data loaded:', user);
    }

    checkLoginStatus();
});