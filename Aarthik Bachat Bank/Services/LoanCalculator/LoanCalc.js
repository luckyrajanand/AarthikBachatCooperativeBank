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

    // Get all DOM elements
    const elements = {
        loanAmount: document.getElementById('loanAmount'),
        loanAmountSlider: document.getElementById('loanAmountSlider'),
        loanAmountValue: document.getElementById('loanAmountValue'),

        interestRate: document.getElementById('interestRate'),
        interestRateSlider: document.getElementById('interestRateSlider'),
        interestRateValue: document.getElementById('interestRateValue'),

        loanTenure: document.getElementById('loanTenure'),
        loanTenureSlider: document.getElementById('loanTenureSlider'),
        loanTenureValue: document.getElementById('loanTenureValue'),

        emiAmount: document.getElementById('emiAmount'),
        totalAmount: document.getElementById('totalAmount'),
        totalInterest: document.getElementById('totalInterest'),

        principalAmount: document.getElementById('principalAmount'),
        interestAmount: document.getElementById('interestAmount'),
        totalPayment: document.getElementById('totalPayment'),

        calculateBtn: document.getElementById('calculateBtn')
    };

    // Format currency in Indian Rupees
    function formatCurrency(amount) {
        return 'रु' + amount.toLocaleString('en-NP');
    }

    // Update slider value displays
    function updateSliderValues() {
        elements.loanAmountValue.textContent = formatCurrency(parseFloat(elements.loanAmount.value));
        elements.interestRateValue.textContent = elements.interestRate.value + '%';

        const months = parseInt(elements.loanTenure.value);
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        let tenureText = months + ' Months';
        if (years > 0) {
            tenureText = months + ' Months (' + years + ' Year' + (years > 1 ? 's' : '') +
                (remainingMonths > 0 ? ' ' + remainingMonths + ' Month' + (remainingMonths > 1 ? 's' : '') : '') + ')';
        }
        elements.loanTenureValue.textContent = tenureText;
    }

    // Calculate EMI
    function calculateEMI() {
        const principal = parseFloat(elements.loanAmount.value);
        const annualRate = parseFloat(elements.interestRate.value);
        const months = parseFloat(elements.loanTenure.value);

        const monthlyRate = annualRate / 12 / 100;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);

        const totalPaymentAmount = emi * months;
        const totalInterestAmount = totalPaymentAmount - principal;

        // Update results
        elements.emiAmount.textContent = formatCurrency(Math.round(emi));
        elements.totalAmount.textContent = 'Total Payment: ' + formatCurrency(Math.round(totalPaymentAmount));
        elements.totalInterest.textContent = 'Total Interest: ' + formatCurrency(Math.round(totalInterestAmount));

        elements.principalAmount.textContent = formatCurrency(principal);
        elements.interestAmount.textContent = formatCurrency(Math.round(totalInterestAmount));
        elements.totalPayment.textContent = formatCurrency(Math.round(totalPaymentAmount));
    }

    // Setup event listeners
    function setupEventListeners() {
        // Link inputs with their sliders
        const syncInputs = [
            [elements.loanAmount, elements.loanAmountSlider],
            [elements.interestRate, elements.interestRateSlider],
            [elements.loanTenure, elements.loanTenureSlider]
        ];

        syncInputs.forEach(pair => {
            const [input, slider] = pair;

            input.addEventListener('input', function () {
                slider.value = this.value;
                updateSliderValues();
                calculateEMI();
            });

            slider.addEventListener('input', function () {
                input.value = this.value;
                updateSliderValues();
                calculateEMI();
            });
        });

        // Calculate button
        elements.calculateBtn.addEventListener('click', calculateEMI);

        // Calculate on page load
        updateSliderValues();
        calculateEMI();
    }

    // Initialize the calculator
    setupEventListeners();
});
