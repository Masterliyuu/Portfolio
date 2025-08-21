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

