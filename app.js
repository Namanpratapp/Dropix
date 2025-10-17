
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dropix Media website loaded');

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter Animation Function
    function animateCounter(element, target, suffix = '', duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate counters when they come into view
                if (entry.target.classList.contains('stat-card') || entry.target.classList.contains('statistics__item')) {
                    const numberElement = entry.target.querySelector('.stat-card__number, .statistics__number');
                    if (numberElement && !numberElement.classList.contains('animated')) {
                        numberElement.classList.add('animated');
                        const target = parseInt(numberElement.getAttribute('data-target')) || 0;
                        animateCounter(numberElement, target);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.stat-card, .process-card, .service-card, .testimonial-card, .statistics__item, .bottom-process__item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Booking Modal Function
    function showBookingModal() {
        // Remove any existing modals
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) {
            document.body.removeChild(existingOverlay);
        }

        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>Book Your Free Strategy Session</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Ready to explode your online presence? Let's discuss your content strategy.</p>
                    <div class="modal-options">
                        <a href="mailto:dipanshu@dropixmedia.com" class="btn btn--primary modal-btn">
                            📧 Email Us
                        </a>
                        <a href="tel:+91 8630727904" class="btn btn--ghost modal-btn">
                            📞 Call Now
                        </a>
                        <a href="https://www.instagram.com/dropixmedia_/" target="_blank" class="btn btn--ghost modal-btn">
                            🔗 Join Us
                        </a>
                    </div>
                    <div class="modal-info">
                        <p><strong>What to expect:</strong></p>
                        <ul>
                            <li>✅ Free 30-minute strategy session</li>
                            <li>✅ Content audit and recommendations</li>
                            <li>✅ Custom growth strategy</li>
                            <li>✅ No obligations or pushy sales</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // Close modal handlers
        const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                document.body.style.overflow = '';
            }, 300);
        };
        
        const closeButton = overlay.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // ESC key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // CTA Button Actions - Fixed event handling
    function setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.btn--primary, .nav__cta');
        
        ctaButtons.forEach(button => {
            // Remove existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Add click effect
                const ripple = document.createElement('span');
                const rect = newButton.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                newButton.style.position = 'relative';
                newButton.style.overflow = 'hidden';
                newButton.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
                
                // Show booking modal
                setTimeout(() => {
                    showBookingModal();
                }, 100);
            });
        });
    }

    // Initialize CTA buttons
    setupCTAButtons();

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Initialize animations after load
    window.addEventListener('load', () => {
        // Add loaded class for any additional animations
        document.body.classList.add('loaded');
        
        // Initialize hero stats animation
        const heroStats = document.querySelectorAll('.stat-card');
        heroStats.forEach((stat, index) => {
            setTimeout(() => {
                const numberElement = stat.querySelector('.stat-card__number');
                if (numberElement) {
                    const target = parseInt(numberElement.getAttribute('data-target')) || 0;
                    animateCounter(numberElement, target);
                }
            }, index * 200 + 1000); // Stagger animation
        });
    });

    // Contact form handling (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#FF4757';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(autoRemove);
                removeNotification(notification);
            });
        }
    }

    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }

    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
        }
    }

    // Log performance after page load
    setTimeout(logPerformance, 100);

    // Error handling for missing elements
    function handleMissingElements() {
        const requiredElements = [
            '#navToggle',
            '#navMenu',
            '.hero',
            '.stat-card'
        ];
        
        requiredElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                console.warn(`Element not found: ${selector}`);
            }
        });
    }

    handleMissingElements();
    console.log('Dropix Media website initialized successfully!');
});

// Global utility functions
window.DropixMedia = {
    // Scroll to element utility
    scrollTo: function(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Analytics tracking placeholder
    track: function(event, data = {}) {
        console.log('Tracking event:', event, data);
        // Implement actual analytics tracking here
    }
};

// Add dynamic CSS for modal and notifications
const style = document.createElement('style');
style.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal {
        background: #000000;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modal-overlay.active .modal {
        transform: scale(1);
    }
    
    .modal-header {
        padding: 24px 24px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        color: #ffffff;
        font-size: 24px;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
    }
    
    .modal-body {
        padding: 24px;
    }
    
    .modal-body p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 24px;
        font-size: 16px;
    }
    
    .modal-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 32px;
    }
    
    .modal-btn {
        width: 100%;
        justify-content: flex-start;
        text-decoration: none;
        display: flex !important;
        align-items: center;
        gap: 8px;
    }
    
    .modal-info {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 20px;
    }
    
    .modal-info p {
        margin-bottom: 16px;
        font-weight: 600;
    }
    
    .modal-info ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .modal-info li {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 8px;
        font-size: 14px;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        background: #000000;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10001;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification--success {
        border-color: #10B981;
    }
    
    .notification--error {
        border-color: #EF4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
    }
    
    .notification-message {
        color: #ffffff;
        font-size: 14px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 16px;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: #ffffff;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
        z-index: 0;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @media (max-width: 480px) {
        .modal {
            width: 95%;
        }
        
        .notification {
            left: 20px;
            right: 20px;
            min-width: auto;
        }
        
        .modal-options {
            gap: 8px;
        }
    }
`;
document.head.appendChild(style);
