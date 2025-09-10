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
            detectAndDownload();
        });
    }

    // Auto-detect user's OS and provide appropriate download
    function detectAndDownload() {
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();
        
        let downloadUrl = '';
        let platformName = '';
        
        if (userAgent.includes('win') || platform.includes('win')) {
            downloadUrl = '/downloads/attrition-launcher-windows.exe';
            platformName = 'Windows';
        } else if (userAgent.includes('mac') || platform.includes('mac')) {
            downloadUrl = '/downloads/attrition-launcher-macos.dmg';
            platformName = 'macOS';
        } else if (userAgent.includes('linux') || platform.includes('linux')) {
            downloadUrl = '/downloads/attrition-launcher-linux.AppImage';
            platformName = 'Linux';
        } else {
            // Fallback - show manual selection
            showDownloadOptions();
            return;
        }
        
        // Start download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download started message
        showDownloadMessage(platformName);
    }
    
    function showDownloadOptions() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(8, 11, 22, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--bg-accent);
                border: 1px solid var(--primary);
                border-radius: 12px;
                padding: 24px;
                max-width: 400px;
                text-align: center;
            ">
                <h3 style="color: var(--primary); margin-top: 0;">Download Attrition Launcher</h3>
                <p style="color: var(--text); margin-bottom: 20px;">Choose your operating system:</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="/downloads/attrition-launcher-windows.exe" style="
                        background: var(--primary);
                        color: var(--bg);
                        padding: 12px 16px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                    ">🖥️ Windows (64-bit)</a>
                    <a href="/downloads/attrition-launcher-macos.dmg" style="
                        background: var(--primary);
                        color: var(--bg);
                        padding: 12px 16px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                    ">🍎 macOS (Intel & Apple Silicon)</a>
                    <a href="/downloads/attrition-launcher-linux.AppImage" style="
                        background: var(--primary);
                        color: var(--bg);
                        padding: 12px 16px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                    ">🐧 Linux (AppImage)</a>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 16px;
                    background: transparent;
                    border: 1px solid var(--muted);
                    color: var(--muted);
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                ">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    function showDownloadMessage(platform) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent);
            color: var(--bg);
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        message.textContent = `Downloading Attrition Launcher for ${platform}...`;
        document.body.appendChild(message);
        
        // Remove after 4 seconds
        setTimeout(() => {
            message.remove();
        }, 4000);
        
        // Add slide in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
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

    console.log('🚀 Attrition webpage initialized');
});
