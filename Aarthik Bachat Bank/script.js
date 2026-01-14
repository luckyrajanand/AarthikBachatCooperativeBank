// script.js - Optimized for Performance
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

    // Carousel Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let index = 0;

    function showSlide(i) {
        slides.forEach(s => s.classList.remove('active'));
        indicators.forEach(d => d.classList.remove('active'));

        slides[i].classList.add('active');
        indicators[i].classList.add('active');
    }

    nextBtn.onclick = () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    };

    prevBtn.onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    };

    indicators.forEach((dot, i) => {
        dot.onclick = () => {
            index = i;
            showSlide(index);
        };
    });

    /* Auto play */
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 10000);

    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const langText = languageToggle.querySelector('.lang-text');
            langText.textContent = langText.textContent === 'नेपाली' ? 'English' : 'नेपाली';
        });
    }

    // Statistics counter with Intersection Observer (More efficient)
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Counter animation function(statistics-counter)
    function animateCounter(element, target, duration = 1500) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }


    // Simple counter animation for stats(Why to choose us)
    document.addEventListener('DOMContentLoaded', function () {
        const statNumbers = document.querySelectorAll('.stat-number');

        // Observer to trigger animation when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent);
                        const suffix = stat.textContent.replace(/[0-9]/g, '');
                        let current = 0;
                        const increment = target / 20;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current) + suffix;
                        }, 50);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe the stats banner
        const statsBanner = document.querySelector('.stats-banner');
        if (statsBanner) {
            observer.observe(statsBanner);
        }
    });


    // Simple hover effect for landmark items
    document.addEventListener('DOMContentLoaded', function () {
        const landmarkItems = document.querySelectorAll('.landmark-item');

        landmarkItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(5px)';
                this.style.backgroundColor = '#f0f8f0';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
                this.style.backgroundColor = '#f9fdf9';
            });
        });

        // Map embed responsive height adjustment
        function adjustMapHeight() {
            const mapEmbed = document.querySelector('.map-embed iframe');
            if (mapEmbed && window.innerWidth < 768) {
                mapEmbed.style.height = '250px';
            } else if (mapEmbed) {
                mapEmbed.style.height = '300px';
            }
        }

        // Adjust on load and resize
        adjustMapHeight();
        window.addEventListener('resize', adjustMapHeight);
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

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page reload

        // Grab values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const message = document.getElementById('message').value.trim();

        // Format message for WhatsApp
        const text = `Hello! My name is ${name}.\nEmail: ${email}\nWhatsapp: ${whatsapp}\nMessage: ${message}`;

        // Encode text for URL
        const encodedText = encodeURIComponent(text);

        // Your WhatsApp number (receiver)
        const myNumber = "9845524394"; // Replace with your number

        // Open WhatsApp in new tab
        window.open(`https://wa.me/${myNumber}?text=${encodedText}`, '_blank');
    });

    // Marquee animation - Optimized
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Create seamless loop without DOM manipulation
        const originalContent = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalContent + originalContent;
    }

    // Optimize images on load
    function optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.loading) img.loading = 'lazy';
            if (!img.alt) img.alt = 'Aarthik Saving and Credit Co-operative';
        });
    }

    optimizeImages();
});