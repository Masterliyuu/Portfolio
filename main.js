/* ============================
   Theme Toggle
============================ */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Check saved preference
if (localStorage.getItem("theme") === "light") {
  root.classList.add("light");
  themeToggle.setAttribute("aria-pressed", "true");
}

// Toggle on click
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
  navLinks.classList.toggle("active");
});

/* ============================
   Testimonials Carousel
============================ */
const track = document.querySelector(".testimonial-track");
const testimonials = document.querySelectorAll(".testimonial");
const buttons = document.querySelectorAll(".carousel-btn");

let index = 0;
let carouselInterval;

function showTestimonial(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  buttons.forEach((btn, bIndex) => btn.classList.toggle("active", bIndex === i));
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }, 8000); // Slower interval for readability
}

buttons.forEach((btn, bIndex) => {
  btn.addEventListener("click", () => {
    index = bIndex;
    showTestimonial(index);
    clearInterval(carouselInterval);
    startCarousel();
  });
});

const testimonialCarousel = document.querySelector(".testimonial-carousel");
testimonialCarousel.addEventListener("mouseenter", () => clearInterval(carouselInterval));
testimonialCarousel.addEventListener("mouseleave", startCarousel);
startCarousel();

/* ============================
   Blog Modals
============================ */
const readMoreButtons = document.querySelectorAll(".read-more");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

readMoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.article;
    const modal = document.getElementById(`article${id}`);
    if (modal) modal.style.display = "block";
  });
});

closeButtons.forEach((close) => {
  close.addEventListener("click", () => {
    close.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  modals.forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

/* ============================
   Sticky CTA
============================ */
const stickyCTA = document.querySelector(".sticky-cta");
const closeCTA = document.querySelector(".close-cta");

setTimeout(() => {
  stickyCTA.classList.remove("hidden");
}, 3000); // Delay CTA appearance

closeCTA.addEventListener("click", () => {
  stickyCTA.classList.add("hidden");
});

/* ============================
   Form Submission
============================ */
const form = document.querySelector(".form");
const formError = document.querySelector(".form-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.style.display = "none";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      form.reset();
      formError.style.display = "block";
      formError.style.color = "green";
      formError.textContent = "Message sent successfully!";
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    formError.style.display = "block";
    formError.textContent = "Error sending message. Please try again.";
  }
});
