// --- Constants & Data ---
const anniversaryDate = new Date('2022-11-16T19:10:00');
const bgMusic = document.getElementById('bg-music');

// Reasons Data (30 items, mature tone)
const reasonsData = [
    "Tu forma de ver el mundo.",
    "Cómo me aterrizas cuando me pierdo.",
    "Tu paciencia infinita conmigo.",
    "La seguridad que me transmiten tus brazos.",
    "Tu inteligencia y cómo resuelves problemas.",
    "La forma en que te emocionas por lo pequeño.",
    "Tu determinación para nunca rendirte.",
    "Cómo cuidas de los animales con tanta ternura.",
    "Tu carisma natural.",
    "La paz que siento cuando estamos en silencio.",
    "Tu mentalidad madura y centrada.",
    "Cómo me haces sentir que todo estará bien.",
    "Tu sonrisa que desarma cualquier enojo.",
    "La complicidad que tenemos sin hablar.",
    "Cómo respetas mis espacios y tiempos.",
    "Tu honestidad, aunque a veces duela.",
    "La forma en que planeas nuestro futuro.",
    "Tu lealtad incondicional.",
    "Cómo me escuchas incluso cuando no tengo razón.",
    "Tu fuerza ante las adversidades.",
    "La ternura que escondes detrás de tu carácter.",
    "Tu capacidad de perdonar y avanzar.",
    "Cómo te ves cuando estás concentrada.",
    "Tu curiosidad por aprender cosas nuevas.",
    "La forma en que me haces querer ser mejor.",
    "Tu apoyo constante en mis proyectos.",
    "Cómo hablas de lo que te apasiona.",
    "Tu sentido del humor, incluso en días malos.",
    "La valentía que tienes para enfrentar miedos.",
    "Simplemente, el hecho de que seas tú."
];

// Photo Narrative Data (Firm phrases)
const narrativeData = [
    { img: "20221115_135616.jpg", text: "No todo fue perfecto." },
    { img: "20230502_172836.jpg", text: "Pero siempre fue real." },
    { img: "20231118_205821.jpg", text: "Y eso es lo que importa." },
    { img: "20240318_143855.jpg", text: "Construimos algo sólido." },
    { img: "20250125_125651.jpg", text: "Paso a paso." },
    { img: "20251116_160315.jpg", text: "Hacia un mismo destino." }
];

// Gifts Data (Mature options)
const giftsData = [
    { title: "Cena preparada por mí", desc: "Una noche sin prisas. Solo nosotros." },
    { title: "Escapada a un hotel boutique", desc: "Tiempo de calidad para desconectar." },
    { title: "Vuelo en helicóptero", desc: "Una perspectiva diferente del mundo." },
    { title: "Cata de vinos privada", desc: "Sabores compartidos en pareja." },
    { title: "Tour de conservación silvestre", desc: "Viendo jaguares en su hábitat natural." },
    { title: "Masaje de spa profesional", desc: "Relajación absoluta después del estrés." },
    { title: "Viaje sorpresa", desc: "Yo organizo todo, tú solo disfruta." },
    { title: "Book de fotos profesional", desc: "Capturando nuestra historia para siempre." }
];

// --- Phase Management ---
let currentPhase = 'init';

