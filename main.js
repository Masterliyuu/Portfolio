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
   Smooth Scrolling
============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
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
  }, 8000);
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
   Blog and Hire Me Modals
============================ */
const modalButtons = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");
const readMoreButtons = document.querySelectorAll(".read-more");

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
  });
});

readMoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const articleId = btn.dataset.article;
    const modal = document.getElementById(`article${articleId}`);
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
   Portfolio Filter
============================ */
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-grid .card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    portfolioCards.forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

/* ============================
   Sticky CTA
============================ */
const stickyCTA = document.querySelector(".sticky-cta");
const closeCTA = document.querySelector(".close-cta");

setTimeout(() => {
  stickyCTA.classList.remove("hidden");
}, 3000);

closeCTA.addEventListener("click", () => {
  stickyCTA.classList.add("hidden");
});

/* ============================
   Form Submission
============================ */
const forms = document.querySelectorAll(".form");
forms.forEach(form => {
  const formMessage = form.querySelector(".form-message");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formMessage.style.display = "none";
    formMessage.classList.remove("success", "error");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.reset();
        formMessage.style.display = "block";
        formMessage.classList.add("success");
        formMessage.textContent = "Message sent successfully! I'll get back to you soon.";
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      formMessage.style.display = "block";
      formMessage.classList.add("error");
      formMessage.textContent = "Error sending message. Please try again or email me directly.";
    }
  });
});

/* ============================
   Section Animations
============================ */
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

/* ============================
   Counter Animation
============================ */
const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const targetValue = parseInt(target.getAttribute("data-counter"));
      let currentValue = 0;
      const duration = 2000; // 2 seconds
      const increment = targetValue / (duration / 16); // ~60fps

      const updateCounter = () => {
        currentValue += increment;
        if (currentValue < targetValue) {
          target.textContent = Math.floor(currentValue) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          target.textContent = targetValue + "+";
        }
      };

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(target); // Stop observing after animation starts
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* REMINDER: What to Change */
/* 1. Formspree: Ensure both forms (contact and hire-me) use your Formspree endpoint (set in index.html). Test both to confirm submission works. */
/* 2. Carousel Timing: Adjust the 8000ms interval (line 60) if you want testimonials to rotate faster or slower. */
/* 3. Counter Duration: Modify the 2000ms duration (line 184) if you prefer a faster or slower counter animation. */
/* 4. Test: Verify the counters animate when scrolling to the 'About Me' section, and ensure no performance lag on mobile using Chrome DevTools. */
