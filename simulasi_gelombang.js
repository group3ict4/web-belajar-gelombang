// gelombang_bunyi.js
// Simulasi GELOMBANG BUNYI (amplitudo menyesuaikan frekuensi)

(() => {
  /* =====================
     ELEMENT
  ===================== */
  const freqRange = document.getElementById('freqRange');
  const freqNumber = document.getElementById('freqNumber');
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');

  const addObs = document.getElementById('addObs');
  const deleteAll = document.getElementById('deleteAll');
  const obsTableBody = document.querySelector('#obsTable tbody');

  const sinusCanvas = document.getElementById('sinusCanvas');
  const toggleGraph = document.getElementById('toggleGraph');
  const currentAmpEl = document.getElementById('currentAmp');

  /* =====================
     AUDIO
  ===================== */
  let audioCtx = null;
  let osc = null;
  let gainNode = null;

  /* =====================
     CANVAS
  ===================== */
  const ctx = sinusCanvas.getContext('2d');
  let rafId = null;
  let phase = 0;

  /* =====================
     DATA
  ===================== */
  let observations = [];

  /* =====================
     PARAMETER
  ===================== */
  const MIN_F = 20;
  const MAX_F = 1000;

  const AMP_MIN = 0.04; // amplitudo minimum
  const AMP_MAX = 0.25; // amplitudo maksimum (aman)

  /* =====================
     AMPLITUDO DARI FREKUENSI
  ===================== */
  function calcAmplitude(f) {
    const norm = (f - MIN_F) / (MAX_F - MIN_F); // 0 → 1
    return +(AMP_MIN + norm * (AMP_MAX - AMP_MIN)).toFixed(3);
  }

  /* =====================
     FREKUENSI SYNC
  ===================== */
  function setFreq(v) {
    v = Math.round(Number(v));
    v = Math.max(MIN_F, Math.min(MAX_F, v));
    freqRange.value = v;
    freqNumber.value = v;

    if (osc) osc.frequency.value = v;
    if (gainNode) gainNode.gain.value = calcAmplitude(v);

    currentAmpEl.textContent = calcAmplitude(v) + " m";
  }

  freqRange.min = MIN_F;
  freqRange.max = MAX_F;
  freqNumber.min = MIN_F;
  freqNumber.max = MAX_F;

  freqRange.addEventListener('input', e => setFreq(e.target.value));
  freqNumber.addEventListener('change', e => setFreq(e.target.value));

  /* =====================
     PLAY / STOP
  ===================== */
  function startTone() {
    if (audioCtx) return;

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    osc = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = Number(freqRange.value);
    gainNode.gain.value = calcAmplitude(Number(freqRange.value));

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();

    playBtn.disabled = true;
    stopBtn.disabled = false;

    animate();
  }

  function stopTone() {
    if (!audioCtx) return;

    osc.stop();
    osc.disconnect();
    gainNode.disconnect();
    audioCtx.close();

    audioCtx = null;
    osc = null;
    gainNode = null;

    playBtn.disabled = false;
    stopBtn.disabled = true;

    cancelAnimationFrame(rafId);
    clearCanvas();
  }

  playBtn.onclick = startTone;
  stopBtn.onclick = stopTone;

  /* =====================
     TABEL
  ===================== */
  function addObservation() {
    const f = Number(freqRange.value);
    observations.push({
      time: new Date().toLocaleTimeString(),
      freq: f,
      amp: calcAmplitude(f)
    });
    renderTable();
  }

  function renderTable() {
    obsTableBody.innerHTML = '';
    observations.forEach((o, i) => {
      obsTableBody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${o.time}</td>
          <td>${o.freq} Hz</td>
          <td>${o.amp} m</td>
        </tr>
      `;
    });
  }

  addObs.onclick = addObservation;

  deleteAll.onclick = () => {
    if (confirm("Hapus semua data?")) {
      observations = [];
      renderTable();
    }
  };

  /* =====================
     CANVAS
  ===================== */
  function clearCanvas() {
    ctx.clearRect(0, 0, sinusCanvas.width, sinusCanvas.height);
  }

  function animate() {
    clearCanvas();

    const f = Number(freqRange.value);
    const A = calcAmplitude(f);

    const w = sinusCanvas.width;
    const h = sinusCanvas.height;
    const mid = h / 2;

    ctx.beginPath();
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;

    const cycles = (f / 100) * 0.6;

    for (let x = 0; x < w; x++) {
      const t = (x / w) * Math.PI * 2 * cycles + phase;
      const y = mid + Math.sin(t) * A * 160;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.stroke();
    phase += 0.04;
    rafId = requestAnimationFrame(animate);
  }

  /* =====================
     TOGGLE GRAPH
  ===================== */
  toggleGraph.onclick = () => {
    sinusCanvas.classList.toggle('hidden');
    toggleGraph.textContent = sinusCanvas.classList.contains('hidden')
      ? "Tampilkan Grafik"
      : "Sembunyikan Grafik";
    if (!sinusCanvas.classList.contains('hidden')) animate();
  };

  /* =====================
     RESPONSIVE
  ===================== */
  function resizeCanvas() {
    sinusCanvas.width = Math.min(1000, window.innerWidth - 60);
    sinusCanvas.height = 220;
    clearCanvas();
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // init
  setFreq(440);
})();
