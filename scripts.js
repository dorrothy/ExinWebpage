// Rok w stopce
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = nav.getAttribute("data-open") === "true";
  nav.setAttribute("data-open", String(!open));
  toggle.setAttribute("aria-expanded", String(!open));
});

// Galeria modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.getElementById("gallery").addEventListener("click", (e) => {
  const btn = e.target.closest(".tile");
  if (!btn) return;
  const src = btn.getAttribute("data-full");
  modalImg.src = src;
  modal.setAttribute("aria-hidden", "false");
});

modal.addEventListener("click", (e) => {
  if (e.target.matches("[data-close='true']")) {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }
});

// Zamknięcie ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }
});

// Formularz: na GitHub Pages bez backendu tylko "symulacja".
// Potem podepniemy np. Formspree/Netlify Forms.
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.textContent = "Dziękujemy! (na razie formularz nie wysyła wiadomości — dodamy integrację).";
  form.reset();
});
