document.addEventListener('DOMContentLoaded', function() {
    // Initialize isLoggedIn if undefined
    if (localStorage.getItem('isLoggedIn') === null) {
        localStorage.setItem('isLoggedIn', 'false');
    }
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    toggleLoginButtons(isLoggedIn);
    
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.clear();
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = '/templates/login.html';
        });
    }
});

function toggleLoginButtons(isLoggedIn) {
    const signInBtn = document.getElementById('signInBtn');
    const joinNowBtn = document.getElementById('joinNowBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        if (signInBtn) signInBtn.style.display = 'none';
        if (joinNowBtn) joinNowBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (signInBtn) signInBtn.style.display = 'block';
        if (joinNowBtn) joinNowBtn.style.display = 'block';
        if (profileBtn) profileBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}