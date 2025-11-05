// ===========================
// Theme Management
// ===========================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===========================
// Particle Animation
// ===========================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 100 + 50;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===========================
// Smooth Scroll & Intersection Observer
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ===========================
// Content Tabs Management
// ===========================

const tabButtons = document.querySelectorAll('.tab-btn');
const mediumContent = document.getElementById('medium-content');
const linkedinContent = document.getElementById('linkedin-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');

        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show appropriate content
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
// Medium RSS Feed Integration
// ===========================

async function fetchMediumPosts() {
    const loading = document.getElementById('loading');
    const mediumGrid = document.getElementById('medium-content');

    loading.classList.add('active');

    try {
        // Medium RSS feed URL
        const mediumUsername = 'krismaya1';
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

        const response = await fetch(rssUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            const posts = data.items.slice(0, 6); // Get latest 6 posts
            displayMediumPosts(posts);
        } else {
            throw new Error('Failed to fetch Medium posts');
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
        const postCard = createBlogCard(post, index);
        mediumGrid.appendChild(postCard);
    });
}

function createBlogCard(post, index) {
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.style.animationDelay = `${index * 0.1}s`;

    // Extract text content from description (remove HTML tags)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.description;
    const excerpt = tempDiv.textContent.slice(0, 150) + '...';

    // Format date
    const postDate = new Date(post.pubDate);
    const formattedDate = postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="blog-header">
            <i class="fab fa-medium blog-source-icon"></i>
            <span class="blog-date">${formattedDate}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${excerpt}</p>
        <a href="${post.link}" target="_blank" rel="noopener" class="blog-link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    `;

    // Add click event to open post
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            window.open(post.link, '_blank');
        }
    });

    return card;
}

function displayFallbackContent() {
    const mediumGrid = document.getElementById('medium-content');
    mediumGrid.innerHTML = `
        <div class="blog-card">
            <div class="blog-header">
                <i class="fab fa-medium blog-source-icon"></i>
                <span class="blog-date">Visit Medium</span>
            </div>
            <h3 class="blog-title">Check out my latest articles on Medium</h3>
            <p class="blog-excerpt">
                I write about AI, machine learning, technology trends, and practical insights from building
                intelligent systems. Follow me on Medium to stay updated with my latest thoughts and tutorials.
            </p>
            <a href="https://medium.com/@krismaya1" target="_blank" rel="noopener" class="blog-link">
                Visit Medium Profile <i class="fas fa-arrow-right"></i>
            </a>
        </div>
        <div class="blog-card">
            <div class="blog-header">
                <i class="fas fa-brain blog-source-icon"></i>
                <span class="blog-date">AI & ML</span>
            </div>
            <h3 class="blog-title">Exploring the Future of AI</h3>
            <p class="blog-excerpt">
                Deep dives into artificial intelligence, machine learning algorithms, and the practical
                applications that are shaping our future.
            </p>
            <a href="https://medium.com/@krismaya1" target="_blank" rel="noopener" class="blog-link">
                Read Articles <i class="fas fa-arrow-right"></i>
            </a>
        </div>
        <div class="blog-card">
            <div class="blog-header">
                <i class="fas fa-code blog-source-icon"></i>
                <span class="blog-date">Tech Insights</span>
            </div>
            <h3 class="blog-title">Building Scalable Systems</h3>
            <p class="blog-excerpt">
                Practical guides and lessons learned from architecting and deploying large-scale AI
                and software systems in production.
            </p>
            <a href="https://medium.com/@krismaya1" target="_blank" rel="noopener" class="blog-link">
                Explore Topics <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
}

// ===========================
// Scroll Animations
// ===========================

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .blog-card, .tag');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// ===========================
// Project Cards Interaction
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================

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
// Add Parallax Effect to Hero
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const particles = document.querySelector('.particles');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }

    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===========================
// Initialize on Page Load
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Fetch Medium posts
    fetchMediumPosts();

    // Initial animation check
    animateOnScroll();

    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger animations after load
    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// ===========================
// Typing Effect for Hero Title (Optional Enhancement)
// ===========================

function addTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let index = 0;
    const speed = 50;

    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Uncomment to enable typing effect
    // setTimeout(type, 500);
}

// ===========================
// Performance Optimization
// ===========================

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listeners
const optimizedScroll = debounce(() => {
    animateOnScroll();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
