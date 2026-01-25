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
  debugger;
  statusEl.textContent = "Dziękujemy za wiadomość! (na razie formularz nie wysyła wiadomości — dodamy integrację).";
  form.reset();
});


const details = {
  inwestycje: {
    title: "Doradztwo inwestycyjne",
    text: `
      <p>Pomagamy w bezpiecznym i przemyślanym inwestowaniu w nieruchomości.</p>
      <ul>
        <li>Analiza opłacalności inwestycji</li>
        <li>Wsparcie przy zakupie i sprzedaży</li>
        <li>Strategia pod wynajem lub flipping</li>
      </ul>
    `
  },
  wnetrza: {
    title: "Kompleksowe wykończenia wnętrz",
    text: `
      <p>Od projektu po klucz — bez stresu.</p>
      <p>Jak wygląda proces?</p>
      <ol>
        <li>Bezpłatne spotkanie, planowanie budżetu.</li>
        <li>Podpisanie umowy projektowej.</li>
        <li>Prace projektowe.</li>
        <li>Przedstawienie kosztorysu.</li>
        <li>Podpisanie umowy wykończeniowej.</li>
        <li>Prace wykończeniowe, nadzór koordynatora.</li>
      </ul>
    `
  },
  najem: {
    title: "Zarządzanie najmem długoterminowym",
    text: `
      <p>Ty inwestujesz, my zajmujemy się resztą.</p>
      <ul>
        <li>Dobór sprawdzonych najemców</li>
        <li>Obsługa umów i płatności</li>
        <li>Stały kontakt i opieka nad lokalem</li>
      </ul>
    `
  },
  logistyka: {
    title: "Zabezpieczenia logistyczne",
    text: `
      <p>Gwarantujemy sprawną realizację i bezpieczeństwo.</p>
      <ul>
        <li>Terminowe dostawy</li>
        <li>Sprawdzeni dostawcy</li>
        <li>Pełna kontrola procesu</li>
      </ul>
    `
  }
};

const cards = document.querySelectorAll(".card2");
const box = document.getElementById("offerDetails");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const id = card.dataset.id;
    box.innerHTML = `
      <h3>${details[id].title}</h3>
      ${details[id].text}
    `;
  });
});

//close nav-toggle after clicking on item
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  });
});