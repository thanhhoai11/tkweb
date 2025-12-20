// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Card hover effects - add ripple effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// CTA Button pulse animation
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    setInterval(() => {
        ctaButton.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            ctaButton.style.animation = '';
        }, 1000);
    }, 5000);
}

// Add pulse keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// FAQ accordion effect
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const allAnswers = document.querySelectorAll('.faq-answer');
        
        allAnswers.forEach(a => {
            if (a !== answer) {
                a.style.maxHeight = null;
                a.style.opacity = '0.7';
            }
        });
        
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.opacity = '0.7';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
        }
    });
});

// Parallax effect for hero section
/*window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});*/

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for stats (if needed in future)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Testimonial cards stagger animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #FFB6C1, #FFD966);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

console.log('🐾 Volunteer page loaded successfully!');


let currentSlide = 0;

function slideTestimonials(direction) {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const totalSlides = cards.length;
    
    // Tính toán số card hiển thị dựa trên chiều rộng màn hình (mặc định là 3)
    const cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    const maxSlide = totalSlides - cardsPerView;

    currentSlide += direction;

    // Vòng lặp slide
    if (currentSlide < 0) currentSlide = maxSlide;
    if (currentSlide > maxSlide) currentSlide = 0;

    const slideWidth = cards[0].offsetWidth + 30; // 30 là gap giữa các card
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

