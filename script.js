document.addEventListener('DOMContentLoaded', () => {
    // Load Header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            setupHeader();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) footerContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Setup Header functionality (Scroll & Mobile Menu)
    function setupHeader() {
        const header = document.querySelector('.main-header');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                menuBtn.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
                
                // Toggle icon between hamburger and close
                if (!isExpanded) {
                    menuBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    `;
                } else {
                    menuBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    `;
                }
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuBtn.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    menuBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    `;
                });
            });
        }
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Form Submission Simulation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('user-email');
            const messageDiv = document.querySelector('.form-message');
            const btn = signupForm.querySelector('button');

            if (emailInput.value) {
                // Simulate loading state
                const originalText = btn.textContent;
                btn.textContent = 'Subscribing...';
                btn.disabled = true;

                setTimeout(() => {
                    messageDiv.textContent = 'Thank you for subscribing to GaiaBios!';
                    messageDiv.className = 'form-message success';
                    emailInput.value = '';
                    btn.textContent = originalText;
                    btn.disabled = false;
                    
                    // Clear message after 4 seconds
                    setTimeout(() => {
                        messageDiv.textContent = '';
                    }, 4000);
                }, 1500);
            }
        });
    }
});