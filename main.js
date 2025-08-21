// main.js

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.getElementById("themeToggle");
  const siteHeader = document.querySelector(".site-header");

  // --- Mobile nav toggle ---
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // --- Theme toggle ---
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    themeToggle.setAttribute("aria-pressed", isLight);
  });

  // --- Elevate header on scroll ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      siteHeader.setAttribute("data-elevate", "true");
    } else {
      siteHeader.setAttribute("data-elevate", "false");
    }
  });

  // --- Button Ripple Effect ---
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
      circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
      circle.classList.add("ripple");

      // Remove any old ripple
      const ripple = this.querySelector(".ripple");
      if (ripple) {
        ripple.remove();
      }

      this.appendChild(circle);

      // auto-remove ripple after animation
      setTimeout(() => circle.remove(), 600);
    });
  });

  // --- Testimonial Carousel ---
  const track = document.querySelector(".testimonial-track");
  const slides = document.querySelectorAll(".testimonial");
  const buttons = document.querySelectorAll(".carousel-btn");
  let currentIndex = 0;

  function updateCarousel(index) {
    if (!track) return; // no carousel present
    track.style.transform = `translateX(-${index * 100}%)`;
    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
  });

  // Auto-cycle every 6s
  if (track) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel(currentIndex);
    }, 6000);
  }
});

// --- Blog Modal Logic ---
const readMoreBtns = document.querySelectorAll(".read-more");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".close");

readMoreBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const articleId = btn.getAttribute("data-article");
    document.getElementById("article" + articleId).style.display = "block";
  });
});

closes.forEach(close => {
  close.addEventListener("click", () => {
    modals.forEach(m => m.style.display = "none");
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// --- Scroll Reveal Animations ---
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

// --- Sticky CTA Close ---
const sticky = document.querySelector('.sticky-cta');
  const closeBtn = sticky?.querySelector('.close-cta');
  if (localStorage.getItem('hideStickyCTA') === '1') sticky?.classList.add('hidden');
  closeBtn?.addEventListener('click', () => {
    sticky.classList.add('hidden');
    localStorage.setItem('hideStickyCTA','1');
  }););

