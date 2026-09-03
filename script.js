// ==========================================
// WELKOMSTLOGICA (STYLING ERSTE PAGINA BESCHERMD)
// ==========================================

// 1. Functie voor index.html (Slaat de naam op na de klik)
function bewaarNaam(event) {
    event.preventDefault(); // Voorkomt dat de pagina herlaadt
    
    const inputElement = document.getElementById('visitor-name');
    if (inputElement) {
        const gekozenNaam = inputElement.value.trim();
        // Sla de naam op in de browser
        localStorage.setItem('bezoekerNaam', gekozenNaam);
        // STUUR DOOR NAAR JE PORTFOLIO PAGINA
        window.location.href = "portfolio.html"; 
    }
}

// 2. Logica die kijkt op welke pagina je bent en styling met rust laat
window.addEventListener('DOMContentLoaded', () => {
    const portfolioHeader = document.getElementById('welcome-header'); // Bestaat alleen op portfolio.html
    const indexHeader = document.getElementById('welcome-text');       // Bestaat alleen op index.html
    
    // ALS WE OP DE EERSTE PAGINA ZIJN (index.html)
    if (indexHeader) {
        // Wis de opgeslagen naam direct uit het geheugen bij terugkeer
        localStorage.removeItem('bezoekerNaam'); 
        
        // GECORRIGEERD: We veranderen de tekst NIET meer via JavaScript. 
        // We maken alleen het invoerveld leeg. De HTML behoudt zijn eigen originele styling!
        const inputElement = document.getElementById('visitor-name');
        if (inputElement) {
            inputElement.value = "";
        }
    }
    
    // ALS WE OP DE TWEEDE PAGINA ZIJN (portfolio.html)
    if (portfolioHeader) {
        const opgeslagenNaam = localStorage.getItem('bezoekerNaam');
        if (opgeslagenNaam && opgeslagenNaam !== "") {
            // Zet de naam erin met behoud van de h1-stijl op pagina 2
            portfolioHeader.innerHTML = `Welcome, ${opgeslagenNaam}!`;
        } else {
            portfolioHeader.innerHTML = "Welcome dear visitor!";
        }
    }
});

// ==========================================
// CAROUSEL LOGICA (RESET VERSIE)
// ==========================================
// Elementen selecteren
const track = document.getElementById('track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Functie om de carrousel te updaten
function updateCarousel() {
    // Schuif de track op basis van de huidige index
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Klikken op de Volgende-knop
nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Gaat terug naar de eerste slide bij het einde
    }
    updateCarousel();
});

// Klikken op de Vorige-knop
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1; // Gaat naar de laatste slide
    }
    updateCarousel();
});

// Zorg dat de carrousel responsive blijft bij het veranderen van schermgrootte
window.addEventListener('resize', updateCarousel);