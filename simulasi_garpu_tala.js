// =======================================================
// AUDIO SETUP
// =======================================================
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playResonance680() {
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = 680; // 🔥 FIX 680 Hz

  gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + 1.5
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.5);
}

// =======================================================
// ELEMENT
// =======================================================
const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");
const fork1 = document.getElementById("fork1");
const fork2 = document.getElementById("fork2");
const resText = document.getElementById("resText");
const playBtn = document.getElementById("playBtn");

// =======================================================
// RESET GETAR
// =======================================================
function resetFork() {
  fork1.classList.remove("resonansi");
  fork2.classList.remove("resonansi");
}

// =======================================================
// CEK RESONANSI (MURNI)
// =======================================================
function cekResonansi() {
  const freq1 = parseInt(f1.value);
  const freq2 = parseInt(f2.value);

  resetFork();

  if (freq1 === 680 && freq2 === 680) {
    resText.textContent =
      "✔ Resonansi! Garpu tala bergetar kuat pada 680 Hz";
    resText.style.color = "#7aff8c";

    fork1.classList.add("resonansi");
    fork2.classList.add("resonansi");
  } else {
    resText.textContent =
      "❌ Tidak terjadi resonansi (hanya 680 Hz)";
    resText.style.color = "#ffffff";
  }
}

f1.oninput = cekResonansi;
f2.oninput = cekResonansi;

// =======================================================
// TOMBOL PUTAR (HANYA JALAN DI 680)
// =======================================================
playBtn.onclick = () => {
  const freq1 = parseInt(f1.value);
  const freq2 = parseInt(f2.value);

  if (freq1 === 680 && freq2 === 680) {
    playResonance680();

    fork1.style.transform = "scale(1.2)";
    fork2.style.transform = "scale(1.2)";
    setTimeout(() => {
      fork1.style.transform = "scale(1)";
      fork2.style.transform = "scale(1)";
    }, 300);
  }

  cekResonansi();
};
