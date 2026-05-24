// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Typing Animation
const typingTexts = document.querySelectorAll('.typing-text');
let currentIndex = 0;

function startTypingAnimation() {
    if (currentIndex < typingTexts.length) {
        typingTexts[currentIndex].classList.add('active');
        currentIndex++;
        setTimeout(() => {
            typingTexts[currentIndex - 1].classList.remove('active');
            startTypingAnimation();
        }, 3500);
    } else {
        currentIndex = 0;
        setTimeout(startTypingAnimation, 500);
    }
}

startTypingAnimation();

// Image Upload Handler
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imagePlaceholder = document.getElementById('heroImage');
            imagePlaceholder.innerHTML = `<img src="${event.target.result}" alt="Profile">`;
        };
        reader.readAsDataURL(file);
    }
});

// Resume Upload Handler
document.getElementById('resumeUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        
        // Show resume preview
        document.getElementById('resumePreview').style.display = 'block';
        document.getElementById('resumeFileName').textContent = file.name;
        document.getElementById('resumeDownloadLink').href = fileURL;
        
        // Create download link
        const downloadBtn = document.getElementById('downloadResumeBtn');
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.href = fileURL;
        downloadBtn.download = file.name;
    } else if (file) {
        alert('Please upload a PDF file');
    }
});

// Clear Resume
window.clearResume = function() {
    document.getElementById('resumePreview').style.display = 'none';
    document.getElementById('downloadResumeBtn').style.display = 'none';
    document.getElementById('resumeUpload').value = '';
};

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // You can integrate with a backend service here
    const mailtoLink = `mailto:deepan@example.com?subject=Message from ${name}&body=${message}%0A%0AFrom: ${email}`;
    window.location.href = mailtoLink;
    
    // Reset form
    this.reset();
});

// Animate Statistics Numbers
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger statistics animation when in view
            if (entry.target.classList.contains('statistics')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Cursor Glow Effect
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0) 70%);
    pointer-events: none;
    z-index: -1;
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.2);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 150) + 'px';
    cursorGlow.style.top = (e.clientY - 150) + 'px';
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});