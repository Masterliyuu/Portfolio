// === DARK/LIGHT MODE TOGGLE ===
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    themeToggle.setAttribute("aria-pressed", isLight);
  });
}

// === MOBILE MENU TOGGLE ===
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-list");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}
