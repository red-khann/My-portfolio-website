    document.addEventListener('DOMContentLoaded', function() {
    // --- Setup variables ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const heroPhoto = document.querySelector('.hero-profile-photo');
    const navMenu = document.querySelector('.nav-links');
    const aboutLink = document.querySelector('a[href="#about"]');

    // --- Center mobile nav on the "About" link on page load ---
    setTimeout(() => {
        if (window.innerWidth <= 992 && aboutLink) {
            aboutLink.scrollIntoView({ inline: 'center' });
        }
    }, 100);

    // --- Smooth scrolling for nav links ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Function to run on scroll ---
    function handleScroll() {
        // 1. Photo flip and cross-fade animation
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            header.classList.add('header-scrolled');
            heroPhoto.classList.add('hero-photo-scrolled');
        } else {
            header.classList.remove('header-scrolled');
            heroPhoto.classList.remove('hero-photo-scrolled');
        }
        
        // 2. Highlight active nav link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Robust check for the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
        if (isAtBottom) {
            currentSectionId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
                if (window.innerWidth <= 992) {
                    link.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                }
            }
        });
    }

    // --- Add event listeners ---
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
});
