// Enhanced Glamorous Romantic Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen first
    initLoadingScreen();
    
    // Initialize all other functionality after loading
    setTimeout(() => {
        initScrollAnimations();
        initEnhancedLetter();
        initProposalButtons();
        initAudioManagement();
        initSmoothScrolling();
        initResponseForm();
        initVideoControls();
        initVideoMemories();
        initParticleEffects();
        initMobileOptimizations();
        
        // Add extra floating elements periodically
        setInterval(createFloatingHeart, 4000);
        setInterval(createLuxuryParticle, 6000);
    }, 500);
});

// Loading Screen with Dancing Cakes
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Show loading screen for 3-4 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('show');
            
            // Start background music after loading
            startBackgroundMusic();
        }, 1000);
    }, 3500);
}

// Enhanced Audio Management
function initAudioManagement() {
    const birthdayAudio = document.getElementById('birthday-song');
    const loveAudio = document.getElementById('love-song');
    
    // Ensure audio elements are completely hidden
    if (birthdayAudio) {
        birthdayAudio.style.display = 'none';
        birthdayAudio.style.visibility = 'hidden';
        birthdayAudio.volume = 0.2; // Very low volume as requested
    }
    
    if (loveAudio) {
        loveAudio.style.display = 'none';
        loveAudio.style.visibility = 'hidden';
        loveAudio.volume = 0.4;
    }
}

function startBackgroundMusic() {
    const birthdayAudio = document.getElementById('birthday-song');
    
    if (birthdayAudio) {
        // Handle autoplay restrictions
        const playPromise = birthdayAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Background music started');
            }).catch(error => {
                console.log('Autoplay prevented, user interaction needed');
                // Add click listener to start music on first user interaction
                document.addEventListener('click', function startMusicOnClick() {
                    birthdayAudio.play().catch(e => console.log('Music play failed'));
                    document.removeEventListener('click', startMusicOnClick);
                }, { once: true });
            });
        }
    }
}

// Video Controls
function initVideoControls() {
    const playPauseButtons = document.querySelectorAll('.play-pause-btn');
    
    playPauseButtons.forEach(button => {
        const videoId = button.dataset.video;
        const video = document.getElementById(videoId);
        const videoContainer = video.parentElement.parentElement;
        
        if (video) {
            // Ensure video is unmuted
            video.muted = false;
            video.volume = 0.8;
            
            // Play/pause button click handler
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleVideoPlayback(video, button, videoContainer);
            });
            
            // Video ended handler
            video.addEventListener('ended', function() {
                button.classList.remove('playing');
                videoContainer.classList.remove('playing');
            });
            
            // Video play/pause event listeners
            video.addEventListener('play', function() {
                button.classList.add('playing');
                videoContainer.classList.add('playing');
            });
            
            video.addEventListener('pause', function() {
                button.classList.remove('playing');
                videoContainer.classList.remove('playing');
            });
            
            // Video container click handler
            videoContainer.addEventListener('click', function() {
                toggleVideoPlayback(video, button, videoContainer);
            });
        }
    });
}

function toggleVideoPlayback(video, button, container) {
    if (video.paused) {
        // Pause other videos first
        document.querySelectorAll('video').forEach(otherVideo => {
            if (otherVideo !== video && !otherVideo.paused) {
                otherVideo.pause();
            }
        });
        
        video.play().then(() => {
            button.classList.add('playing');
            container.classList.add('playing');
        }).catch(error => {
            console.error('Error playing video:', error);
        });
    } else {
        video.pause();
        button.classList.remove('playing');
        container.classList.remove('playing');
    }
}

