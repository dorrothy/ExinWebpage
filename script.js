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
const galleryEl = document.getElementById("gallery");
const modalCaption = document.getElementById("modalCaption");
const tiles = Array.from(galleryEl.querySelectorAll(".tile"));
let currentIndex = -1;

function showImage(index) {
  if (!tiles.length) return;
  currentIndex = (index + tiles.length) % tiles.length; // zawijanie
  const btn = tiles[currentIndex];
  modalImg.src = btn.getAttribute("data-full");
  const thumb = btn.querySelector("img");
  modalImg.alt = thumb ? thumb.alt : "Podgląd realizacji";

  // Nazwa realizacji + pozycja w obrębie projektu
  const group = btn.closest(".realizacja");
  if (modalCaption && group) {
    const titleEl = group.querySelector(".realizacja-head h3");
    const title = titleEl ? titleEl.textContent.trim() : "Realizacja";
    const groupTiles = Array.from(group.querySelectorAll(".tile"));
    const pos = groupTiles.indexOf(btn) + 1;
    modalCaption.innerHTML =
      `<span class="modal-caption-title">${title}</span>` +
      `<span class="modal-caption-count">${pos} / ${groupTiles.length}</span>`;
  } else if (modalCaption) {
    modalCaption.innerHTML = "";
  }
}

function openModal(index) {
  showImage(index);
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  currentIndex = -1;
  document.body.style.overflow = "";
}

galleryEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tile");
  if (!btn) return;
  openModal(tiles.indexOf(btn));
});

modal.addEventListener("click", (e) => {
  if (e.target.matches("[data-close='true']")) {
    closeModal();
  } else if (e.target.closest(".modal-prev")) {
    showImage(currentIndex - 1);
  } else if (e.target.closest(".modal-next")) {
    showImage(currentIndex + 1);
  }
});

// Klawiatura: Esc zamyka, strzałki przełączają zdjęcia
document.addEventListener("keydown", (e) => {
  if (modal.getAttribute("aria-hidden") !== "false") return;
  if (e.key === "Escape") closeModal();
  else if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  else if (e.key === "ArrowRight") showImage(currentIndex + 1);
});

// Formularz: na GitHub Pages bez backendu tylko "symulacja".
// Potem podepniemy np. Formspree/Netlify Forms.
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  statusEl.textContent = "Wysyłanie…";
  submitBtn.disabled = true;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const data = await res.json();

    if (data.success) {
      statusEl.textContent = "Dziękujemy! Wiadomość została wysłana.";
      form.reset();
    } else {
      statusEl.textContent =
        "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na biuro.exin@gmail.com.";
      console.error("Web3Forms:", data);
    }
  } catch (err) {
    statusEl.textContent =
      "Błąd połączenia. Spróbuj ponownie później lub napisz na biuro.exin@gmail.com.";
    console.error(err);
  } finally {
    submitBtn.disabled = false;
  }
});

const images = document.querySelectorAll(".hero-card img");
let current = 0;

setInterval(() => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
}, 4000); // Change every 4 seconds


