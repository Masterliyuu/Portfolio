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
