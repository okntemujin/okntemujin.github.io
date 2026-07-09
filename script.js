// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year, kept current automatically
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Gentle reveal-on-scroll for data rows, respects reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(".data-row:not(.data-row--head)");

  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
