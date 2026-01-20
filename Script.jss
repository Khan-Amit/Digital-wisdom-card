// Wisdom Cards Database
const wisdomCards = [
    {
        id: 1,
        quote: "The bamboo that bends is stronger than the oak that resists.",
        author: "Japanese Proverb",
        explanation: "Flexibility in hardship creates unbreakable strength. Like bamboo in storm, bend but don't break.",
        category: "Resilience",
        color: "#2ecc71"
    },
    {
        id: 2,
        quote: "At 60, I lost everything. At 70, I created my greatest masterpiece.",
        author: "Hokusai",
        explanation: "The Japanese printmaker who created 'The Great Wave' after losing everything. Your best work may still be ahead.",
        category: "Late Bloomer",
        color: "#3498db"
    },
    {
        id: 3,
        quote: "I made myself wealthy by making my customers happy.",
        author: "Colonel Sanders, KFC Founder",
        explanation: "Started KFC at 65 after his restaurant failed. Persistence + value creation = success at any age.",
        category: "Persistence",
        color: "#e74c3c"
    },
    {
        id: 4,
        quote: "The phoenix must burn to emerge from ashes.",
        author: "Ancient Wisdom",
        explanation: "Complete destruction sometimes precedes total rebirth. What feels like an end may be a necessary beginning.",
        category: "Transformation",
        color: "#f39c12"
    },
    {
        id: 5,
        quote: "A river cuts through rock not by its power, but by its persistence.",
        author: "James N. Watkins",
        explanation: "Consistent small efforts create monumental change over time. Daily learning compounds.",
        category: "Persistence",
        color: "#9b59b6"
    },
    {
        id: 6,
        quote: "The wound is where the light enters you.",
        author: "Rumi",
        explanation: "Your greatest pain points can become sources of wisdom and connection with others.",
        category: "Healing",
        color: "#1abc9c"
    },
    {
        id: 7,
        quote: "You never know how strong you are until being strong is your only choice.",
        author: "Bob Marley",
        explanation: "Resilience isn't something you plan—it's discovered when needed most.",
        category: "Strength",
        color: "#d35400"
    },
    {
        id: 8,
        quote: "The master has failed more times than the beginner has even tried.",
        author: "Stephen McCranie",
        explanation: "Every expert's path is paved with failures. The difference is they kept going.",
        category: "Learning",
        color: "#34495e"
    },
    {
        id: 9,
        quote: "Security is not the absence of danger, but the presence of adaptability.",
        author: "Cybersecurity Principle",
        explanation: "True safety comes from being able to respond, not from avoiding all risk.",
        category: "Adaptability",
        color: "#16a085"
    },
    {
        id: 10,
        quote: "Code that heals, not harms. Systems that protect, not exploit.",
        author: "Ethical Developer's Mantra",
        explanation: "Technology should serve humanity's highest values, not its darkest impulses.",
        category: "Ethics",
        color: "#8e44ad"
    },
    {
        id: 11,
        quote: "Your digital footprint should leave flowers, not footprints.",
        author: "Modern Wisdom",
        explanation: "Create content that beautifies the digital world, not tracks or exploits.",
        category: "Digital Ethics",
        color: "#2c3e50"
    },
    {
        id: 12,
        quote: "The edge is not what you've kept, but what you've forged in fire.",
        author: "Wisdom Cards Creator",
        explanation: "Your resilience, wisdom, and adaptability are your true competitive advantages.",
        category: "Personal Power",
        color: "#c0392b"
    }
];

// DOM Elements
const currentQuote = document.getElementById('current-quote');
const currentAuthor = document.getElementById('current-author');
const currentExplanation = document.getElementById('current-explanation');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const randomBtn = document.getElementById('random-btn');
const miniCardsContainer = document.querySelector('.mini-cards');
const cardCategory = document.querySelector('.card-category');
const cardNumber = document.querySelector('.card-number');

// State
let currentCardIndex = 0;
const totalCards = wisdomCards.length;

// Initialize
function init() {
    totalCardsSpan.textContent = totalCards;
    updateCard();
    createMiniCards();
    updateProgress();
    
    // Set initial colors
    document.documentElement.style.setProperty('--card-color', wisdomCards[0].color);
}

// Create mini cards
function createMiniCards() {
    miniCardsContainer.innerHTML = '';
    
    wisdomCards.forEach((card, index) => {
        const miniCard = document.createElement('div');
        miniCard.className = `mini-card ${index === currentCardIndex ? 'active' : ''}`;
        miniCard.dataset.index = index;
        
        const miniQuote = document.createElement('div');
        miniQuote.className = 'mini-quote';
        miniQuote.textContent = card.quote.substring(0, 20) + '...';
        
        miniCard.appendChild(miniQuote);
        miniCard.addEventListener('click', () => {
            currentCardIndex = index;
            updateCard();
            updateMiniCards();
            updateProgress();
        });
        
        miniCardsContainer.appendChild(miniCard);
    });
}

// Update mini cards active state
function updateMiniCards() {
    document.querySelectorAll('.mini-card').forEach((card, index) => {
        if (index === currentCardIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Update main card
function updateCard() {
    const card = wisdomCards[currentCardIndex];
    
    currentQuote.textContent = `"${card.quote}"`;
    currentAuthor.textContent = `— ${card.author}`;
    currentExplanation.textContent = card.explanation;
    cardCategory.textContent = card.category;
    cardNumber.textContent = `#${String(card.id).padStart(3, '0')}`;
    currentCardSpan.textContent = currentCardIndex + 1;
    
    // Update progress bar color
    progressFill.style.background = `linear-gradient(90deg, ${card.color}, ${adjustColor(card.color, 20)})`;
    
    // Update category color
    cardCategory.style.background = `${adjustColor(card.color, 90)}`;
    cardCategory.style.color = card.color;
}

// Update progress
function updateProgress() {
    const percentage = ((currentCardIndex + 1) / totalCards) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Color adjustment helper
function adjustColor(color, amount) {
    let usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    
    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    
    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    currentCardIndex = currentCardIndex > 0 ? currentCardIndex - 1 : totalCards - 1;
    updateCard();
    updateMiniCards();
    updateProgress();
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = currentCardIndex < totalCards - 1 ? currentCardIndex + 1 : 0;
    updateCard();
    updateMiniCards();
    updateProgress();
});

randomBtn.addEventListener('click', () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * totalCards);
    } while (newIndex === currentCardIndex && totalCards > 1);
    
    currentCardIndex = newIndex;
    updateCard();
    updateMiniCards();
    updateProgress();
    
    // Animation effect
    randomBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        randomBtn.style.transform = 'scale(1)';
    }, 200);
});

// Fake GitHub button
document.getElementById('fake-github-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("GitHub repository coming soon! This is a practice project for learning web development and ethical coding principles.");
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        randomBtn.click();
        e.preventDefault();
    }
});

// Initialize on load
window.addEventListener('DOMContentLoaded', init);

// Add service worker for offline capability (optional future upgrade)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This would be added later when you learn about service workers
        console.log('Service Worker capability detected - ready for future offline features');
    });
}
