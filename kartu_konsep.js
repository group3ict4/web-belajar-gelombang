document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("cardGrid");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  let voices = [];
  let currentPage = 1;
  const cardsPerPage = 9; // 3x3 per halaman

  // === LOAD VOICES ===
  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    console.log("VOICES LOADED:", voices);
  }

  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  // === PICK INDONESIAN VOICE ===
  function pickVoice() {
    if (!voices || voices.length === 0) return null;

    return (
      voices.find(v => v.lang === "id-ID") ||
      voices.find(v => v.lang.startsWith("id")) ||
      voices.find(v => v.name.toLowerCase().includes("indonesia")) ||
      voices.find(v => v.name.includes("Hani")) ||
      voices[0]
    );
  }

  // === SPEAK FUNCTION ===
  function speak(text) {
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice = pickVoice();
    utt.rate = 1;
    utt.pitch = 1;
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  }

  // === DATA 30 KARTU ===
  const cards = [
    { title: "Gelombang Mekanik", desc: "Gelombang yang membutuhkan medium..." },
    { title: "Gelombang Elektromagnetik", desc: "Gelombang yang dapat merambat tanpa medium..." },
    { title: "Amplitudo", desc: "Simpangan maksimum dari posisi setimbang..." },
    { title: "Frekuensi", desc: "Jumlah getaran setiap detik, dinyatakan dalam Hertz..." },
    { title: "Periode", desc: "Waktu untuk satu gelombang lengkap..." },
    { title: "Panjang Gelombang", desc: "Jarak antara dua puncak atau dua lembah berurutan..." },
    { title: "Cepat Rambat", desc: "Kecepatan gelombang merambat di medium tertentu..." },
    { title: "Resonansi", desc: "Terjadi ketika frekuensi sama sehingga amplitudo membesar..." },
    { title: "Interferensi", desc: "Perpaduan dua gelombang yang menghasilkan pola baru..." },
    { title: "Difraksi", desc: "Pembelokan gelombang ketika melewati celah sempit..." },
    { title: "Refleksi", desc: "Pemantulan gelombang ketika mengenai penghalang..." },
    { title: "Refraksi", desc: "Pembiasan gelombang saat pindah medium..." },
    { title: "Intensitas Bunyi", desc: "Daya per satuan luas pada suatu titik..." },
    { title: "Desibel (dB)", desc: "Satuan logaritmik untuk mengukur kuat bunyi..." },
    { title: "Nada", desc: "Bunyi berfrekuensi teratur..." },
    { title: "Desah", desc: "Bunyi tidak beraturan dan tidak memiliki frekuensi tunggal..." },
    { title: "Kualitas Bunyi", desc: "Ciri khas bunyi yang membedakan sumber bunyi..." },
    { title: "Gaung", desc: "Pantulan bunyi yang datang hampir bersamaan..." },
    { title: "Gema", desc: "Pantulan bunyi yang terdengar terpisah dari bunyi asli..." },
    { title: "Getaran", desc: "Gerak bolak balik di sekitar titik setimbang..." },
    { title: "Sumber Bunyi", desc: "Setiap objek yang bergetar menghasilkan bunyi..." },
    { title: "Medium Bunyi", desc: "Bunyi merambat melalui zat padat, cair, dan gas..." },
    { title: "Kecepatan Bunyi", desc: "Tergantung medium, paling cepat di padat..." },
    { title: "Efek Doppler", desc: "Perubahan frekuensi akibat gerak sumber atau pendengar..." },
    { title: "Ultrasonik", desc: "Bunyi dengan frekuensi di atas 20.000 Hz..." },
    { title: "Infrasonik", desc: "Bunyi dengan frekuensi di bawah 20 Hz..." },
    { title: "Spektrum Frekuensi", desc: "Rentang frekuensi bunyi yang dapat dianalisis..." },
    { title: "Intensitas Gelombang", desc: "Energi yang dibawa gelombang per satuan waktu..." },
    { title: "Pola Stasioner", desc: "Gelombang berdiri ketika dua gelombang bertemu..." },
    { title: "Puncak & Lembah", desc: "Bagian tertinggi dan terendah gelombang..." }
  ];

  // === RENDER KARTU ===
  function renderCards() {
    grid.innerHTML = "";

    let start = (currentPage - 1) * cardsPerPage;
    let end = start + cardsPerPage;
    const pageCards = cards.slice(start, end);

    pageCards.forEach(card => {
      const el = document.createElement("div");
      el.className = "card";

      el.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            ${card.title}
          </div>

          <div class="card-back">
            <p>${card.desc}</p>
            <button class="playBtn">🔊 Putar Suara</button>
          </div>
        </div>
      `;

      // PLAY BUTTON
      el.querySelector(".playBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        speak(`${card.title}. ${card.desc}`);
      });

      // FLIP
      el.addEventListener("click", () => {
        el.classList.toggle("flipped");
      });

      grid.appendChild(el);
    });

    pageInfo.textContent = `Halaman ${currentPage} / ${Math.ceil(cards.length / cardsPerPage)}`;
  }

  // === PAGE BUTTON ===
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCards();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(cards.length / cardsPerPage)) {
      currentPage++;
      renderCards();
    }
  });

  // === LOAD PERTAMA KALI ===
  renderCards();
});