const details = {
  inwestycje: {
    title: "Doradztwo inwestycyjne",
    text: `
      <p>Usługa przeznaczona dla osób planujących remont, zakup nieruchomości, przygotowanie
      lokalu do użytkowania, sprzedaży lub wynajmu. Celem jest ograniczenie ryzyka błędnych
      decyzji, nieprzewidzianych kosztów oraz problemów wykonawczych.</p>
      <p><strong>Zakres usługi:</strong></p>
      <ul>
        <li>Ocena stanu technicznego nieruchomości</li>
        <li>Określenie niezbędnego zakresu remontu</li>
        <li>Wstępne oszacowanie kosztów</li>
        <li>Dobór materiałów i technologii</li>
        <li>Planowanie kolejności prac</li>
        <li>Analiza funkcjonalności wnętrza</li>
        <li>Przygotowanie nieruchomości do sprzedaży lub wynajmu</li>
        <li>Wsparcie przy organizacji inwestycji</li>
      </ul>
    `
  },
  wnetrza: {
    title: "Kompleksowe wykończenie wnętrz",
    text: `
      <p>Remonty i prace wykończeniowe w mieszkaniach, domach oraz lokalach usługowych.
      Główną specjalizację EXIN stanowią prace glazurnicze — montaż płytek wielkoformatowych,
      spieków kwarcowych oraz okładzin dekoracyjnych, z wykorzystaniem specjalistycznych maszyn
      wodnych i profesjonalnych systemów montażowych.</p>
      <p><strong>Prace glazurnicze:</strong></p>
      <ul>
        <li>Układanie gresu, glazury i terakoty</li>
        <li>Montaż płytek wielkoformatowych i spieków kwarcowych</li>
        <li>Montaż kamienia i płytek dekoracyjnych</li>
        <li>Precyzyjne cięcie i obróbka materiałów</li>
        <li>Wykonywanie otworów i elementów nietypowych, cięcie narożników pod kątem</li>
        <li>Wykończenie łazienek i kuchni, hydroizolacje, fugowanie i uszczelnienia</li>
      </ul>
      <p><strong>Kompleksowe prace remontowe:</strong></p>
      <ul>
        <li>Prace hydrauliczne i elektryczne</li>
        <li>Instalacje wentylacyjne i HVAC</li>
        <li>Gładzie i przygotowanie ścian, prace malarskie</li>
        <li>Zabudowy z płyt gipsowo-kartonowych</li>
        <li>Montaż wyposażenia i prace wykończeniowe</li>
        <li>Koordynacja poszczególnych etapów remontu</li>
      </ul>
    `
  },
  najem: {
    title: "Zarządzanie najmem długoterminowym",
    text: `
      <p>Usługa dla właścicieli mieszkań i lokali przeznaczonych na wynajem długoterminowy.
      Ograniczamy zaangażowanie właściciela w codzienną obsługę, zachowując jego kontrolę
      nad najważniejszymi decyzjami.</p>
      <p><strong>Przygotowanie nieruchomości:</strong></p>
      <ul>
        <li>Ocena stanu lokalu i zakresu napraw</li>
        <li>Organizacja remontu lub odświeżenia wnętrza</li>
        <li>Przygotowanie do prezentacji i dokumentacja zdjęciowa</li>
        <li>Ustalenie proponowanej stawki najmu</li>
      </ul>
      <p><strong>Pozyskanie najemcy:</strong></p>
      <ul>
        <li>Przygotowanie i publikacja ogłoszenia, obsługa zapytań</li>
        <li>Prezentowanie nieruchomości i weryfikacja najemców</li>
        <li>Przygotowanie dokumentacji i przekazanie lokalu</li>
      </ul>
      <p><strong>Bieżąca obsługa najmu:</strong></p>
      <ul>
        <li>Kontakt z najemcą, kontrola płatności i rozliczeń</li>
        <li>Organizacja napraw i koordynacja serwisów</li>
        <li>Kontrola stanu nieruchomości i odbiór lokalu po zakończeniu najmu</li>
      </ul>
    `
  },
  b2b: {
    title: "Współpraca B2B",
    text: `
      <p>Oferta dla biur projektowych, architektów, generalnych wykonawców i deweloperów.
      Realizujemy specjalistyczne prace glazurnicze, kompleksowe wykończenia oraz wybrane etapy
      inwestycji — na podstawie dokumentacji projektowej, harmonogramu lub uzgodnionego zakresu.</p>
      <ul>
        <li>Montaż okładzin wielkoformatowych i spieków kwarcowych</li>
        <li>Realizacja lokali pod klucz i pakietów wykończeniowych</li>
        <li>Koordynacja robót i obsługa etapowych odbiorów</li>
      </ul>
      <p><a class="btn btn-ghost" href="#b2b">Zobacz pełną ofertę B2B</a></p>
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