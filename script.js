// script.js - Versión corregida
document.addEventListener('DOMContentLoaded', () => {
    // Cargar header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            setupMobileMenu(); // Cambiado el nombre para evitar conflicto
        })
        .catch(error => console.error('Error loading header:', error));

    // Configurar menú móvil
    function setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                menuBtn.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
                // Cambiar ícono
                menuBtn.textContent = isExpanded ? '☰' : '✖';
            });
        }
    }
});