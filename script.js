// --- Setup ---
const anniversaryDate = new Date('2022-11-16T19:10:00');
const introOverlay = document.getElementById('intro-overlay');
const mainContent = document.getElementById('main-content');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const bgMusic = document.getElementById('bg-music');

// --- No Button Logic (Smooth and within bounds) ---
function moveNoBtn(e) {
    const hitbox = document.getElementById('btn-hitbox');
    const rect = hitbox.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = rect.width - btnRect.width;
    const maxY = rect.height - btnRect.height;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;

    if (e) e.preventDefault();
}
btnNo.addEventListener('touchstart', moveNoBtn);
btnNo.addEventListener('mouseover', moveNoBtn);

btnYes.addEventListener('click', () => {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        startCounter();
        initTypewriter();
        initAlbum();
        initLoveList();
        initGifts();
        renderBouquet();
        bgMusic.play().catch(() => { });
        revealSections();
    }, 1000);
});

// --- Counter ---
function startCounter() {
    setInterval(() => {
        const diff = new Date() - anniversaryDate;
        document.getElementById('days').textContent = Math.floor(diff / 86400000);
        document.getElementById('hours').textContent = Math.floor((diff / 3600000) % 24).toString().padStart(2, '0');
        document.getElementById('minutes').textContent = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
        document.getElementById('seconds').textContent = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    }, 1000);
}

// --- Typewriter (More Human) ---
function initTypewriter() {
    const text = "Citla, no soy de muchas palabras, pero queria hacerte algo que pudieras guardar. Estos tres años han sido increibles a tu lado. Gracias por estar conmigo en las buenas y en las malas. Te quiero muchisimo y espero que esto te guste.";
    const el = document.getElementById('typewriter');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 60);
        }
    }
    type();
}

// --- Professional SVG Bouquet ---
function renderBouquet() {
    const container = document.getElementById('flower-bouquet');
    const svg = `
    <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
            <radialGradient id="gradVino" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#800020"/><stop offset="100%" stop-color="#641e16"/>
            </radialGradient>
            <radialGradient id="gradCreme" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#f5f5dc"/>
            </radialGradient>
            <filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/></filter>
        </defs>
        <!-- Stems -->
        <g stroke="#556b2f" stroke-width="2.5" fill="none" class="stems">
            <path d="M200,400 Q180,300 150,220" />
            <path d="M200,400 Q200,300 200,180" />
            <path d="M200,400 Q220,300 250,220" />
        </g>
        <!-- Ranunculus (Wine) -->
        <g transform="translate(150, 220)" filter="url(#shadow)">
            ${Array.from({ length: 12 }).map((_, i) => `<circle cx="0" cy="${i * 0.5}" r="${28 - i * 2}" fill="url(#gradVino)" />`).join('')}
            <circle cx="0" cy="0" r="4" fill="#4a0f0a" />
        </g>
        <!-- Lily (Center White) -->
        <g transform="translate(200, 180)" filter="url(#shadow)">
            <path d="M0,0 Q30,-60 0,-120 Q-30,-60 0,0" fill="url(#gradCreme)" />
            <path d="M0,0 Q60,-30 120,-60 Q60,0 0,0" fill="url(#gradCreme)" transform="rotate(40)" />
            <path d="M0,0 Q-60,-30 -120,-60 Q-60,0 0,0" fill="url(#gradCreme)" transform="rotate(-40)" />
            <circle cx="0" cy="-40" r="6" fill="#c5a059" />
        </g>
        <!-- Anemone (Blueish/Dark) -->
        <g transform="translate(250, 220)" filter="url(#shadow)">
            ${Array.from({ length: 8 }).map((_, i) => `<ellipse cx="0" cy="25" rx="15" ry="30" fill="#fdfdfd" transform="rotate(${i * 45})" opacity="0.95" />`).join('')}
            <circle cx="0" cy="0" r="12" fill="#1b2631" />
        </g>
        <!-- Filler Flowers -->
        <circle cx="170" cy="150" r="5" fill="#c5a059" />
        <circle cx="230" cy="160" r="4" fill="#c5a059" />
    </svg>`;
    container.innerHTML = svg;
}

// --- Album (Many photos) ---
const photos = [
    "20221115_135616.jpg", "20230502_172836.jpg", "20240318_143855.jpg", "20251116_160315.jpg",
    "20221121_113007.jpg", "20230803_183627.jpg", "20240309_195528.jpg", "20250125_125651.jpg",
    "20221217_140218.jpg", "20230127_190130.jpg", "20231118_205821.jpg", "20231216_220806.jpg",
    "20240318_152746.jpg", "20240514_180943.jpg", "20240608_165005.jpg", "20250730_231856.jpg"
];
function initAlbum() {
    const container = document.getElementById('album-container');
    photos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'moment-card';
        div.innerHTML = `<img src="Imagenes_Citla/${p}" loading="lazy">`;
        container.appendChild(div);
    });
}

