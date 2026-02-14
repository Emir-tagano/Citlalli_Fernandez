// --- Setup and Variables ---
const anniversaryDate = new Date('2022-11-16T19:10:00');
const introOverlay = document.getElementById('intro-overlay');
const mainContent = document.getElementById('main-content');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const bgMusic = document.getElementById('bg-music');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--randX', (Math.random() * 200 - 100) + 'px');
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 800);

// --- Intro Logic ---
btnNo.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
});

btnYes.addEventListener('click', () => {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        startCounter();
        initTypewriter();
        initGallery();
        bgMusic.play().catch(e => console.log("Music play blocked", e));
        revealSections();
    }, 1000);
});

// --- Counter Logic ---
function startCounter() {
    function update() {
        const now = new Date();
        const diff = now - anniversaryDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}

// --- Typewriter Logic ---
function initTypewriter() {
    const text = "Hola mi amor, Citlalli... Sabes, hoy es un día especial, pero para mí, todos los días lo son si estoy a tu lado. Llevamos más de 3 años construyendo algo hermoso. Eres mi niña buena, mi hogar, y aunque a veces seas un poco enojona, te amo tal cual eres. Quiero que sepas que a pesar de todo lo que hemos pasado, mi amor por ti solo crece. Mira lo que he preparado para ti...";
    const typewriter = document.getElementById('typewriter');
    let i = 0;
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// --- Scroll Reveal ---
function revealSections() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'letter-section') {
                    showScrollMessages();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

function showScrollMessages() {
    const msgs = document.querySelectorAll('.scroll-msg');
    msgs.forEach((msg, idx) => {
        setTimeout(() => {
            msg.classList.add('show');
        }, idx * 2000);
    });
}

// --- Gallery Logic ---
const images = [
    "20221115_135616.jpg", "20230502_172836.jpg", "20240318_143855.jpg",
    "20251116_160315.jpg", "20221121_113007.jpg", "20230803_183627.jpg",
    "20240309_195528.jpg", "20250125_125651.jpg", "20231118_205821.jpg",
    "20240103_143456.jpg", "20240608_165005.jpg", "20250730_231856.jpg"
];

function initGallery() {
    const gallery = document.getElementById('image-gallery');
    images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="Imagenes_Citla/${img}" alt="Momento">`;
        gallery.appendChild(div);
    });
}

// --- Gift Card Logic ---
const gifts = [
    "Viaje a la playa", "Vuelo en Helicóptero", "Cena Romántica Chef Privado",
    "Escapada a un Pueblo Mágico", "Día de Spa Completo", "Organizaré todo un viaje sorpresa",
    "Tour de Jaguares y Naturaleza", "Noche en un Hotel de Lujo"
];

const giftGrid = document.getElementById('gift-grid');
let giftChosen = false;

function initGifts() {
    const shuffled = [...gifts].sort(() => Math.random() - 0.5);
    shuffled.forEach((gift, idx) => {
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.innerHTML = `
            <div class="gift-card-inner">
                <div class="gift-card-front">🎁</div>
                <div class="gift-card-back">${gift}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            if (!giftChosen) {
                card.classList.add('flipped');
                giftChosen = true;
                document.getElementById('gift-reveal').classList.remove('hidden');
                document.getElementById('selected-gift-text').textContent = `Tu destino es: ${gift}. ¡Es una promesa!`;
                // Flip others after a delay to show what they were
                setTimeout(() => {
                    document.querySelectorAll('.gift-card').forEach(c => c.classList.add('flipped'));
                }, 1000);
            }
        });
        giftGrid.appendChild(card);
    });
}
initGifts();

// --- Flower Bouquet SVG ---
function drawBouquet() {
    const container = document.getElementById('flower-bouquet');
    const svg = `
    <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
            <radialGradient id="gradRan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#800020;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#641e16;stop-opacity:1" />
            </radialGradient>
            <radialGradient id="gradLily" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f4ece1;stop-opacity:1" />
            </radialGradient>
        </defs>
        <!-- Stems -->
        <g class="stems">
            <path d="M200,400 Q180,300 150,250" stroke="#556b2f" stroke-width="3" fill="none" />
            <path d="M200,400 Q200,300 200,220" stroke="#556b2f" stroke-width="3" fill="none" />
            <path d="M200,400 Q220,300 250,250" stroke="#556b2f" stroke-width="3" fill="none" />
        </g>
        
        <!-- Anemones (Blueish/White) -->
        <g transform="translate(150, 250)" class="flower">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="5 0 0" dur="3s" repeatCount="indefinite" additive="sum" />
            ${Array.from({ length: 8 }).map((_, i) => `<ellipse cx="0" cy="20" rx="15" ry="25" fill="#fdfdfd" transform="rotate(${i * 45})" opacity="0.9" stroke="#ccc" stroke-width="0.5" />`).join('')}
            <circle cx="0" cy="0" r="8" fill="#1b2631" />
        </g>
        
        <!-- Lilies (White/Elegance) -->
        <g transform="translate(200, 220)" class="flower">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="4s" repeatCount="indefinite" />
            <path d="M0,0 Q20,-40 0,-80 Q-20,-40 0,0" fill="url(#gradLily)" stroke="#ddd" />
            <path d="M0,0 Q40,-20 80,-40 Q40,0 0,0" fill="url(#gradLily)" transform="rotate(30)" stroke="#ddd" />
            <path d="M0,0 Q-40,-20 -80,-40 Q-40,0 0,0" fill="url(#gradLily)" transform="rotate(-30)" stroke="#ddd" />
            <circle cx="0" cy="-20" r="5" fill="#c5a059" />
        </g>
        
        <!-- Ranunculus (Wine Color) -->
        <g transform="translate(250, 250)" class="flower">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-5 0 0" dur="5s" repeatCount="indefinite" additive="sum" />
            ${Array.from({ length: 15 }).map((_, i) => `<circle cx="0" cy="${2 + i / 2}" r="${30 - i * 1.8}" fill="url(#gradRan)" opacity="${1 - i * 0.02}" stroke="#441111" stroke-width="0.2" />`).join('')}
        </g>
        
        <!-- Leaves -->
        <path d="M200,350 Q150,340 130,370 Q150,380 200,350" fill="#556b2f" opacity="0.8" />
        <path d="M200,350 Q250,340 270,370 Q250,380 200,350" fill="#556b2f" opacity="0.8" />
    </svg>`;
    container.innerHTML = svg;
}
drawBouquet();

