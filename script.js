// --- Setup and Constants ---
const anniversaryDate = new Date('2022-11-16T19:10:00');
const introOverlay = document.getElementById('intro-overlay');
const mainContent = document.getElementById('main-content');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const bgMusic = document.getElementById('bg-music');
const momentsContainer = document.querySelector('.moment-cards');

// --- Intro Logic (No Button) ---
btnNo.addEventListener('touchstart', moveNoBtn);
btnNo.addEventListener('mouseover', moveNoBtn);

function moveNoBtn(e) {
    const container = document.getElementById('btn-hitbox');
    const rect = container.getBoundingClientRect();

    // Stay within the parent container (hitbox) to avoid escaping screen
    const maxX = rect.width - btnNo.offsetWidth;
    const maxY = rect.height - btnNo.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;

    if (e.cancelable) e.preventDefault();
}

btnYes.addEventListener('click', () => {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        startCounter();
        initTypewriter();
        initMoments();
        bgMusic.play().catch(e => console.log("Music blocked", e));
        revealSections();
        drawBouquetAnimated();
    }, 1000);
});

// --- Counter Logic ---
function startCounter() {
    setInterval(() => {
        const diff = new Date() - anniversaryDate;
        document.getElementById('days').textContent = Math.floor(diff / 86400000);
        document.getElementById('hours').textContent = Math.floor((diff / 3600000) % 24).toString().padStart(2, '0');
        document.getElementById('minutes').textContent = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
        document.getElementById('seconds').textContent = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    }, 1000);
}

// --- Typewriter Logic ---
function initTypewriter() {
    const text = "Citlalli, eres lo mejor que me ha pasado. Estos 3 años y 2 meses han sido una aventura increíble. Gracias por ser mi hogar, mi calma y mi mayor alegría. Te amo por lo que eres, por cómo me cuidas y por cómo caminamos juntos. Aquí te comparto un poquito de nosotros...";
    const el = document.getElementById('typewriter');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// --- Moments Logic ---
const momentsData = [
    { img: "20221115_135616.jpg", phrase: "Si pudiera elegir un lugar seguro, sería a tu lado." },
    { img: "20230502_172836.jpg", phrase: "Te miro y me doy cuenta que jamás pensé que podría amar a alguien con tanta intensidad..." },
    { img: "20240318_143855.jpg", phrase: "Encontré el amor y la calma que tanto necesitaba, y encontré mi hogar en unos brazos que desde hace tiempo anhelaba." },
    { img: "20251116_160315.jpg", phrase: "A pesar de todo lo que hemos pasado y vivido, yo te seguiré amando siempre." }
];

function initMoments() {
    momentsData.forEach(m => {
        const card = document.createElement('div');
        card.className = 'moment-card';
        card.innerHTML = `
            <img src="Imagenes_Citla/${m.img}" loading="lazy">
            <div class="phrase">${m.phrase}</div>
        `;
        momentsContainer.appendChild(card);
    });
}

// --- Flower Bouquet Animated ---
async function drawBouquetAnimated() {
    const container = document.getElementById('flower-bouquet');
    const svgHeader = `<svg viewBox="0 0 400 400" width="100%" height="100%"><defs>
        <radialGradient id="gradRan"><stop offset="0%" stop-color="#800020"/><stop offset="100%" stop-color="#641e16"/></radialGradient>
        <radialGradient id="gradLily"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#f5f5dc"/></radialGradient>
    </defs>`;

    container.innerHTML = svgHeader + `</svg>`;
    const svg = container.querySelector('svg');

    const addElem = (html) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = html;
        g.style.opacity = "0";
        g.style.transition = "opacity 1s";
        svg.appendChild(g);
        setTimeout(() => g.style.opacity = "1", 50);
    };

    // Stems first
    addElem(`<path d="M200,400 Q180,300 150,250" stroke="#556b2f" stroke-width="3" fill="none" />`);
    await sleep(500);
    addElem(`<path d="M200,400 Q200,300 200,220" stroke="#556b2f" stroke-width="3" fill="none" />`);
    await sleep(500);
    addElem(`<path d="M200,400 Q220,300 250,250" stroke="#556b2f" stroke-width="3" fill="none" />`);

    // Petals one by one
    for (let i = 0; i < 8; i++) {
        addElem(`<ellipse cx="150" cy="270" rx="15" ry="25" fill="#fdfdfd" transform="rotate(${i * 45} 150 250)" opacity="0.9" />`);
        await sleep(300);
    }
    addElem(`<circle cx="150" cy="250" r="8" fill="#1b2631" />`);

    await sleep(500);
    addElem(`<path d="M200,220 Q220,180 200,140 Q180,180 200,220" fill="url(#gradLily)" />`);
    addElem(`<path d="M200,220 Q240,200 280,180 Q240,220 200,220" fill="url(#gradLily)" />`);
    addElem(`<path d="M200,220 Q160,200 120,180 Q160,220 200,220" fill="url(#gradLily)" />`);

    for (let i = 0; i < 10; i++) {
        addElem(`<circle cx="250" cy="${250 + i}" r="${25 - i * 2}" fill="url(#gradRan)" />`);
        await sleep(200);
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// --- Scroll Reveal ---
function revealSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(s => observer.observe(s));
}

// --- Gift Logic ---
const gifts = ["Picnic en la naturaleza", "Ver el atardecer juntos", "Una carta escrita a mano", "Cena preparada por mí", "Un día de museos", "Playlist personalizada", "Masaje relajante", "Cita sorpresa"];
const giftGrid = document.getElementById('gift-grid');
let giftChosen = false;

function initGifts() {
    [...gifts].sort(() => Math.random() - 0.5).forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.innerHTML = `<div class="gift-card-inner"><div class="gift-card-front">🎁</div><div class="gift-card-back">${gift}</div></div>`;
        card.onclick = () => {
            if (!giftChosen) {
                card.classList.add('flipped');
                giftChosen = true;
                document.getElementById('gift-reveal').classList.remove('hidden');
                document.getElementById('selected-gift-text').textContent = gift;
                setTimeout(() => document.querySelectorAll('.gift-card').forEach(c => c.classList.add('flipped')), 1000);
            }
        };
        giftGrid.appendChild(card);
    });
}
initGifts();