function showPhase(id) {
    document.querySelectorAll('.phase, .phase-scroll, .phase-reasons').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

// --- Phase 1: Init ---
const initPreText = document.getElementById('init-pre-text');
const initQuestion = document.getElementById('init-question-container');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');

setTimeout(() => {
    initPreText.classList.add('hidden');
    initQuestion.classList.remove('hidden');
}, 3000);

btnNo.addEventListener('touchstart', moveNo);
btnNo.addEventListener('mouseover', moveNo);

function moveNo(e) {
    const hitbox = document.getElementById('btn-hitbox');
    const rect = hitbox.getBoundingClientRect();
    const maxX = rect.width - btnNo.offsetWidth;
    const maxY = rect.height - btnNo.offsetHeight;

    btnNo.style.left = Math.random() * maxX + 'px';
    btnNo.style.top = Math.random() * maxY + 'px';
    if (e.cancelable) e.preventDefault();
}

btnYes.addEventListener('click', () => {
    bgMusic.play().catch(() => { });
    startBouquetRitual();
});

// --- Phase 2: Bouquet Ritual ---
async function startBouquetRitual() {
    showPhase('phase-bouquet');
    const container = document.getElementById('animated-bouquet');
    const svgHeader = `<svg viewBox="0 0 400 600" width="100%" height="100%"><defs>
        <radialGradient id="gradRan"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#fdfdfd"/></radialGradient>
        <radialGradient id="gradLily"><stop offset="0%" stop-color="#f0c2d1"/><stop offset="100%" stop-color="#e0a0b0"/></radialGradient>
    </defs>`;
    container.innerHTML = svgHeader + `</svg>`;
    const svg = container.querySelector('svg');

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const addLayer = (html) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = html;
        g.style.opacity = "0";
        g.style.transition = "opacity 1.5s ease";
        svg.appendChild(g);
        setTimeout(() => g.style.opacity = "1", 50);
    };

    // Stems & Leaves (Olive)
    addLayer(`<path d="M200,600 Q180,450 150,350" stroke="#556b2f" stroke-width="3" fill="none" />`);
    await sleep(800);
    addLayer(`<path d="M200,600 Q200,450 210,320" stroke="#556b2f" stroke-width="3" fill="none" />`);
    await sleep(800);
    addLayer(`<path d="M200,600 Q230,480 280,380" stroke="#556b2f" stroke-width="3" fill="none" />`);
    await sleep(1000);

    // Lirio (Pinkish)
    addLayer(`<g transform="translate(150,350)">
        <path d="M0,0 Q30,-60 0,-120 Q-30,-60 0,0" fill="url(#gradLily)" />
        <path d="M0,0 Q60,-30 120,0 Q60,30 0,0" fill="url(#gradLily)" transform="rotate(-40)" />
        <path d="M0,0 Q-30,-60 -60,-120 Q-60,0 0,0" fill="url(#gradLily)" transform="rotate(-30)" />
    </g>`);
    await sleep(1200);

    // Anémona (White / Dark Center)
    addLayer(`<g transform="translate(210,320)">
        ${Array.from({ length: 8 }).map((_, i) => `<ellipse cx="0" cy="25" rx="20" ry="35" fill="white" transform="rotate(${i * 45})" stroke="#eee" />`).join('')}
        <circle cx="0" cy="0" r="12" fill="#1b2631" />
    </g>`);
    await sleep(1200);

    // Ranúnculo (Layered White)
    addLayer(`<g transform="translate(280,380)">
        ${Array.from({ length: 12 }).map((_, i) => `<circle cx="0" cy="${i * 2}" r="${35 - i * 2.5}" fill="white" stroke="#f0f0f0" />`).join('')}
    </g>`);

    await sleep(1500);
    document.getElementById('bouquet-text').classList.remove('hidden');
    await sleep(3000);
    startCounterPhase();
}

// --- Phase 3 & 4: Counter & Letter ---
function startCounterPhase() {
    showPhase('phase-counter');
    updateCounter();
    setInterval(updateCounter, 1000);
    setTimeout(startLetterPhase, 5000);
}

function updateCounter() {
    const diff = new Date() - anniversaryDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
}

function startLetterPhase() {
    showPhase('phase-letter');
    const text = "Citlalli, han pasado más de tres años desde que decidimos recorrer este camino juntos. Durante este tiempo, he aprendido que el amor no es una emoción pasajera, sino una elección consciente de cada día. Eres mi hogar, mi refugio y la persona con la que quiero seguir construyendo realidades. No todo ha sido perfecto, pero siempre ha sido real, y eso es lo que le da valor a nuestra historia. Gracias por ser tú, por tu paciencia y por caminar a mi lado.";
    const el = document.getElementById('typewriter');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        } else {
            setTimeout(initNarrative, 3000);
        }
    }
    type();
}

