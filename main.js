// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  menuToggle.setAttribute('aria-expanded', !isOpen);
});

// Header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.dataset.elevate = window.scrollY > 10;
});

// Dark/Light Mode toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  themeToggle.setAttribute('aria-pressed', isLight);
});

// Smooth scroll reveal animation
const reveals = document.querySelectorAll('.section, .card, .case, .stat, blockquote');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}

document.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  reveals.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  revealOnScroll();
});
