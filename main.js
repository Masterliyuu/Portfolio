// ============ NAVBAR ELEVATION =============
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  header.dataset.elevate = window.scrollY > 20 ? "true" : "false";
});

// ============ MOBILE NAV TOGGLE ============
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if(menuToggle){
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ============ SCROLL REVEAL ============
const revealSections = document.querySelectorAll(".section");
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible")}
  });
},{threshold:.1});
revealSections.forEach(sec=>observer.observe(sec));

// ============ TESTIMONIAL CAROUSEL ============
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial");
const navBtns = document.querySelectorAll(".carousel-btn");
let index=0;
function goToSlide(i){
  track.style.transform = `translateX(-${i*100}%)`;
  navBtns.forEach(btn=>btn.classList.remove("active"));
  navBtns[i].classList.add("active");
}
navBtns.forEach((btn,i)=>btn.addEventListener("click",()=>{index=i;goToSlide(index)}));
setInterval(()=>{index=(index+1)%slides.length;goToSlide(index)},5000);

// ============ BLOG MODALS ============
document.querySelectorAll(".read-more").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const modal=document.querySelector(btn.dataset.target);
    if(modal) modal.style.display="block";
  });
});
document.querySelectorAll(".modal .close").forEach(btn=>{
  btn.addEventListener("click",()=>btn.closest(".modal").style.display="none");
});
window.addEventListener("click",(e)=>{
  if(e.target.classList.contains("modal")) e.target.style.display="none";
});

// ============ STICKY CTA ============
const cta=document.querySelector(".sticky-cta");
const closeBtn=document.querySelector(".close-cta");
if(closeBtn){
  closeBtn.addEventListener("click",()=>cta.classList.add("hidden"));
}