function switchToLoveMusic() {
    const birthdayAudio = document.getElementById('birthday-song');
    const loveAudio = document.getElementById('love-song');
    
    // Fade out birthday music
    if (birthdayAudio && !birthdayAudio.paused) {
        const fadeOut = setInterval(() => {
            if (birthdayAudio.volume > 0.1) {
                birthdayAudio.volume -= 0.1;
            } else {
                birthdayAudio.pause();
                birthdayAudio.currentTime = 0;
                clearInterval(fadeOut);
            }
        }, 100);
    }
    
    // Start love music after a brief pause
    setTimeout(() => {
        if (loveAudio) {
            loveAudio.play().catch(e => console.log('Love music play failed'));
        }
    }, 800);
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                    // Add staggered animation for photos
                    const photo = entry.target.querySelector('.timeline-photo');
                    if (photo) {
                        setTimeout(() => {
                            photo.style.transform = 'scale(1.02)';
                            setTimeout(() => {
                                photo.style.transform = 'scale(1)';
                            }, 600);
                        }, 300);
                    }
                }
                
                if (entry.target.hasAttribute('data-aos')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.timeline-item, [data-aos]').forEach(item => {
        observer.observe(item);
        // Set initial state for AOS elements
        if (item.hasAttribute('data-aos')) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.95)';
            item.style.transition = 'all 0.8s ease-out';
        }
    });
}

// Enhanced Letter/Envelope Functionality
function initEnhancedLetter() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    
    envelope.addEventListener('click', function() {
        if (envelope.classList.contains('closed')) {
            openEnhancedLetter();
        }
    });
}

function openEnhancedLetter() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    
    // Switch to love music
    switchToLoveMusic();
    
    // Animate envelope opening
    envelope.classList.remove('closed');
    envelope.classList.add('opening');
    
    // Create background blur effect
    createBackgroundBlur();
    
    // Slide out letter after envelope animation
    setTimeout(() => {
        letter.classList.add('slide-out');
        createLuxuryConfetti('confetti-container', 60);
        
        // Add floating hearts around letter
        createLetterHearts();
        
        // Play elegant chime sound
        playChimeSound();
    }, 1200);
    
    // Add click outside to close letter
    setTimeout(() => {
        document.addEventListener('click', closeLetterOnClickOutside);
    }, 2000);
}

