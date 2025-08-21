
// Mobile menu
const menuBtn = document.querySelector('.menu-toggle');
const navList = document.getElementById('nav-list');
if (menuBtn && navList){
  menuBtn.addEventListener('click', () => {
    const open = navList.style.display === 'flex';
    navList.style.display = open ? 'none' : 'flex';
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
}

// Elevate header on scroll
const header = document.querySelector('.site-header');
let lastY = 0;
document.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header?.setAttribute('data-elevate', y > 8);
  lastY = y;
});

// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
themeToggle?.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-pressed', String(isLight));
});

// Contact form basic validation
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  // Very basic check
  const email = form.querySelector('#email')?.value || '';
  if (!email.includes('@')){
    e.preventDefault();
    alert('Please enter a valid email.');
  }
});