// --- Phase 5: Narrative ---
function initNarrative() {
    showPhase('phase-narrative');
    const container = document.getElementById('phase-narrative');
    narrativeData.forEach((item, idx) => {
        const section = document.createElement('div');
        section.className = 'narrative-item';
        section.innerHTML = `
            <img src="Imagenes_Citla/${item.img}" class="narrative-img" loading="lazy">
            <p class="playfair narrative-text">${item.text}</p>
        `;
        container.appendChild(section);
        if (idx < narrativeData.length - 1) {
            const div = document.createElement('div');
            div.className = 'section-divider';
            container.appendChild(div);
        }
    });

    // Intersection Observer for scroll transition to Reasons
    const lastItem = container.lastElementChild;
    const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(initReasons, 3000);
            obs.disconnect();
        }
    }, { threshold: 1 });
    obs.observe(lastItem);
}

// --- Phase 6: Reasons ---
function initReasons() {
    showPhase('phase-reasons');
    const container = document.getElementById('reasons-container');
    reasonsData.forEach((reason, idx) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <span class="reason-number">${(idx + 1).toString().padStart(2, '0')}</span>
            <span class="reason-text">${reason}</span>
        `;
        container.appendChild(card);
    });

    const cards = document.querySelectorAll('.reason-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    cards.forEach(c => obs.observe(c));

    // After last reason, show gifts
    const lastCard = cards[cards.length - 1];
    const obsGifts = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(initGifts, 3000);
            obsGifts.disconnect();
        }
    }, { threshold: 1 });
    obsGifts.observe(lastCard);
}

// --- Phase 7: Gifts ---
let giftSelected = false;
function initGifts() {
    showPhase('phase-gifts');
    const grid = document.getElementById('gift-grid');
    giftsData.forEach((gift, idx) => {
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.innerText = gift.title;
        card.onclick = () => {
            if (!giftSelected) {
                giftSelected = true;
                selectGift(card, gift);
            }
        };
        grid.appendChild(card);
    });
}

function selectGift(card, data) {
    document.querySelectorAll('.gift-card').forEach(c => {
        if (c !== card) c.classList.add('dimmed');
    });
    card.classList.add('selected');
    const reveal = document.getElementById('gift-reveal');
    reveal.classList.remove('hidden');
    document.getElementById('selected-gift-text').innerText = data.desc;

    setTimeout(() => showPhase('game-intro-screen'), 5000);
}

// --- Phase 8: Game Constancia ---
const canvas = document.getElementById('constancia-canvas');
const ctx = canvas.getContext('2d');
let gameActive = false;
let gameLvl = 0;
const gameLevels = [
    { title: "Nivel 1: Los Inicios", obstacles: ["Cansancio", "Rutina"], goal: 2000, msg: "Las cosas simples también requieren cuidado." },
    { title: "Nivel 2: La Construcción", obstacles: ["Malentendidos", "Orgullo"], goal: 4000, msg: "Entendernos es parte del proceso." },
    { title: "Nivel 3: El Compromiso", obstacles: ["Distancia", "Tiempo"], goal: 6000, msg: "Siempre voy a avanzar hacia ti." }
];

let turtle = { x: 50, y: 0, w: 40, h: 20, dy: 0, grounded: false };
let obstacles = [];
let worldOffset = 0;

function setupGame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    turtle.y = canvas.height * 0.7;
    obstacles = [];
    const lvl = gameLevels[gameLvl];
    document.getElementById('level-display').innerText = lvl.title;

    // Generate obstacles
    for (let i = 1; i < 15; i++) {
        obstacles.push({
            x: 400 * i + Math.random() * 200,
            text: lvl.obstacles[Math.floor(Math.random() * lvl.obstacles.length)],
            w: 100
        });
    }
}

function gameLoop() {
    if (!gameActive) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Auto advance
    turtle.x += 3;

    // Jump logic
    turtle.dy += 0.5; // Gravity
    turtle.y += turtle.dy;

    const floorY = canvas.height * 0.7;
    if (turtle.y > floorY) {
        turtle.y = floorY;
        turtle.dy = 0;
        turtle.grounded = true;
    }

    worldOffset = turtle.x - 100;

    // Collisions
    obstacles.forEach(obs => {
        if (turtle.x + turtle.w > obs.x && turtle.x < obs.x + obs.w &&
            turtle.y + turtle.h > floorY - 20) {
            handleCollision();
        }
    });

    // Check Win
    if (turtle.x > gameLevels[gameLvl].goal) {
        handleWinLevel();
    }
}

function handleCollision() {
    gameActive = false;
    const msg = document.getElementById('game-msg-container');
    const text = document.getElementById('game-phase-msg');
    msg.classList.remove('hidden');
    text.innerText = "Intentemos de nuevo.";
    setTimeout(() => {
        msg.classList.add('hidden');
        turtle.x = 50;
        gameActive = true;
        gameLoop();
    }, 1500);
}

function handleWinLevel() {
    gameActive = false;
    const msg = document.getElementById('game-msg-container');
    const text = document.getElementById('game-phase-msg');
    msg.classList.remove('hidden');
    text.innerText = gameLevels[gameLvl].msg;

    setTimeout(() => {
        msg.classList.add('hidden');
        gameLvl++;
        if (gameLvl < gameLevels.length) {
            setupGame();
            gameActive = true;
            gameLoop();
        } else {
            showFinal();
        }
    }, 3000);
}

function draw() {
    ctx.fillStyle = '#1b2631';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-worldOffset, 0);

    // Floor
    ctx.strokeStyle = '#556b2f';
    ctx.beginPath();
    ctx.moveTo(worldOffset, canvas.height * 0.7 + 20);
    ctx.lineTo(worldOffset + canvas.width, canvas.height * 0.7 + 20);
    ctx.stroke();

    // Turtle (Pixel-ish)
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(turtle.x, turtle.y, turtle.w, turtle.h);
    ctx.fillStyle = '#228B22';
    ctx.fillRect(turtle.x + 5, turtle.y - 5, 25, 10); // Shell

    // Obstacles
    ctx.fillStyle = 'white';
    ctx.font = '14px Montserrat';
    obstacles.forEach(obs => {
        ctx.fillText(obs.text, obs.x, canvas.height * 0.7 + 10);
        ctx.fillRect(obs.x, canvas.height * 0.7 + 15, obs.w, 2);
    });

    // Heart Goal
    ctx.fillStyle = '#ff4d4d';
    ctx.font = '30px Montserrat';
    ctx.fillText("❤️", gameLevels[gameLvl].goal, canvas.height * 0.7);

    ctx.restore();
}

window.addEventListener('touchstart', () => {
    if (gameActive && turtle.grounded) {
        turtle.dy = -10;
        turtle.grounded = false;
    }
});

document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('game-intro-screen').classList.add('hidden');
    document.getElementById('game-canvas-screen').classList.remove('hidden');
    gameActive = true;
    gameLvl = 0;
    setupGame();
    gameLoop();
};

function showFinal() {
    document.getElementById('game-canvas-screen').classList.add('hidden');
    showPhase('phase-final');
}

document.getElementById('restart-btn').onclick = () => location.reload();

// Orientation Handler
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const msg = document.getElementById('orientation-message');
    if (gameActive && isPortrait) {
        msg.style.display = 'flex';
    } else {
        msg.style.display = 'none';
    }
}
window.addEventListener('resize', checkOrientation);
setInterval(checkOrientation, 1000);
