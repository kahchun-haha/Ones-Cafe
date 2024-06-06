document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav-left li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('navbar-nav-left-current');
        } else {
            link.parentElement.classList.remove('navbar-nav-left-current');
        }
    });
});