// --- 2D Platformer Game Logic ---
const canvas = document.getElementById('turtle-canvas');
const ctx = canvas.getContext('2d');
let gameActive = false;
let currentLevel = 0;

const levels = [
    { title: "Nivel 1: La Rutina", obstacles: ["Rutina", "Cansancio"], goal: 2000, msg: "Nada importante se construye en un día." },
    { title: "Nivel 2: Los Desafíos", obstacles: ["Distancia", "Malentendidos"], goal: 2500, msg: "Entendernos toma esfuerzo, pero vale la pena." },
    { title: "Nivel 3: El Cuidado", obstacles: ["Orgullo", "Tiempo"], goal: 3000, msg: "Lo que se cuida, crece." },
    { title: "Nivel 4: Nuestro Futuro", obstacles: ["Dudas", "Miedos"], goal: 3500, msg: "Siempre elegiré avanzar hacia ti." }
];

let player = { x: 100, y: 300, w: 60, h: 30, dy: 0, speed: 5, jump: -12, grounded: false };
let camera = { x: 0 };
let worldObstacles = [];

function initLevel() {
    player.x = 100;
    camera.x = 0;
    worldObstacles = [];
    const lvl = levels[currentLevel];
    document.getElementById('level-title').textContent = lvl.title;

    for (let i = 1; i < 10; i++) {
        worldObstacles.push({
            x: 500 * i,
            y: 350,
            text: lvl.obstacles[Math.floor(Math.random() * lvl.obstacles.length)],
            w: 100, h: 40
        });
    }
}

function updateGame() {
    if (!gameActive) return;

    // Movement
    if (keys.right) player.x += player.speed;
    if (keys.left) player.x -= player.speed;
    if (keys.jump && player.grounded) {
        player.dy = player.jump;
        player.grounded = false;
    }

    // Gravity
    player.dy += 0.6;
    player.y += player.dy;

    // Floor
    if (player.y > 350) {
        player.y = 350;
        player.dy = 0;
        player.grounded = true;
    }

    // Camera
    camera.x = player.x - 200;

    // Collisions
    worldObstacles.forEach(obs => {
        if (player.x < obs.x + obs.w && player.x + player.w > obs.x &&
            player.y < obs.y + obs.h && player.y + player.h > obs.y) {
            player.x = 100; // Reset level
        }
    });

    // Check Win Level
    if (player.x > levels[currentLevel].goal) {
        showLevelMessage();
    }
}

function showLevelMessage() {
    gameActive = false;
    const msgEl = document.getElementById('level-msg');
    msgEl.textContent = levels[currentLevel].msg;
    msgEl.classList.remove('hidden');

    setTimeout(() => {
        msgEl.classList.add('hidden');
        currentLevel++;
        if (currentLevel < levels.length) {
            initLevel();
            gameActive = true;
        } else {
            finishGame();
        }
    }, 3000);
}

function finishGame() {
    document.getElementById('game-canvas-section').classList.add('hidden');
    document.getElementById('final-love-section').classList.remove('hidden');
    document.body.classList.remove('playing-game');
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, 0);

    // Draw Floor
    ctx.fillStyle = "#556b2f";
    ctx.fillRect(camera.x, 380, canvas.width, 200);

    // Draw Turtle (Side View)
    ctx.fillStyle = "#90EE90"; // Body
    ctx.beginPath();
    ctx.ellipse(player.x + 30, player.y + 15, 30, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#228B22"; // Shell
    ctx.beginPath();
    ctx.ellipse(player.x + 25, player.y + 10, 25, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#90EE90"; // Head
    ctx.beginPath();
    ctx.arc(player.x + 60, player.y + 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw Obstacles
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "16px Montserrat";
    worldObstacles.forEach(obs => {
        ctx.fillText(obs.text, obs.x, obs.y);
    });

    // Goal
    ctx.fillStyle = "#ff4d4d";
    ctx.font = "40px Montserrat";
    ctx.fillText("❤️", levels[currentLevel].goal, 350);

    ctx.restore();
    if (gameActive) requestAnimationFrame(drawGame);
}

const keys = { left: false, right: false, jump: false };
document.getElementById('btn-left').ontouchstart = () => keys.left = true;
document.getElementById('btn-left').ontouchend = () => keys.left = false;
document.getElementById('btn-right').ontouchstart = () => keys.right = true;
document.getElementById('btn-right').ontouchend = () => keys.right = false;
document.getElementById('btn-jump').ontouchstart = () => keys.jump = true;
document.getElementById('btn-jump').ontouchend = () => keys.jump = false;

document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('game-canvas-section').classList.remove('hidden');
    document.body.classList.add('playing-game');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameActive = true;
    initLevel();
    drawGame();
    setInterval(updateGame, 1000 / 60);
};

// Hearts Background
setInterval(() => {
    const h = document.createElement('div');
    h.className = 'heart-particle';
    h.innerHTML = '❤️';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--randX', (Math.random() * 200 - 100) + 'px');
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
}, 1000);
