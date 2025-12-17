// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
const professions = ['DESIGNER', 'DEVELOPER', 'PROGRAMMER'];
let currentProfessionIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentProfession = professions[currentProfessionIndex];

    if (!isDeleting && currentCharIndex < currentProfession.length) {
        typewriterText.textContent = currentProfession.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeWriter, 150);
    } else if (isDeleting && currentCharIndex > 0) {
        typewriterText.textContent = currentProfession.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(typeWriter, 100);
    } else if (!isDeleting && currentCharIndex === currentProfession.length) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
        setTimeout(typeWriter, 500);
    }
}

// Initialize typewriter when page loads
window.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        offset: 0,
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    typeWriter();

    // Add event listeners for hamburger menu (backup for inline onclick)
    const hamburger = document.querySelector('.hamburger');
    const cancelBtn = document.querySelector('.cancel');

    if (hamburger) {
        hamburger.addEventListener('click', hamburg);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancel);
    }
});

// Mobile Menu Functions
function hamburg() {
    const dropdown = document.querySelector('.drop-down');
    console.log('Hamburger clicked, dropdown:', dropdown);
    if (dropdown) {
        dropdown.classList.add('active');
        console.log('Active class added');
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Dropdown element not found!');
    }
}

function cancel() {
    const dropdown = document.querySelector('.drop-down');
    if (dropdown) {
        dropdown.classList.remove('active');
        // Restore body scroll when menu is closed
        document.body.style.overflow = '';
    }
}

// Close dropdown when clicking on a link
document.querySelectorAll('.drop-down .links a').forEach(link => {
    link.addEventListener('click', () => {
        cancel();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Add fade-in animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill boxes for animation
document.querySelectorAll('.skills-details .box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-20px)';
    box.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(box);
});

// Add stagger animation to service boxes
document.querySelectorAll('.services .box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(box);
});
