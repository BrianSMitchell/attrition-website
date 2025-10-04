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

    // Download button setup - detect OS and set direct download link
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        setupDownloadButton();
    }

    async function setupDownloadButton() {
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();
        
        let downloadUrl = '';
        let platformName = '';
        let isAvailable = true;
        
        // Fetch the latest release info from GitHub API
        let latestLauncherUrl = null;
        try {
            const response = await fetch('https://api.github.com/repos/BrianSMitchell/attrition-launcher/releases/latest');
            const releaseData = await response.json();
            
            // Find the launcher executable in the assets
            const launcherAsset = releaseData.assets.find(asset => 
                asset.name.includes('Launcher-Setup') && asset.name.endsWith('.exe')
            );
            
            if (launcherAsset) {
                latestLauncherUrl = launcherAsset.browser_download_url;
                console.log('✅ Found latest launcher:', launcherAsset.name);
                console.log('📦 Download URL:', latestLauncherUrl);
            } else {
                console.log('❌ No launcher asset found in release');
            }
        } catch (error) {
            console.log('Could not fetch latest release info, using fallback URL. Error:', error);
        }
        
        if (userAgent.includes('win') || platform.includes('win')) {
            // Use dynamically fetched URL or fallback to latest launcher release  
downloadUrl = latestLauncherUrl || 'https://github.com/BrianSMitchell/attrition-launcher/releases/download/v1.1.3/Attrition%20Launcher-Setup-1.1.3.exe';
            platformName = 'Windows';
            isAvailable = true;
        } else if (userAgent.includes('mac') || platform.includes('mac')) {
            downloadUrl = 'https://github.com/BrianSMitchell/attrition-launcher/releases/latest/download/Attrition-Launcher.dmg';
            platformName = 'macOS';
            isAvailable = false; // Coming soon
        } else if (userAgent.includes('linux') || platform.includes('linux')) {
            downloadUrl = 'https://github.com/BrianSMitchell/attrition-launcher/releases/latest/download/Attrition-Launcher.AppImage';
            platformName = 'Linux';
            isAvailable = false; // Coming soon
        } else {
            // Unknown platform - show modal on click
            downloadButton.addEventListener('click', function(e) {
                e.preventDefault();
                showDownloadOptions(latestLauncherUrl);
            });
            return;
        }
        
        if (isAvailable) {
            // Convert button to direct download link
            downloadButton.href = downloadUrl;
            downloadButton.target = '_blank';
            downloadButton.download = '';
            downloadButton.textContent = `Download Launcher for ${platformName}`;
            
            // Add click event for download tracking
            downloadButton.addEventListener('click', function() {
                showDownloadMessage(platformName);
            });
        } else {
            // Show coming soon message on click
            downloadButton.addEventListener('click', function(e) {
                e.preventDefault();
                showComingSoonMessage(platformName);
            });
            downloadButton.textContent = `${platformName} Version Coming Soon`;
            downloadButton.style.background = '#666';
            downloadButton.style.cursor = 'not-allowed';
        }
    }
    
    function showDownloadOptions(latestLauncherUrl = null) {
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
<a href=\"${latestLauncherUrl || 'https://github.com/BrianSMitchell/attrition-launcher/releases/download/v1.1.3/Attrition%20Launcher-Setup-1.1.3.exe'}\" target=\"_blank\" style=\"
                        background: var(--primary);
                        color: var(--bg);
                        padding: 12px 16px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    ">🖥️ Windows (64-bit) <span style="font-size: 0.8em; background: rgba(0,255,0,0.2); padding: 2px 6px; border-radius: 3px;">Available</span></a>
                    <div onclick="showComingSoonMessage('macOS')" style="
                        background: #666;
                        color: #ccc;
                        padding: 12px 16px;
                        border-radius: 6px;
                        font-weight: bold;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    ">🍎 macOS (Intel & Apple Silicon) <span style="font-size: 0.8em; background: rgba(255,165,0,0.3); padding: 2px 6px; border-radius: 3px;">Coming Soon</span></div>
                    <div onclick="showComingSoonMessage('Linux')" style="
                        background: #666;
                        color: #ccc;
                        padding: 12px 16px;
                        border-radius: 6px;
                        font-weight: bold;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    ">🐧 Linux (AppImage) <span style="font-size: 0.8em; background: rgba(255,165,0,0.3); padding: 2px 6px; border-radius: 3px;">Coming Soon</span></div>
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
    
    function showComingSoonMessage(platform) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        message.textContent = `${platform} version coming soon! Currently Windows only.`;
        document.body.appendChild(message);
        
        // Remove after 5 seconds (longer for coming soon)
        setTimeout(() => {
            message.remove();
        }, 5000);
        
        // Add slide in animation if not already added
        if (!document.head.querySelector('style[data-animation="slideIn"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', 'slideIn');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
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
