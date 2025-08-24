/* ============================
   Theme Toggle
============================ */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// check saved preference
if (localStorage.getItem("theme") === "light") {
  root.classList.add("light");
  themeToggle.setAttribute("aria-pressed", "true");
}

// toggle on click
themeToggle.addEventListener("click", () => {
  root.classList.toggle("light");
  const isLight = root.classList.contains("light");
  themeToggle.setAttribute("aria-pressed", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ============================
   Header Elevation on Scroll
============================ */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.dataset.elevate = window.scrollY > 20;
});

/* ============================
   Mobile Navigation
============================ */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !expanded);
  navLinks.style.display = expanded ? "none" : "flex";
});

/* ============================
   Testimonials Carousel
============================ */
const track = document.querySelector(".testimonial-track");
const testimonials = document.querySelectorAll(".testimonial");
const buttons = document.querySelectorAll(".carousel-btn");

let index = 0;

function showTestimonial(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  buttons.forEach((btn, bIndex) =>
    btn.classList.toggle("active", bIndex === i)
  );
}

buttons.forEach((btn, bIndex) => {
  btn.addEventListener("click", () => {
    index = bIndex;
    showTestimonial(index);
  });
});

// auto slide
setInterval(() => {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}, 6000);

/* ============================
   Blog Modals
============================ */
const readMoreButtons = document.querySelectorAll(".read-more");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

readMoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.article;
    document.getElementById(`article${id}`).style.display = "block";
  });
});

closeButtons.forEach((close) => {
  close.addEventListener("click", () => {
    close.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

/* ============================
   Sticky CTA
============================ */
const stickyCTA = document.querySelector(".sticky-cta");
const closeCTA = document.querySelector(".close-cta");

closeCTA.addEventListener("click", () => {
  stickyCTA.classList.add("hidden");
});