// --- Turtle Game Logic ---
const canvas = document.getElementById('turtle-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-game-btn');
const gameContainer = document.getElementById('game-container');
const gameStory = document.getElementById('game-story');
const gameOverlay = document.getElementById('game-overlay');
const gameMsg = document.getElementById('game-msg');

const storyChunks = [
    "Había una vez una tortuguita verde marina.",
    "No era la más rápida…",
    "pero cuando se proponía algo, nunca se rinde.",
    "Un día, el corazón más importante se perdió.",
    "Y decidió ir a buscarlo."
];

let currentStoryIdx = 0;
function showStory() {
    if (currentStoryIdx < storyChunks.length) {
        gameStory.textContent = storyChunks[currentStoryIdx];
        currentStoryIdx++;
        setTimeout(showStory, 3000);
    } else {
        startBtn.classList.remove('hidden');
    }
}
showStory();

let gameRunning = false;
let turtle = { x: 50, y: 250, r: 20, speed: 4 };
let heart = { x: 750, y: 250, r: 30 };
let obstacles = [
    { text: "Celos", x: 200, y: 100, vx: 0, vy: 2 },
    { text: "Distancia", x: 400, y: 400, vx: 0, vy: -2 },
    { text: "Tareas", x: 600, y: 200, vx: 0, vy: 3 },
    { text: "Estrés", x: 300, y: 300, vx: 2, vy: 0 }
];

const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

startBtn.addEventListener('click', () => {
    gameContainer.classList.remove('hidden');
    startBtn.classList.add('hidden');
    gameRunning = true;
    gameLoop();
});

function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    if (keys['ArrowUp'] || keys['w']) turtle.y -= turtle.speed;
    if (keys['ArrowDown'] || keys['s']) turtle.y += turtle.speed;
    if (keys['ArrowLeft'] || keys['a']) turtle.x -= turtle.speed;
    if (keys['ArrowRight'] || keys['d']) turtle.x += turtle.speed;

    // Constrain
    turtle.x = Math.max(turtle.r, Math.min(800 - turtle.r, turtle.x));
    turtle.y = Math.max(turtle.r, Math.min(500 - turtle.r, turtle.y));

    // Move obstacles
    obstacles.forEach(obs => {
        obs.x += obs.vx;
        obs.y += obs.vy;
        if (obs.x < 0 || obs.x > 800) obs.vx *= -1;
        if (obs.y < 0 || obs.y > 500) obs.vy *= -1;

        // Collision
        let dx = turtle.x - obs.x;
        let dy = turtle.y - (obs.y - 10);
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < turtle.r + 20) {
            handleHit();
        }
    });

    // Check Win
    let dx = turtle.x - heart.x;
    let dy = turtle.y - heart.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < turtle.r + heart.r) {
        handleWin();
    }
}

function handleHit() {
    gameRunning = false;
    gameOverlay.classList.remove('hidden');
    gameMsg.textContent = "Eso puede complicarnos… pero no detenernos.";
    setTimeout(() => {
        turtle.x = 50;
        turtle.y = 250;
        gameOverlay.classList.add('hidden');
        gameRunning = true;
        gameLoop();
    }, 2000);
}

function handleWin() {
    gameRunning = false;
    document.getElementById('final-message').classList.remove('hidden');
    gameContainer.style.border = "5px solid var(--vino)";
    // Animation for heart growth could go here
}

function drawGame() {
    ctx.clearRect(0, 0, 800, 500);

    // Draw Heart
    ctx.fillStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.arc(heart.x, heart.y, heart.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "20px Montserrat";
    ctx.fillText("❤️", heart.x - 12, heart.y + 8);

    // Draw Turtle (Pixar style simplified: Dark Green Shell, Light Green Body)
    ctx.fillStyle = "#90EE90"; // Light green body
    ctx.beginPath();
    ctx.arc(turtle.x, turtle.y, turtle.r, 0, Math.PI * 2);
    ctx.fill();
    // Shell
    ctx.fillStyle = "#228B22"; // Dark green shell
    ctx.beginPath();
    ctx.arc(turtle.x, turtle.y, turtle.r - 5, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.fillStyle = "#90EE90";
    ctx.beginPath();
    ctx.arc(turtle.x + 15, turtle.y - 5, 10, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(turtle.x + 20, turtle.y - 7, 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw Obstacles
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Montserrat";
    obstacles.forEach(obs => {
        ctx.fillText(obs.text, obs.x - 30, obs.y);
    });
}

// Adjust canvas size
canvas.width = 800;
canvas.height = 500;
