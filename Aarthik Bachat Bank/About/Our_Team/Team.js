document.addEventListener('DOMContentLoaded', () => {
    // Loading screen - Fast cleanup
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 800);
        }, 1500);
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
    
    // Mobile menu with event delegation
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
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


    // Department tabs functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const department = button.dataset.department;

            // Filter team members
            document.querySelectorAll('.team-member-card').forEach(card => {
                if (department === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.dataset.department === department ? 'block' : 'none';
                }
            });
        });
    });
});