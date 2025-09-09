// Space Empire temporary webpage scripts
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA button click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to download section
            const downloadSection = document.querySelector('#download');
            if (downloadSection) {
                downloadSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Download button click handler
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // For now, just show an alert since game is in development
            alert('Thank you for your interest! Space Empire is currently in development. Check back soon for updates!');
        });
    }

    // Add some interactive particle effects to the space animation
    const spaceAnimation = document.querySelector('.space-animation');
    if (spaceAnimation) {
        // Create floating particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(122, 162, 255, 0.8);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            spaceAnimation.appendChild(particle);
        }
    }

    // Add floating animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
            33% { transform: translate(20px, -15px) scale(1.2); opacity: 1; }
            66% { transform: translate(-15px, 10px) scale(0.8); opacity: 0.6; }
        }
        
        .particle {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(122, 162, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                
                // Simple counter animation for numbers
                if (text.includes('+')) {
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    animateCounter(stat, 0, number, text.replace(/\d+/g, ''));
                }
                
                statsObserver.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, start, end, suffix) {
        const duration = 2000;
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }

    // Simple parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    console.log('🚀 Space Empire webpage initialized');
});
