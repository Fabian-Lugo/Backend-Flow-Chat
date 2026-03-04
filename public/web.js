const win = document.getElementById('window');
const dock = document.getElementById('mini-dock');
const safari = document.getElementById('safari-window');
const settings = document.getElementById('settings-window');
const finder = document.getElementById('finder-window');
const finderContent = document.getElementById('finder-main-content');
const overlay = document.getElementById('shutdown-overlay');

const playSnd = (id) => { 
    const s = document.getElementById(id); 
    if (s) {
        s.currentTime = 0; 
        s.play().catch(()=>{}); 
    }
};

// Función de inicio que controla el arranque
async function initApp() {
    const login = document.getElementById('login-screen');
    if (login) login.style.display = 'none';
    
    if (win) {
        win.style.display = 'flex';
        win.style.opacity = '1';
    }

    checkWindows();
    
    // Cargar Ambiente guardado
    const savedEnv = localStorage.getItem('serverEnv') || 'Production';
    const envValEl = document.getElementById('env-val');
    if (envValEl) envValEl.innerText = savedEnv;
    
    // Iniciar intervalos
    setInterval(update, 1000);
    update();
}

function checkWindows() {
    const allWins = [win, safari, settings, finder];
    const anyOpen = allWins.some(el => 
        el && el.style.display === 'flex' && !el.classList.contains('minimized')
    );
    if (dock) dock.classList.toggle('dock-hidden', anyOpen);
}

function closeAllWindows() {
    const allWins = [win, safari, settings, finder];
    allWins.forEach(el => { if (el) el.style.display = 'none'; });
    checkWindows();
}

function closeTargetApp(id) {
    playSnd('minSnd');
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'none';
        if (id === 'window') el.classList.remove('maximized', 'minimized');
    }
    checkWindows();
}

function openAppGeneral(appName) {
    playSnd('popSnd');
    closeAllWindows();
    
    let target;
    if (appName === 'finder') { target = finder; resetFinder(); }
    else if (appName === 'safari') target = safari;
    else if (appName === 'settings') target = settings;
    else if (appName === 'server') target = win;

    if (target) {
        target.style.display = 'flex';
        if (appName === 'server') {
            target.style.opacity = '1';
            target.style.transform = 'scale(1)';
        }
        checkWindows();
    }
}

function maximizeApp() { playSnd('maxSnd'); if (win) win.classList.toggle('maximized'); }

function handleOrangeBtn() {
    if (win && win.classList.contains('maximized')) {
        playSnd('minSnd');
        win.classList.remove('maximized');
    } else {
        closeApp();
    }
}


function closeApp() { closeTargetApp('window'); }
function openApp() { openAppGeneral('server'); }

// --- Dock Magic (Fisheye Effect) ---
const dockEl = document.getElementById('mini-dock');
if (dockEl) {
    dockEl.addEventListener('mousemove', (e) => {
        const icons = document.querySelectorAll('.dock-item');
        const mouseX = e.clientX;
        
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const dist = Math.abs(mouseX - iconCenterX);
            
            const scale = Math.max(1, 1.4 - (dist / 120)); 
            icon.style.transform = `scale(${scale}) translateY(${(1 - scale) * 5}px)`;
        });
    });

    dockEl.addEventListener('mouseleave', () => {
        document.querySelectorAll('.dock-item').forEach(icon => {
            icon.style.transform = 'scale(1) translateY(0)';
        });
    });
}

function resetFinder() {
    if (finderContent) {
        finderContent.innerHTML = `<div class="file-item" ondblclick="enterServerFolder()"><img class="file-icon" src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt="Folder"><span class="file-name">Server</span></div>`;
    }
}

function enterServerFolder() {
    playSnd('clickSnd');
    if (finderContent) {
        finderContent.innerHTML = `<div class="file-item" ondblclick="openAppGeneral('server')"><img class="file-icon" src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png" alt="App"><span class="file-name">Server.app</span></div><div style="width:100%; color: #999; font-size: 11px; margin-top: 10px;" onclick="resetFinder()">← Volver</div>`;
    }
}

function shutdownServer() {
    playSnd('clickSnd');
    const statusDot = document.getElementById('main-status-dot');
    if (statusDot) statusDot.classList.add('off');
    const txt = document.getElementById('status-text');
    if (txt) {
        txt.innerText = 'OFFLINE'; 
        txt.style.color = 'var(--node-red)';
    }
    if (overlay) overlay.style.display = 'flex';
    if (settings) settings.style.display = 'none';
    checkWindows();
}

function powerOn() {
    playSnd('popSnd'); 
    if (overlay) overlay.style.display = 'none';
    const statusDot = document.getElementById('main-status-dot');
    if (statusDot) statusDot.classList.remove('off');
    const txt = document.getElementById('status-text');
    if (txt) {
        txt.innerText = 'ONLINE'; 
        txt.style.color = 'var(--text-main)';
    }
}

function toggleEnv() {
    playSnd('clickSnd');
    const el = document.getElementById('env-val');
    if (el) {
        el.classList.add('text-change');
        setTimeout(() => {
            const newVal = el.innerText === 'Production' ? 'Development' : 'Production';
            el.innerText = newVal;
            localStorage.setItem('serverEnv', newVal);
            el.classList.remove('text-change');
        }, 200);
    }
}

function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockEl = document.getElementById('server-time');
    if (clockEl) clockEl.innerText = `${hours}:${minutes}:${seconds}`;

    const bday = new Date('2010-09-02'); 
    let age = now.getFullYear() - bday.getFullYear();
    if (now < new Date(now.getFullYear(), 8, 2)) age--;
    const ageEl = document.getElementById('my-age');
    if (ageEl) ageEl.innerText = age;

    const startLearning = new Date('2026-01-10');
    const diff = Math.floor((now - startLearning) / 86400000);
    const learnEl = document.getElementById('learning-days');
    if (learnEl) learnEl.innerText = Math.max(0, diff);
    
    const pingEl = document.getElementById('ping-val');
    if (pingEl) pingEl.innerText = (Math.floor(Math.random() * 8) + 1) + ' ms';
}

const interactiveSelector = '.card, .github-btn, .dock-item, .info-row, .badge, .file-item, .power-on-btn, .shutdown-btn, a, button';

document.body.addEventListener('click', (e) => {
    if (e.target.closest(interactiveSelector) || e.target.closest('.dot')) {
        if (!e.target.closest('.min, .max, .close')) playSnd('clickSnd');
    }
});

initApp();
