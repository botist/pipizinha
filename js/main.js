/* ========================================
   PIPIZINHA - Main JavaScript
   ULTRA LUXO EDITION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize Swiper for solo gallery
    const soloSwiper = new Swiper('.solo-swiper', {
        effect: 'cards',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    const trailElements = [];
    const trailLength = 8;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailLength) * 0.5;
        trail.style.transform = 'scale(' + (1 - i / trailLength) + ')';
        document.body.appendChild(trail);
        trailElements.push({ el: trail, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    // Animate trail
    function animateTrail() {
        let prevX = mouseX;
        let prevY = mouseY;

        trailElements.forEach((trail, index) => {
            const speed = 0.3 - (index * 0.02);
            trail.x += (prevX - trail.x) * speed;
            trail.y += (prevY - trail.y) * speed;
            trail.el.style.left = trail.x + 'px';
            trail.el.style.top = trail.y + 'px';
            prevX = trail.x;
            prevY = trail.y;
        });

        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // ========================================
    // CLICK EXPLOSION EFFECT
    // ========================================
    const explosionEmojis = ['💗', '💖', '✨', '💕', '⭐', '💫'];

    function createExplosion(x, y) {
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.textContent = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];

            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 99997;
                font-size: ${1 + Math.random() * 0.5}rem;
                --tx: ${tx}px;
                --ty: ${ty}px;
                animation: explode 0.8s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 800);
        }
    }

    // Add explosion on photo clicks
    document.querySelectorAll('.photo-card, .polaroid, .gotica-frame, .final-photo').forEach(el => {
        el.addEventListener('click', (e) => {
            createExplosion(e.clientX, e.clientY);
        });
    });

    // ========================================
    // KONAMI CODE EASTER EGG
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let konamiActive = false;
    let infiniteConfettiInterval = null;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonamiCode() {
        if (konamiActive) {
            // Deactivate
            konamiActive = false;
            document.body.classList.remove('konami-active');
            if (infiniteConfettiInterval) {
                clearInterval(infiniteConfettiInterval);
                infiniteConfettiInterval = null;
            }
            console.log('🎮 Konami Code desativado!');
        } else {
            // Activate
            konamiActive = true;
            document.body.classList.add('konami-active');
            console.log('🎮 KONAMI CODE ATIVADO! Confetti infinito!');

            // Infinite confetti
            infiniteConfettiInterval = setInterval(() => {
                confetti({
                    particleCount: 5,
                    spread: 60,
                    origin: { x: Math.random(), y: Math.random() * 0.5 },
                    colors: ['#FF6B9D', '#FF9F6B', '#FFB8D4', '#FFE66D', '#98D4BB', '#FFD700']
                });
            }, 100);
        }
    }

    // ========================================
    // GOTHIC PHOTO DOUBLE-CLICK EASTER EGG
    // ========================================
    const goticaPhoto = document.getElementById('gotica-photo');
    if (goticaPhoto) {
        goticaPhoto.addEventListener('dblclick', () => {
            // Special neon explosion effect
            goticaPhoto.style.animation = 'none';
            goticaPhoto.offsetHeight; // Trigger reflow
            goticaPhoto.style.animation = 'gothicPulse 0.5s ease-out';

            // Create neon particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                const angle = (i / 20) * Math.PI * 2;
                const distance = 100 + Math.random() * 100;

                particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #FF10F0;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #FF10F0, 0 0 20px #FF10F0;
                    pointer-events: none;
                    z-index: 100;
                    left: 50%;
                    top: 50%;
                    animation: neonExplode 1s ease-out forwards;
                    --tx: ${Math.cos(angle) * distance}px;
                    --ty: ${Math.sin(angle) * distance}px;
                `;

                goticaPhoto.parentElement.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }

            console.log('🖤 Modo gótico ativado!');
        });
    }

    // Add gothic pulse animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes gothicPulse {
            0% { transform: scale(1); box-shadow: 0 0 30px rgba(255, 16, 240, 0.4); }
            50% { transform: scale(1.1); box-shadow: 0 0 80px rgba(255, 16, 240, 0.8); }
            100% { transform: scale(1.05); box-shadow: 0 0 50px rgba(255, 16, 240, 0.6); }
        }
        @keyframes neonExplode {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    const parallaxElements = document.querySelectorAll('.gold-particle, .sparkle, .shooting-star');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ========================================
    // TYPEWRITER & BUTTONS
    // ========================================
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        setTimeout(() => {
            typewriter.classList.add('done');
        }, 2500);
    }

    // Start button scroll
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            document.getElementById('galeria-pi').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Restart button
    const restartBtn = document.querySelector('.btn-restart');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // MESSAGE CARDS ROTATION
    // ========================================
    const messageCards = document.querySelectorAll('.message-card');
    const messageDots = document.querySelectorAll('.message-dots .dot');
    let currentMessage = 0;

    function rotateMessages() {
        messageCards.forEach((card, index) => {
            card.classList.remove('active');
            messageDots[index].classList.remove('active');
        });

        currentMessage = (currentMessage + 1) % messageCards.length;
        messageCards[currentMessage].classList.add('active');
        messageDots[currentMessage].classList.add('active');
    }

    // Dot click navigation
    messageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (messageInterval) {
                clearInterval(messageInterval);
            }

            messageCards.forEach((card, i) => {
                card.classList.remove('active');
                messageDots[i].classList.remove('active');
            });

            currentMessage = index;
            messageCards[currentMessage].classList.add('active');
            messageDots[currentMessage].classList.add('active');

            messageInterval = setInterval(rotateMessages, 3000);
        });
    });

    // Start message rotation when section is visible
    let messageInterval = null;

    const messagesSection = document.getElementById('mensagens');
    const messagesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !messageInterval) {
                messageInterval = setInterval(rotateMessages, 3000);
            } else if (!entry.isIntersecting && messageInterval) {
                clearInterval(messageInterval);
                messageInterval = null;
            }
        });
    }, { threshold: 0.3 });

    if (messagesSection) {
        messagesObserver.observe(messagesSection);
    }

    // ========================================
    // SECTION VISIBILITY
    // ========================================
    const sections = document.querySelectorAll('.section:not(.hero)');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ========================================
    // CONFETTI ON FINAL SECTION
    // ========================================
    const finalSection = document.getElementById('final');
    let confettiTriggered = false;

    const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !confettiTriggered) {
                confettiTriggered = true;
                launchConfetti();
            }
        });
    }, { threshold: 0.5 });

    if (finalSection) {
        finalObserver.observe(finalSection);
    }

    function launchConfetti() {
        const duration = 4000;
        const end = Date.now() + duration;

        const colors = ['#FF6B9D', '#FF9F6B', '#FFB8D4', '#FFE66D', '#98D4BB', '#FFD700'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Heart burst in center
        setTimeout(() => {
            confetti({
                particleCount: 60,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['circle'],
                colors: ['#FF6B9D', '#FF9F6B', '#FFB8D4', '#FFD700']
            });
        }, 500);

        // Second wave with hearts
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 120,
                origin: { y: 0.5, x: 0.5 },
                colors: ['#FF6B9D', '#FFD700'],
                scalar: 1.2
            });
        }, 1500);
    }

    // ========================================
    // FLOATING HEARTS ENHANCEMENT
    // ========================================
    const floatingHearts = document.querySelectorAll('.floating-hearts .heart');
    floatingHearts.forEach((heart, index) => {
        heart.style.animationDuration = `${5 + Math.random() * 4}s`;
        heart.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
    });

    // ========================================
    // TOUCH/SWIPE FOR MESSAGES
    // ========================================
    let touchStartX = 0;
    let touchEndX = 0;

    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
        messagesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        messagesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (messageInterval) {
                clearInterval(messageInterval);
            }

            messageCards.forEach((card, index) => {
                card.classList.remove('active');
                messageDots[index].classList.remove('active');
            });

            if (diff > 0) {
                currentMessage = (currentMessage + 1) % messageCards.length;
            } else {
                currentMessage = (currentMessage - 1 + messageCards.length) % messageCards.length;
            }

            messageCards[currentMessage].classList.add('active');
            messageDots[currentMessage].classList.add('active');

            messageInterval = setInterval(rotateMessages, 3000);
        }
    }

    // ========================================
    // POLAROID CLICK EFFECT
    // ========================================
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // PRELOAD IMAGES
    // ========================================
    const imagesToPreload = [
        'img/pietra1.jpeg',
        'img/pietra2.jpeg',
        'img/pietra3.jpeg',
        'img/pietrabrownie.jpeg',
        'img/pietrafernandoflor.jpeg',
        'img/pietrafernandorodagigante.jpeg',
        'img/pietrafernandogunsnroses.jpeg',
        'img/pietrafernando1.jpeg',
        'img/pietrafernando2.jpeg',
        'img/pietrafernando3.jpeg',
        'img/pietragoticaarma.jpeg'
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    console.log('💕 Site ULTRA LUXO carregado com amor para Pi! 💕');
    console.log('🎮 Dica: tente o Konami Code (↑↑↓↓←→←→BA)');
    console.log('🖤 Dica: double-click na foto gótica para um efeito especial!');
});
