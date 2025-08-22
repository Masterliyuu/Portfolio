// ===============================
// main.js — Updated Version with Ripple Fix and Sticky CTA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Nav Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    themeToggle.setAttribute("aria-pressed", isLight);
  });

  // --- Elevate Header on Scroll ---
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      siteHeader?.setAttribute("data-elevate", "true");
    } else {
      siteHeader?.setAttribute("data-elevate", "false");
    }
  });

  // --- Button Ripple Effect (exclude sticky CTA) ---
  document.querySelectorAll(".btn").forEach((btn) => {
    if (btn.closest(".sticky-cta")) return;
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      circle.className = "ripple";
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      this.appendChild(circle);
      circle.addEventListener("animationend", () => circle.remove());
    });
  });

  // --- Testimonials Carousel ---
  const track = document.querySelector(".testimonial-track");
  const dots = document.querySelectorAll(".carousel-btn");
  let currentIndex = 0;
  function showSlide(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });
  if (track && dots.length) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % dots.length;
      showSlide(currentIndex);
    }, 5000);
  }

  // --- Blog Modal Logic ---
  const readMoreBtns = document.querySelectorAll(".read-more");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const articleId = btn.getAttribute("data-article");
      document.getElementById("article" + articleId).style.display = "block";
    });
  });
  closes.forEach((close) => {
    close.addEventListener("click", () => {
      modals.forEach((m) => (m.style.display = "none"));
    });
  });
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // --- Scroll Reveal Animations ---
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => observer.observe(section));

  // --- Sticky CTA Close ---
  const sticky = document.querySelector(".sticky-cta");
  const closeBtn = sticky?.querySelector(".close-cta");
  // For debugging: Clear the localStorage flag if you want to always show the sticky CTA
  // localStorage.removeItem("hideStickyCTA");
  if (localStorage.getItem("hideStickyCTA") === "1") {
    sticky?.classList.add("hidden");
  }
  closeBtn?.addEventListener("click", () => {
    sticky?.classList.add("hidden");
    localStorage.setItem("hideStickyCTA", "1");
  });
});
