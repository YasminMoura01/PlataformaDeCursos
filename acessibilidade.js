// acessibilidade.js - Controles de acessibilidade sem alterar imagens

// Configurações padrão
const defaultSettings = {
  fontSize: 100,
  highContrast: false
};

// Carrega configurações
function loadSettings() {
  const savedSettings = localStorage.getItem('accessibilitySettings');
  return savedSettings ? JSON.parse(savedSettings) : {...defaultSettings};
}

// Salva configurações
function saveSettings(settings) {
  localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
}

// Aplica configurações ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  const settings = loadSettings();
  
  // Aplica tamanho da fonte
  document.documentElement.style.fontSize = settings.fontSize + '%';
  
  // Aplica contraste (não aplica filtro em imagens)
  if (settings.highContrast) {
    document.body.classList.add('high-contrast');
  }
  
  updateContrastButton(settings.highContrast);
});

// Atualiza botão de contraste
function updateContrastButton(isActive) {
  const contrastBtn = document.querySelector('#accessibility-controls button.contrast-btn');
  if (contrastBtn) {
    contrastBtn.textContent = isActive ? 'Contraste (ON)' : 'Contraste (OFF)';
    contrastBtn.style.fontWeight = isActive ? 'bold' : 'normal';
  }
}

// Controladores de tamanho de fonte
function changeFontSize(delta) {
  const settings = loadSettings();
  settings.fontSize = Math.max(50, Math.min(200, settings.fontSize + delta * 10));
  document.documentElement.style.fontSize = settings.fontSize + '%';
  saveSettings(settings);
}

function resetFontSize() {
  const settings = loadSettings();
  settings.fontSize = defaultSettings.fontSize;
  document.documentElement.style.fontSize = settings.fontSize + '%';
  saveSettings(settings);
}

// Alternador de contraste (sem afetar imagens)
function toggleContrast() {
  const settings = loadSettings();
  settings.highContrast = !settings.highContrast;
  
  document.body.classList.toggle('high-contrast', settings.highContrast);
  updateContrastButton(settings.highContrast);
  saveSettings(settings);
}

// Botão voltar ao topo
window.onscroll = function() {
  const btn = document.getElementById("back-to-top");
  if (window.scrollY > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializa controles automaticamente
function initAccessibilityControls() {
  if (!document.getElementById('accessibility-controls')) {
    const controls = document.createElement('div');
    controls.id = 'accessibility-controls';
    controls.innerHTML = `
      <button onclick="changeFontSize(-1)">A-</button>
      <button onclick="resetFontSize()">A</button>
      <button onclick="changeFontSize(1)">A+</button>
      <button class="contrast-btn" onclick="toggleContrast()">Contraste</button>
    `;
    document.body.appendChild(controls);
    
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.onclick = scrollToTop;
    backToTop.title = 'Voltar ao topo';
    backToTop.textContent = '↑';
    document.body.appendChild(backToTop);
  }
}

// Inicia os controles
initAccessibilityControls();

