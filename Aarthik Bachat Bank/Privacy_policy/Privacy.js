document.addEventListener('DOMContentLoaded', () => {
    // Loading screen - Fast cleanup
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 300);
        }, 800);
    }

    // Update time dynamically
    function updateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        document.getElementById('updateTime').textContent = timeString;
    }
    // Initial update
    updateTime();
    // Update every minute
    setInterval(updateTime, 60000);

    // Set current date
    document.addEventListener('DOMContentLoaded', function () {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        document.getElementById('currentDate').textContent = dateString;

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add hover effect to policy sections
        const policySections = document.querySelectorAll('.policy-section');
        policySections.forEach(section => {
            section.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            });

            section.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
            });
        });
    });
    // Mobile menu with event delegation
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Language Toggle
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function () {

                document.querySelectorAll('.lang-btn')
                    .forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const lang = this.dataset.lang;

                document.querySelectorAll('[data-en]').forEach(el => {
                    el.innerText = el.dataset[lang];
                });

            });
        });

        // Dark Mode Toggle
        document.querySelector('.dark-mode-toggle').addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
        // Event delegation for nav links
        navLinks.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link:not(.dropdown-toggle), .dropdown-item');
            if (link) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';

                // Close all dropdowns when clicking any link in mobile
                if (window.innerWidth <= 768) {
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
                }
            }
        });
    }

    // Dropdown functionality with event delegation
    document.addEventListener('click', (e) => {
        const dropdownToggle = e.target.closest('.dropdown-toggle');
        const dropdown = e.target.closest('.dropdown');

        // Handle dropdown toggle click
        if (dropdownToggle) {
            e.stopPropagation();
            const parentDropdown = dropdownToggle.closest('.dropdown');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== parentDropdown) d.classList.remove('active');
            });

            // Toggle current dropdown
            parentDropdown.classList.toggle('active');
        }
        // Close dropdowns when clicking outside
        else if (!dropdown) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // Close dropdowns on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            if (mobileMenuBtn?.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        let ticking = false;

        const updateBackToTop = () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll animations with Intersection Observer
    const animatedElements = document.querySelectorAll('[data-aos]');
    if (animatedElements.length) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

});