function createBackgroundBlur() {
    const blurOverlay = document.createElement('div');
    blurOverlay.id = 'blur-overlay';
    blurOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        z-index: 4;
        opacity: 0;
        transition: opacity 0.8s ease;
    `;
    
    document.body.appendChild(blurOverlay);
    
    setTimeout(() => {
        blurOverlay.style.opacity = '1';
    }, 100);
}

function closeLetterOnClickOutside(event) {
    const letter = document.getElementById('letter');
    const envelope = document.getElementById('envelope');
    const blurOverlay = document.getElementById('blur-overlay');
    
    if (!letter.contains(event.target) && !envelope.contains(event.target)) {
        letter.classList.remove('slide-out');
        envelope.classList.remove('opening');
        envelope.classList.add('closed');
        
        if (blurOverlay) {
            blurOverlay.style.opacity = '0';
            setTimeout(() => {
                blurOverlay.remove();
            }, 800);
        }
        
        document.removeEventListener('click', closeLetterOnClickOutside);
        
        // Resume background music
        setTimeout(() => {
            const loveAudio = document.getElementById('love-song');
            const birthdayAudio = document.getElementById('birthday-song');
            
            if (loveAudio && !loveAudio.paused) {
                loveAudio.pause();
                loveAudio.currentTime = 0;
            }
            
            if (birthdayAudio) {
                birthdayAudio.volume = 0.2;
                birthdayAudio.play().catch(e => console.log('Resume background music failed'));
            }
        }, 500);
    }
}

function createLetterHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 20}px;
            color: #FF69B4;
            z-index: 6;
            animation: letterHeartFloat 4s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: 50%;
        `;
        heart.innerHTML = '♥';
        heart.style.animationDelay = `${i * 0.2}s`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 5000);
    }
    
    // Add CSS animation dynamically
    if (!document.querySelector('#letter-heart-animation')) {
        const style = document.createElement('style');
        style.id = 'letter-heart-animation';
        style.textContent = `
            @keyframes letterHeartFloat {
                0% { 
                    opacity: 0; 
                    transform: translateY(0) scale(0.5); 
                }
                20% { 
                    opacity: 1; 
                    transform: translateY(-20px) scale(1); 
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-100px) scale(0.8); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Proposal Buttons
function initProposalButtons() {
    const yesButton1 = document.getElementById('yes-button-1');
    const yesButton2 = document.getElementById('yes-button-2');
    
    yesButton1.addEventListener('click', function() {
        handleProposalResponse('primary');
    });
    
    yesButton2.addEventListener('click', function() {
        handleProposalResponse('secondary');
    });
}

function handleProposalResponse(buttonType) {
    // Create massive luxury confetti celebration
    createLuxuryConfetti('celebration-confetti', 150);
    
    // Add spectacular spotlight effect
    createProposalSpotlight();
    
    // Show response section with dramatic entrance
    const responseSection = document.getElementById('response-section');
    responseSection.classList.remove('hidden');
    responseSection.style.opacity = '0';
    responseSection.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        responseSection.style.transition = 'all 1s ease-out';
        responseSection.style.opacity = '1';
        responseSection.style.transform = 'translateY(0)';
        
        // Smooth scroll with offset
        setTimeout(() => {
            responseSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }, 800);
    
    // Create floating diamonds and stars
    createProposalCelebration();
    
    // Play celebration sound sequence
    playCelebrationSequence();
    
    // Disable and transform proposal buttons
    document.getElementById('yes-button-1').disabled = true;
    document.getElementById('yes-button-2').disabled = true;
    
    document.querySelectorAll('.proposal-btn').forEach(btn => {
        btn.style.transform = 'scale(0.9)';
        btn.style.opacity = '0.7';
        btn.innerHTML = '♥ Thank You! ♥';
    });
}

function createProposalSpotlight() {
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        z-index: 999;
        pointer-events: none;
        animation: spotlightExplosion 3s ease-out forwards;
    `;
    
    document.body.appendChild(spotlight);
    
    // Add explosion animation
    if (!document.querySelector('#spotlight-animation')) {
        const style = document.createElement('style');
        style.id = 'spotlight-animation';
        style.textContent = `
            @keyframes spotlightExplosion {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(8); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(12); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        spotlight.remove();
    }, 3000);
}

function createProposalCelebration() {
    const celebrationContainer = document.body;
    const symbols = ['💎', '⭐', '✨', '🌟', '💖', '🎊'];
    
    for (let i = 0; i < 20; i++) {
        const symbol = document.createElement('div');
        symbol.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 998;
            animation: celebrationBurst 4s ease-out forwards;
            pointer-events: none;
        `;
        symbol.style.animationDelay = `${Math.random() * 2}s`;
        
        celebrationContainer.appendChild(symbol);
        
        setTimeout(() => {
            if (symbol.parentNode) symbol.parentNode.removeChild(symbol);
        }, 6000);
    }
    
    // Add burst animation
    if (!document.querySelector('#celebration-animation')) {
        const style = document.createElement('style');
        style.id = 'celebration-animation';
        style.textContent = `
            @keyframes celebrationBurst {
                0% { 
                    opacity: 0; 
                    transform: scale(0) rotate(0deg); 
                }
                20% { 
                    opacity: 1; 
                    transform: scale(1.5) rotate(180deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0.5) rotate(720deg); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Confetti System
function createLuxuryConfetti(containerId, count = 50) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const colors = ['#FFD700', '#FF69B4', '#E8B4B8', '#FFC0CB', '#DAA520', '#FF1493', '#FFE4E1'];
    const shapes = ['♥', '★', '♦', '•', '▪'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties for more luxury feel
        const isShape = Math.random() > 0.5;
        if (isShape) {
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.background = 'transparent';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
        } else {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Add shimmer effect
        confetti.style.filter = `drop-shadow(0 0 ${Math.random() * 10 + 5}px ${colors[Math.floor(Math.random() * colors.length)]})`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 6000);
    }
}

// Video Memories Enhancement
function initVideoMemories() {
    const videos = document.querySelectorAll('.memory-video');
    
    videos.forEach((video, index) => {
        // Add loading placeholder
        video.addEventListener('loadstart', function() {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #FFE4E1, #FFC0CB);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: white;
                z-index: 2;
            `;
            placeholder.innerHTML = '📹';
            video.parentElement.appendChild(placeholder);
            
            video.addEventListener('canplay', function() {
                placeholder.remove();
            }, { once: true });
        });
        
        // Enhanced hover effects
        video.parentElement.addEventListener('mouseenter', function() {
            video.style.transform = 'scale(1.05)';
            video.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        video.parentElement.addEventListener('mouseleave', function() {
            video.style.transform = 'scale(1)';
            video.style.filter = 'brightness(1) saturate(1)';
        });
        
        // Staggered loading
        setTimeout(() => {
            video.load();
        }, index * 500);
    });
}