// --- 30 Reasons ---
const reasons = [
    "Tu carisma que llena cualquier lugar.", "Tu mentalidad tan fuerte y madura.", "Tu sonrisa, que es mi parte favorita de ti.", "Como me haces sentir cuando estamos bien.",
    "Tu inteligencia para resolver cualquier problema.", "Tu forma de cuidar a los animales.", "Tu paciencia (aunque a veces seas enojona).", "Lo linda que eres cuando te despiertas.",
    "Tu determinacion para lograr tus metas.", "Como me escuchas cuando mas lo necesito.", "Tus abrazos que me dan paz.", "Tu estilo tan elegante y unico.",
    "Lo trabajadora que eres.", "Que siempre buscas aprender algo nuevo.", "Tu risa que me contagia.", "Como me apoyas en mis locuras.",
    "Tus ojos que brillan cuando hablas de lo que te gusta.", "Tu forma de caminar con tanta seguridad.", "Que eres mi mejor amiga ademas de mi novia.", "Nuestras platicas infinitas.",
    "Los viajes que hemos hecho juntos.", "Lo bien que hueles siempre.", "Que nunca te rinder ante la adversidad.", "Como cuidas a tu familia.",
    "Que eres una persona integra y honesta.", "Tu sentido del humor.", "Lo detallista que eres sin darte cuenta.", "Tu hogar que encontre en ti.",
    "Que me haces querer ser una mejor version de mi.", "Simplemente, que eres tu."
];
let currentReason = 0;
function initLoveList() {
    const display = document.getElementById('love-item-display');
    const btn = document.getElementById('next-love-btn');
    btn.onclick = () => {
        currentReason = (currentReason + 1) % reasons.length;
        display.style.opacity = '0';
        setTimeout(() => {
            display.textContent = reasons[currentReason];
            display.style.opacity = '1';
        }, 300);
    };
}

// --- Surprises ---
const rewards = ["Escapada a un hotel boutique", "Masaje profesional en pareja", "Cena en el restaurante que tu elijas", "Vuelo en globo al amanecer", "Un dia de aventura sorpresa", "Cena romantica privada", "Un regalo sorpresa que te encantara", "Experiencia de spa premium"];
function initGifts() {
    const grid = document.getElementById('gift-grid');
    let chosen = false;
    [...rewards].sort(() => Math.random() - 0.5).forEach(r => {
        const div = document.createElement('div');
        div.className = 'gift-card';
        div.innerHTML = `<div class="gift-card-inner"><div class="gift-card-front">?</div><div class="gift-card-back">${r}</div></div>`;
        div.onclick = () => {
            if (!chosen) {
                div.classList.add('flipped');
                chosen = true;
                document.getElementById('gift-reveal').classList.remove('hidden');
                document.getElementById('selected-gift-text').textContent = "Tu sorpresa: " + r;
                setTimeout(() => document.querySelectorAll('.gift-card').forEach(c => c.classList.add('flipped')), 1000);
            }
        };
        grid.appendChild(div);
    });
}

// --- Mario Style Game ---
const canvas = document.getElementById('turtle-canvas');
const ctx = canvas.getContext('2d');
let gameActive = false;
let currentLvl = 1;
let player = { x: 50, y: 300, w: 40, h: 40, dy: 0, grounded: false, speed: 4 };
let cameraX = 0;
let obstacles = [];

function initLevel() {
    player.x = 50; cameraX = 0;
    obstacles = [];
    const texts = currentLvl === 1 ? ["Rutina", "Tareas"] : ["Distancia", "Orgullo"];
    for (let i = 0; i < 10; i++) {
        obstacles.push({ x: 600 * (i + 1), y: 320, text: texts[Math.floor(Math.random() * texts.length)], w: 80, h: 80, active: true });
    }
}

function updateGame() {
    if (!gameActive) return;
    if (keys.right) player.x += player.speed;
    if (keys.left) player.x -= player.speed;
    if (keys.jump && player.grounded) { player.dy = -14; player.grounded = false; }

    player.dy += 0.7; // Gravity
    player.y += player.dy;

    if (player.y > 300) { player.y = 300; player.dy = 0; player.grounded = true; }

    cameraX = player.x - 150;

    obstacles.forEach(obs => {
        if (!obs.active) return;
        if (player.x < obs.x + obs.w && player.x + player.w > obs.x && player.y < obs.y + obs.h && player.y + player.h > obs.y) {
            if (player.dy > 0 && player.y < obs.y) { // Jump on top
                obs.active = false;
                player.dy = -10;
            } else { player.x = 50; } // Die
        }
    });

    if (player.x > 6000) {
        if (currentLvl < 3) { currentLvl++; initLevel(); } else { finishGame(); }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background (Blue)
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-cameraX, 0);

    // Clouds
    ctx.fillStyle = "white";
    for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(i * 400, 100, 30, 0, Math.PI * 2); ctx.fill(); }

    // Floor
    ctx.fillStyle = "#556b2f";
    ctx.fillRect(cameraX, 340, canvas.width, 100);

    // Obstacles (Blocks/Enemies)
    obstacles.forEach(obs => {
        if (!obs.active) return;
        ctx.fillStyle = "#641e16";
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.fillStyle = "white";
        ctx.font = "14px Montserrat";
        ctx.fillText(obs.text, obs.x + 5, obs.y + 45);
    });

    // Turtle (Side)
    ctx.fillStyle = "#90EE90";
    ctx.beginPath(); ctx.ellipse(player.x + 20, player.y + 25, 20, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#228B22";
    ctx.beginPath(); ctx.ellipse(player.x + 15, player.y + 20, 18, 12, 0, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
    if (gameActive) requestAnimationFrame(drawGame);
}

const keys = { left: false, right: false, jump: false };
document.getElementById('btn-left').onpointerdown = () => keys.left = true;
document.getElementById('btn-left').onpointerup = () => keys.left = false;
document.getElementById('btn-right').onpointerdown = () => keys.right = true;
document.getElementById('btn-right').onpointerup = () => keys.right = false;
document.getElementById('btn-jump').onpointerdown = () => { keys.jump = true; setTimeout(() => keys.jump = false, 100); };

document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('game-canvas-section').classList.remove('hidden');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameActive = true;
    initLevel();
    drawGame();
    setInterval(updateGame, 1000 / 60);
};

function finishGame() {
    gameActive = false;
    document.getElementById('game-canvas-section').classList.add('hidden');
    alert("Te amo Citlalli. Siempre avanzaremos juntos.");
}

function revealSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(s => observer.observe(s));
}
