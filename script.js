// ===========================
// PRELOADER
// ===========================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        initAnimations();
    }, 2200);
});

// ===========================
// CURSOR GLOW EFFECT
// ===========================

const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// ===========================
// PARTICLES
// ===========================

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';

        // Random colors
        const colors = ['#00f5ff', '#ff00ff', '#b14aed', '#00ff88'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        container.appendChild(particle);
    }
}

createParticles();

// ===========================
// NAVIGATION
// ===========================

const nav = document.getElementById('nav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Scroll effect for nav
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// TYPING EFFECT
// ===========================

const typingText = document.getElementById('typingText');
const phrases = [
    '> INITIALIZING_SYSTEM...',
    '> LOADING_PROFILE...',
    '> WELCOME_TO_MY_WORLD',
    '> AI_POWERED_REVOPS',
    '> BUILDING_THE_FUTURE'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// ===========================
// COUNTER ANIMATION
// ===========================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-value'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

// ===========================
// 3D CARD TILT EFFECT
// ===========================

function init3DCards() {
    const cards = document.querySelectorAll('.project-card, .blog-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(hover: none)').matches) return;

            const inner = card.querySelector('.project-card-inner, .blog-card-inner');
            if (!inner) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            inner.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.project-card-inner, .blog-card-inner');
            if (inner) {
                inner.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            }
        });
    });
}

// ===========================
// CONTENT TABS
// ===========================

const tabBtns = document.querySelectorAll('.tab-btn');
const mediumContent = document.getElementById('medium-content');
const linkedinContent = document.getElementById('linkedin-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (tab === 'medium') {
            mediumContent.classList.add('active');
            linkedinContent.classList.remove('active');
        } else {
            linkedinContent.classList.add('active');
            mediumContent.classList.remove('active');
        }
    });
});

// ===========================
// MEDIUM RSS FEED
// ===========================

async function fetchMediumPosts() {
    const loading = document.getElementById('loading');
    const mediumGrid = document.getElementById('medium-content');

    if (!loading || !mediumGrid) return;

    loading.classList.add('active');

    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@krismaya1');
        const data = await response.json();

        if (data.status === 'ok') {
            displayMediumPosts(data.items.slice(0, 4));
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        displayFallbackContent();
    } finally {
        loading.classList.remove('active');
    }
}

function displayMediumPosts(posts) {
    const mediumGrid = document.getElementById('medium-content');
    mediumGrid.innerHTML = '';

    posts.forEach((post, index) => {
        const card = document.createElement('article');
        card.classList.add('blog-card');
        card.style.animationDelay = `${index * 100}ms`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.description;
        const excerpt = tempDiv.textContent.slice(0, 120) + '...';

        const date = new Date(post.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="blog-card-inner">
                <p class="blog-date">${date}</p>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${excerpt}</p>
                <a href="${post.link}" target="_blank" rel="noopener" class="blog-link">
                    <span>READ_MORE</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open(post.link, '_blank');
            }
        });

        mediumGrid.appendChild(card);
    });

    // Re-init 3D effects for new cards
    init3DCards();
}

function displayFallbackContent() {
    const mediumGrid = document.getElementById('medium-content');
    mediumGrid.innerHTML = `
        <article class="blog-card">
            <div class="blog-card-inner">
                <div class="blog-icon">
                    <i class="fab fa-medium"></i>
                </div>
                <h3 class="blog-title">Visit My Medium Profile</h3>
                <p class="blog-excerpt">
                    Read my articles on AI, machine learning, and technology trends.
                </p>
                <a href="https://medium.com/@krismaya1" target="_blank" rel="noopener" class="blog-link">
                    <span>VIEW_PROFILE</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

// ===========================
// GLITCH EFFECT ON HOVER
// ===========================

function initGlitchHover() {
    const glitchElements = document.querySelectorAll('.glitch-hover');

    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitchMain 0.3s';
        });

        el.addEventListener('animationend', () => {
            el.style.animation = '';
        });
    });
}

// ===========================
// INITIALIZE ALL ANIMATIONS
// ===========================

function initAnimations() {
    typeEffect();
    animateCounters();
    initScrollReveal();
    init3DCards();
    initGlitchHover();
    fetchMediumPosts();
}

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
});

sections.forEach(section => {
    navObserver.observe(section);
});

// ===========================
// DYNAMIC YEAR
// ===========================

const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
});