// Enhanced Particle Effects
function initParticleEffects() {
    // Create additional luxury particles periodically
    setInterval(() => {
        createFloatingDiamond();
    }, 8000);
    
    setInterval(() => {
        createFloatingStar();
    }, 10000);
}

function createFloatingDiamond() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const diamond = document.createElement('div');
    diamond.innerHTML = '💎';
    diamond.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 15}px;
        left: ${Math.random() * 100}%;
        animation: luxuryFloat 20s linear forwards;
        filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
        z-index: 2;
    `;
    
    particlesContainer.appendChild(diamond);
    
    setTimeout(() => {
        if (diamond.parentNode) diamond.parentNode.removeChild(diamond);
    }, 20000);
}

function createFloatingStar() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 12 + 12}px;
        left: ${Math.random() * 100}%;
        animation: starTwinkle 15s ease-in-out forwards;
        z-index: 2;
    `;
    
    particlesContainer.appendChild(star);
    
    // Add star twinkle animation if not exists
    if (!document.querySelector('#star-twinkle-animation')) {
        const style = document.createElement('style');
        style.id = 'star-twinkle-animation';
        style.textContent = `
            @keyframes luxuryFloat {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
            }
            @keyframes starTwinkle {
                0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
                10% { opacity: 1; transform: translateY(90vh) scale(1); }
                50% { transform: translateY(50vh) scale(1.5); }
                90% { opacity: 1; transform: translateY(10vh) scale(1); }
                100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (star.parentNode) star.parentNode.removeChild(star);
    }, 15000);
}

// Enhanced Audio Effects
function playChimeSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create elegant chime sequence
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.2);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.2);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + index * 0.2 + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.8);
            
            oscillator.start(audioContext.currentTime + index * 0.2);
            oscillator.stop(audioContext.currentTime + index * 0.2 + 0.8);
        });
    } catch (error) {
        console.log('Audio context not supported');
    }
}

function playCelebrationSequence() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create celebration sequence
        const melody = [
            { freq: 523.25, time: 0 },    // C5
            { freq: 659.25, time: 0.2 },  // E5
            { freq: 783.99, time: 0.4 },  // G5
            { freq: 1046.50, time: 0.6 }, // C6
            { freq: 1318.51, time: 0.8 }  // E6
        ];
        
        melody.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + note.time + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + 0.4);
            
            oscillator.start(audioContext.currentTime + note.time);
            oscillator.stop(audioContext.currentTime + note.time + 0.4);
        });
    } catch (error) {
        console.log('Audio context not supported');
    }
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                timelineSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add sparkle effect on click
                createScrollSparkles();
            }
        });
    }
    
    // Parallax scrolling effects
    window.addEventListener('scroll', handleParallaxScroll, { passive: true });
}

function createScrollSparkles() {
    const sparkleContainer = document.querySelector('.sparkles');
    if (!sparkleContainer) return;
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: scrollSparkle 1s ease-out forwards;
            pointer-events: none;
        `;
        sparkle.style.animationDelay = `${i * 0.1}s`;
        
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
        }, 1000);
    }
    
    // Add scroll sparkle animation
    if (!document.querySelector('#scroll-sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'scroll-sparkle-animation';
        style.textContent = `
            @keyframes scrollSparkle {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
                100% { opacity: 0; transform: scale(0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function handleParallaxScroll() {
    const scrollY = window.pageYOffset;
    
    // Parallax effect for hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    
    // Parallax for floating elements
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.transform += ` translateY(${scrollY * (0.1 + index * 0.02)}px)`;
    });
}

// Response Form Enhancement
function initResponseForm() {
    const sendButton = document.getElementById('send-message');
    const messageTextarea = document.getElementById('love-message');
    
    if (sendButton && messageTextarea) {
        // Add character counter
        addCharacterCounter(messageTextarea);
        
        sendButton.addEventListener('click', function() {
            const message = messageTextarea.value.trim();
            handleResponseSubmission(message);
        });
        
        // Enhanced textarea interactions
        messageTextarea.addEventListener('focus', function() {
            this.style.borderColor = '#FFD700';
            this.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.4)';
        });
        
        messageTextarea.addEventListener('blur', function() {
            this.style.borderColor = '#DAA520';
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
        });
    }
}

function addCharacterCounter(textarea) {
    const counter = document.createElement('div');
    counter.style.cssText = `
        text-align: right;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 5px;
    `;
    counter.textContent = '0 characters';
    
    textarea.parentElement.appendChild(counter);
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
        
        if (length > 500) {
            counter.style.color = '#FF69B4';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    });
}

function handleResponseSubmission(message) {
    const sendButton = document.getElementById('send-message');
    const messageTextarea = document.getElementById('love-message');
    
    // Create submission animation
    sendButton.innerHTML = '💕 Sending...';
    sendButton.disabled = true;
    sendButton.style.background = 'linear-gradient(45deg, #FFD700, #FF69B4)';
    
    // Simulate sending delay
    setTimeout(() => {
        sendButton.innerHTML = '✨ Message Sent! ✨';
        sendButton.style.background = 'linear-gradient(45deg, #32CD32, #FFD700)';
        
        messageTextarea.disabled = true;
        messageTextarea.style.background = 'rgba(255, 255, 255, 0.9)';
        
        // Create success confetti
        createLuxuryConfetti('celebration-confetti', 40);
        
        // Show success message
        showSuccessMessage(message);
        
        // Play success chime
        playChimeSound();
    }, 2000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        margin-top: 20px;
        padding: 20px;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 105, 180, 0.2));
        border-radius: 15px;
        color: white;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 215, 0, 0.3);
        animation: successFadeIn 1s ease-out;
    `;
    
    const truncatedMessage = message.length > 100 ? message.substring(0, 100) + '...' : message;
    
    successDiv.innerHTML = `
        <h4 style="margin: 0 0 10px 0; font-family: 'Great Vibes', cursive; font-size: 1.5rem;">Your beautiful message has been received! 💕</h4>
        ${message ? `<p style="margin: 10px 0; font-style: italic; opacity: 0.9; font-family: 'Playfair Display', serif;">"${truncatedMessage}"</p>` : ''}
        <div style="margin-top: 15px; font-size: 1.2rem;">Thank you for making this moment perfect! ✨</div>
    `;
    
    // Add success animation
    if (!document.querySelector('#success-animation')) {
        const style = document.createElement('style');
        style.id = 'success-animation';
        style.textContent = `
            @keyframes successFadeIn {
                0% { opacity: 0; transform: translateY(30px) scale(0.9); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const responseForm = document.querySelector('.response-form');
    responseForm.appendChild(successDiv);
}

// Enhanced Mobile Optimizations
function initMobileOptimizations() {
    if ('ontouchstart' in window) {
        // Enhanced touch interactions
        document.querySelectorAll('.proposal-btn, .photo-container, #envelope').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
        
        // Optimize animations for mobile
        document.body.style.webkitTransform = 'translateZ(0)';
        document.body.style.backfaceVisibility = 'hidden';
        
        // Reduce particle effects on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 3) particle.style.display = 'none';
        });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    });
}

// Additional Utility Functions
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = Math.random() > 0.5 ? '♥' : '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 12 + 16) + 'px';
    heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, ${Math.random() * 30 + 60}%)`;
    heart.style.animationDuration = (Math.random() * 15 + 15) + 's';
    heart.style.animationDelay = '0s';
    heart.style.filter = `drop-shadow(0 0 ${Math.random() * 10 + 5}px rgba(255, 105, 180, 0.6))`;
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 25000);
}

function createLuxuryParticle() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particles = ['✨', '🌟', '💫', '⭐'];
    const particle = document.createElement('div');
    particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
    particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 15}px;
        left: ${Math.random() * 100}%;
        animation: luxuryFloat 25s linear forwards;
        filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.7));
        z-index: 2;
    `;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 25000);
}

// Keyboard Accessibility
document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    
    if (event.key === 'Enter') {
        if (activeElement.id === 'yes-button-1') {
            handleProposalResponse('primary');
        } else if (activeElement.id === 'yes-button-2') {
            handleProposalResponse('secondary');
        } else if (activeElement.id === 'envelope') {
            openEnhancedLetter();
        }
    }
    
    // Escape key to close letter
    if (event.key === 'Escape') {
        const letter = document.getElementById('letter');
        const envelope = document.getElementById('envelope');
        if (letter && letter.classList.contains('slide-out')) {
            closeLetterOnClickOutside({ target: document.body });
        }
    }
    
    // Space key for audio control (hidden feature)
    if (event.key === ' ' && event.target.tagName !== 'TEXTAREA') {
        const birthdayAudio = document.getElementById('birthday-song');
        if (birthdayAudio) {
            event.preventDefault();
            if (birthdayAudio.paused) {
                birthdayAudio.play().catch(e => console.log('Audio play failed'));
            } else {
                birthdayAudio.pause();
            }
        }
    }
});

// Performance optimizations
document.addEventListener('visibilitychange', function() {
    const videos = document.querySelectorAll('video');
    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => {
            if (video.hasAttribute('autoplay')) {
                video.play().catch(e => console.log('Video resume failed'));
            }
        });
    }
});

// Console Easter Egg
console.log(`
♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
♥                                               ♥
♥         🎂 Happy Birthday, Kanika! 🎂          ♥
♥                                               ♥
♥              💖 Will You Marry Me? 💖           ♥
♥                                               ♥
♥        ✨ You are my everything, my forever ✨    ♥
♥                                               ♥
♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥

Created with love and enhanced glamour ✨
`);

// Analytics placeholder for future implementation
function trackUserInteraction(action, element) {
    console.log(`✨ User interaction: ${action} on ${element} ✨`);
}

// Track important interactions
document.addEventListener('click', function(event) {
    const element = event.target;
    
    if (element.id === 'yes-button-1' || element.id === 'yes-button-2') {
        trackUserInteraction('proposal_accepted', element.id);
    }
    
    if (element.id === 'envelope' || element.closest('#envelope')) {
        trackUserInteraction('letter_opened', 'envelope');
    }
    
    if (element.id === 'send-message') {
        trackUserInteraction('message_sent', 'response-form');
    }
});

// Final initialization check
window.addEventListener('load', function() {
    console.log('🎉 Glamorous Birthday & Proposal Website Fully Loaded! 🎉');
});