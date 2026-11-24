/**
 * A ROLETA DA ENERGIA - TURMA 902
 * Lógica da Roleta, Física do Giro, Áudio Sintetizado e Sistema de Quiz
 */

(function () {
  'use strict';

  // ==========================================
  // CONFIGURAÇÕES & ESTADO
  // ==========================================
  const canvas = document.getElementById('rouletteCanvas');
  const ctx = canvas.getContext('2d');
  const pointerEl = document.getElementById('wheelPointer');

  const btnSpin = document.getElementById('btnSpin');
  const btnCheckAnswer = document.getElementById('btnCheckAnswer');
  const btnNextRound = document.getElementById('btnNextRound');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const btnOpenFolder = document.getElementById('btnOpenFolder');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnModalUnderstood = document.getElementById('btnModalUnderstood');
  const folderModal = document.getElementById('folderModal');
  const btnFullscreen = document.getElementById('btnFullscreen');

  // Elementos do Quiz
  const idleCard = document.getElementById('idleCard');
  const quizCard = document.getElementById('quizCard');
  const sectorBanner = document.getElementById('sectorBanner');
  const sectorIcon = document.getElementById('sectorIcon');
  const sectorTitle = document.getElementById('sectorTitle');
  const sectorSubtitle = document.getElementById('sectorSubtitle');
  const questionText = document.getElementById('questionText');
  const optionsGrid = document.getElementById('optionsGrid');
  const feedbackPanel = document.getElementById('feedbackPanel');
  const feedbackHeader = document.getElementById('feedbackHeader');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackSubtitle = document.getElementById('feedbackSubtitle');
  const explanationText = document.getElementById('explanationText');
  const didYouKnowText = document.getElementById('didYouKnowText');

  // Placar
  const statRounds = document.getElementById('statRounds');
  const statCorrect = document.getElementById('statCorrect');
  const statEfficiency = document.getElementById('statEfficiency');

  let roundsCount = 0;
  let correctCount = 0;

  // Estado da Roleta
  const numSectors = SECTORS_DATA.length; // 6
  const arcSize = (2 * Math.PI) / numSectors; // 60 graus cada
  let currentRotation = 0; // radianos
  let isSpinning = false;
  let spinAnimationId = null;
  let lastSectorIndexPassed = -1;

  // Estado do Quiz Atual
  let currentSector = null;
  let currentQuestion = null;
  let selectedOptionIndex = null;
  let isAnswerVerified = false;
  let questionHistory = {}; // setorId -> array de indices já usados

  // Áudio Sintetizado (Web Audio API)
  let audioEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.1) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context não disponível ou bloqueado
    }
  }

  function playTickSound() {
    if (!audioEnabled) return;
    initAudio();
    // Som seco e curto de ponteiro batendo no pino
    playTone(850 + Math.random() * 150, 0.04, 'triangle', 0.12);
    // Efeito visual no ponteiro
    if (pointerEl) {
      pointerEl.classList.add('ticking');
      setTimeout(() => pointerEl.classList.remove('ticking'), 60);
    }
  }

  function playSpinStartSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  }

  function playCorrectFanfare() {
    if (!audioEnabled) return;
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Dó, Mi, Sol, Dó alto
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.3, 'triangle', 0.16);
      }, idx * 110);
    });
  }

  function playWrongSound() {
    if (!audioEnabled) return;
    initAudio();
    const notes = [440, 370, 311]; // Descendente
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.25, 'sawtooth', 0.08);
      }, idx * 120);
    });
  }

  function playClickSound() {
    if (!audioEnabled) return;
    initAudio();
    playTone(500, 0.03, 'sine', 0.08);
  }

  // ==========================================
  // DESENHO DA ROLETA NO CANVAS
  // ==========================================
  function setupCanvasDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const size = rect.width || 520;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    drawRoulette(currentRotation);
  }

  function drawRoulette(angle) {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 14;

    ctx.clearRect(0, 0, width, height);

    // Borda Externa Metálica com Sombra
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // Aro Dourado Externo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 3, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();
    ctx.restore();

    // Desenhar os 6 Setores
    for (let i = 0; i < numSectors; i++) {
      const sector = SECTORS_DATA[i];
      const startAngle = angle + i * arcSize;
      const endAngle = startAngle + arcSize;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Gradiente suave no setor
      const midAngle = startAngle + arcSize / 2;
      const grad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.2,
        centerX + Math.cos(midAngle) * radius,
        centerY + Math.sin(midAngle) * radius,
        radius
      );
      grad.addColorStop(0, lightenColor(sector.color, 25));
      grad.addColorStop(1, sector.color);

      ctx.fillStyle = grad;
      ctx.fill();

      // Linha separadora branca nítida
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.restore();

      // Textos e Ícones do Setor
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);

      // Ícone do setor
      ctx.font = '26px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sector.icon, radius * 0.76, 0);

      // Nome do setor
      ctx.rotate(0); // alinhado ao raio
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.font = 'bold 15px Montserrat, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Encurtar nome se necessário para caber bonito
      const label = sector.id + '. ' + sector.name.toUpperCase();
      ctx.fillText(label, radius * 0.62, 0);

      ctx.restore();
    }

    // Pinos Periféricos Decorativos (12 pinos)
    const numPins = 18;
    for (let p = 0; p < numPins; p++) {
      const pinAngle = angle + (p * 2 * Math.PI) / numPins;
      const pinX = centerX + Math.cos(pinAngle) * (radius + 2);
      const pinY = centerY + Math.sin(pinAngle) * (radius + 2);

      ctx.save();
      ctx.beginPath();
      ctx.arc(pinX, pinY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
  }

  // Utilitário para clarear cor hex
  function lightenColor(col, amt) {
    let usePound = false;
    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00ff) + amt;
    let g = (num & 0x0000ff) + amt;
    r = Math.min(255, Math.max(0, r));
    b = Math.min(255, Math.max(0, b));
    g = Math.min(255, Math.max(0, g));
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
  }

  // ==========================================
  // FÍSICA E ANIMAÇÃO DO GIRO
  // ==========================================
  // O ponteiro fica no topo (ângulo de 270° ou -90° / 3PI/2 radianos)
  function getSectorAtPointer(rotAngle) {
    const twoPi = 2 * Math.PI;
    const normalized = (rotAngle % twoPi + twoPi) % twoPi;
    // O ponteiro está em 270° (3 * Math.PI / 2)
    // O ângulo sob o ponteiro em coordenadas locais da roleta é:
    const pointerAngle = (3 * Math.PI / 2 - normalized + twoPi) % twoPi;
    const sectorIndex = Math.floor(pointerAngle / arcSize) % numSectors;
    return sectorIndex;
  }

  function spinWheel() {
    if (isSpinning) return;
    initAudio();
    playSpinStartSound();

    isSpinning = true;
    btnSpin.disabled = true;
    btnSpin.classList.add('spinning');

    // Desabilitar botões enquanto gira
    if (btnCheckAnswer) btnCheckAnswer.disabled = true;
    if (btnNextRound) btnNextRound.disabled = true;

    // Se estiver mostrando quiz anterior, esconder para foco na roleta
    quizCard.classList.add('hidden');
    idleCard.classList.remove('hidden');

    // Selecionar setor aleatório alvo (0 a 5)
    const targetSectorIndex = Math.floor(Math.random() * numSectors);

    // Calcular rotação alvo garantindo pelo menos 5 a 8 voltas completas
    const minSpins = 6 + Math.floor(Math.random() * 3); // 6 a 8 voltas
    const targetCenterAngle = (targetSectorIndex + 0.5) * arcSize; // meio do setor
    const twoPi = 2 * Math.PI;

    // Calcular ângulo final que alinha o meio da fatia com o topo (270°)
    let finalRotation = (minSpins * twoPi) + (3 * Math.PI / 2) - targetCenterAngle;
    // Pequena variação aleatória suave para não parar SEMPRE no exato centro milimétrico (permanecendo seguro dentro da fatia)
    const jitter = (Math.random() - 0.5) * (arcSize * 0.65);
    finalRotation += jitter;

    // Garantir que gira sempre para frente em relação ao currentRotation
    while (finalRotation <= currentRotation + 4 * twoPi) {
      finalRotation += twoPi;
    }

    const startRotation = currentRotation;
    const totalRotationChange = finalRotation - startRotation;
    const duration = 4400; // 4.4 segundos de suspense
    const startTime = performance.now();

    lastSectorIndexPassed = getSectorAtPointer(startRotation);

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Função de desaceleração suave (Ease Out Quart / Cubic)
      // f(t) = 1 - (1 - t)^3.5
      const easeOut = 1 - Math.pow(1 - progress, 3.5);

      currentRotation = startRotation + totalRotationChange * easeOut;
      drawRoulette(currentRotation);

      // Detectar quando cruza um pino/setor para emitir som de "tick"
      const currentSectorPointer = getSectorAtPointer(currentRotation);
      if (currentSectorPointer !== lastSectorIndexPassed) {
        playTickSound();
        lastSectorIndexPassed = currentSectorPointer;
      }

      if (progress < 1) {
        spinAnimationId = requestAnimationFrame(animate);
      } else {
        // Giro finalizado
        currentRotation = finalRotation;
        drawRoulette(currentRotation);
        isSpinning = false;
        btnSpin.disabled = false;
        btnSpin.classList.remove('spinning');

        // Obter setor final com precisão matemática
        const finalSectorIndex = getSectorAtPointer(currentRotation);
        onSpinComplete(finalSectorIndex);
      }
    }

    spinAnimationId = requestAnimationFrame(animate);
  }

  // ==========================================
  // DISPARAR O DESAFIO / QUIZ DO SETOR
  // ==========================================
  function onSpinComplete(sectorIndex) {
    const sector = SECTORS_DATA[sectorIndex];
    currentSector = sector;

    // Atualizar banner do setor
    sectorBanner.style.background = `linear-gradient(135deg, ${sector.color}44 0%, rgba(15, 23, 42, 0.95) 100%)`;
    sectorBanner.style.borderLeftColor = sector.color;
    sectorIcon.textContent = sector.icon;
    sectorTitle.textContent = `${sector.id}. ${sector.name.toUpperCase()}`;
    sectorSubtitle.textContent = sector.subtitle;

    // Escolher pergunta sem repetição imediata
    if (!questionHistory[sector.id]) {
      questionHistory[sector.id] = [];
    }
    const usedIndices = questionHistory[sector.id];
    let availableIndices = sector.questions
      .map((_, idx) => idx)
      .filter(idx => !usedIndices.includes(idx));

    if (availableIndices.length === 0) {
      // Se já foram todas as perguntas do setor, reseta o histórico desse setor
      questionHistory[sector.id] = [];
      availableIndices = sector.questions.map((_, idx) => idx);
    }

    const randomQuestionIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    questionHistory[sector.id].push(randomQuestionIdx);
    currentQuestion = sector.questions[randomQuestionIdx];

    // Montar Pergunta e Alternativas
    questionText.textContent = currentQuestion.question;
    optionsGrid.innerHTML = '';
    selectedOptionIndex = null;
    isAnswerVerified = false;

    // Esconder feedback anterior
    feedbackPanel.classList.add('hidden');
    btnCheckAnswer.disabled = true;
    btnCheckAnswer.classList.remove('hidden');

    const letters = ['A', 'B', 'C', 'D'];
    currentQuestion.options.forEach((optText, optIdx) => {
      const btnOpt = document.createElement('button');
      btnOpt.className = 'option-btn';
      btnOpt.type = 'button';
      btnOpt.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span class="option-text">${optText}</span>
      `;

      btnOpt.addEventListener('click', () => selectOption(optIdx));
      optionsGrid.appendChild(btnOpt);
    });

    // Exibir painel do quiz
    idleCard.classList.add('hidden');
    quizCard.classList.remove('hidden');

    // Scroll suave para visualização do desafio caso em tela menor
    if (window.innerWidth < 960) {
      quizCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function selectOption(index) {
    if (isAnswerVerified) return;
    playClickSound();
    selectedOptionIndex = index;

    const allOptions = optionsGrid.querySelectorAll('.option-btn');
    allOptions.forEach((btn, idx) => {
      btn.classList.toggle('selected', idx === index);
    });

    // Habilitar botão de verificar
    btnCheckAnswer.disabled = false;
  }

  function verifyAnswer() {
    if (selectedOptionIndex === null || isAnswerVerified) return;

    isAnswerVerified = true;
    roundsCount++;
    btnCheckAnswer.disabled = true;
    btnCheckAnswer.classList.add('hidden');

    const isCorrect = selectedOptionIndex === currentQuestion.correct;
    if (isCorrect) correctCount++;

    // Atualizar placar
    updateScoreBoard();

    // Estilizar botões de opções
    const allOptions = optionsGrid.querySelectorAll('.option-btn');
    allOptions.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQuestion.correct) {
        btn.classList.add('is-correct');
      } else if (idx === selectedOptionIndex && !isCorrect) {
        btn.classList.add('is-wrong');
      }
    });

    // Configurar Painel de Explicação e Feedback
    feedbackHeader.className = `feedback-header ${isCorrect ? 'success' : 'wrong'}`;
    if (isCorrect) {
      feedbackIcon.textContent = '🎉';
      feedbackTitle.textContent = 'Excelente! Resposta Correta!';
      feedbackSubtitle.textContent = 'Você demonstrou verdadeiro conhecimento de Auditor da Energia!';
      playCorrectFanfare();
      triggerConfetti();
    } else {
      feedbackIcon.textContent = '💡';
      feedbackTitle.textContent = 'Não foi dessa vez!';
      feedbackSubtitle.textContent = 'Mas não se preocupe: o importante é aprender o conceito correto!';
      playWrongSound();
    }

    explanationText.textContent = currentQuestion.explanation;
    didYouKnowText.textContent = currentQuestion.didYouKnow;

    feedbackPanel.classList.remove('hidden');
    feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateScoreBoard() {
    statRounds.textContent = roundsCount;
    statCorrect.textContent = correctCount;
    const efficiency = roundsCount > 0 ? Math.round((correctCount / roundsCount) * 100) : 100;
    statEfficiency.textContent = `${efficiency}%`;
  }

  function prepareNextRound() {
    playClickSound();
    feedbackPanel.classList.add('hidden');
    quizCard.classList.add('hidden');
    idleCard.classList.remove('hidden');

    // Focar novamente na roleta
    if (window.innerWidth < 960) {
      document.getElementById('wheelSection').scrollIntoView({ behavior: 'smooth' });
    }

    // Acionar novo giro automaticamente para manter o ritmo ou deixar pronto
    spinWheel();
  }

  // ==========================================
  // CONFETES COM CANVAS PRÓPRIO
  // ==========================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  const cCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnimId = null;

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  function triggerConfetti() {
    resizeConfettiCanvas();
    const colors = ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ffffff', '#ffd700'];
    confettiParticles = [];

    for (let i = 0; i < 90; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.38
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    animateConfetti();
  }

  function animateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    for (let i = 0; i < confettiParticles.length; i++) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive = true;
        cCtx.save();
        cCtx.translate(p.x, p.y);
        cCtx.rotate((p.rotation * Math.PI) / 180);
        cCtx.globalAlpha = Math.max(0, p.alpha);
        cCtx.fillStyle = p.color;
        cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        cCtx.restore();
      }
    }

    if (alive) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // ==========================================
  // EVENT LISTENERS & MODAL
  // ==========================================
  btnSpin.addEventListener('click', () => {
    spinWheel();
  });

  btnCheckAnswer.addEventListener('click', () => {
    verifyAnswer();
  });

  btnNextRound.addEventListener('click', () => {
    prepareNextRound();
  });

  btnSoundToggle.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    soundIcon.textContent = audioEnabled ? '🔊' : '🔇';
    btnSoundToggle.setAttribute('title', audioEnabled ? 'Desativar Som' : 'Ativar Som');
    if (audioEnabled) {
      initAudio();
      playClickSound();
    }
  });

  // Modal do Folder
  function openFolderModal() {
    playClickSound();
    folderModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeFolderModal() {
    playClickSound();
    folderModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  btnOpenFolder.addEventListener('click', openFolderModal);
  btnCloseModal.addEventListener('click', closeFolderModal);
  btnModalUnderstood.addEventListener('click', closeFolderModal);
  folderModal.addEventListener('click', (e) => {
    if (e.target === folderModal) closeFolderModal();
  });

  // Tela Cheia
  btnFullscreen.addEventListener('click', () => {
    playClickSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Inicialização no carregamento
  window.addEventListener('resize', () => {
    setupCanvasDPI();
  });

  // Desenhar canvas inicial
  setupCanvasDPI();

})();
