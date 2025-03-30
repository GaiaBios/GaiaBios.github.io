// Load Header
document.addEventListener('DOMContentLoaded', () => {
    fetch('components/header.html')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(html => {
        document.getElementById('header-container').innerHTML = html;
        initMobileMenu();
    })
    .catch(error => console.error('Error loading header:', error));
});

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded')=== 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('expanded');
        // Change icon
        menuBtn.textContent = isExpanded ? '☰' : '✖';
    });
});