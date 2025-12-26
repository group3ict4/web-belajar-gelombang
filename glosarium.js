document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("cardGrid");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const searchInput = document.getElementById("searchInput");
  const topicFilter = document.getElementById("topicFilter");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const petunjukModal = document.getElementById("petunjukModal");
  const resetBtn = document.getElementById("resetBtn");
  const btnPetunjuk = document.getElementById("helpBtn");
const tutupPetunjuk = document.getElementById("tutupPetunjuk");
if (btnPetunjuk && petunjukModal) {
  btnPetunjuk.addEventListener("click", () => {
    petunjukModal.style.display = "flex";
  });
}
if (tutupPetunjuk && petunjukModal) {
  tutupPetunjuk.addEventListener("click", () => {
    petunjukModal.style.display = "none";
  });
}
  /* ================= VOICE ================= */
  let voices = [];
  function loadVoices() {
    voices = speechSynthesis.getVoices();
  }
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function pickVoice() {
    return (
      voices.find(v => v.lang === "id-ID") ||
      voices.find(v => v.lang.startsWith("id")) ||
      voices[0]
    );
  }

  function speakWithTyping(text, element) {
  speechSynthesis.cancel();
  element.textContent = "";
  element.classList.remove("hidden");

  const words = text.split(" ");
  let index = 0;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = pickVoice();
  speechSynthesis.speak(utterance);

  const interval = setInterval(() => {
    if (index < words.length) {
      element.textContent += words[index] + " ";
      index++;
    } else {
      clearInterval(interval);
    }
  }, 300); // kecepatan kata
}


  /* ================= DATA (SAMA PERSIS) ================= */
  const cards = [

    /* GELOMBANG MEKANIK */
    { title: "Getaran", desc: "Gerak bolak-balik di sekitar titik seimbang.", topic: "mekanik" },
    { title: "Gelombang Mekanik", desc: "Gelombang yang butuh medium, misalnya air dan udara.", topic: "mekanik" },
    { title: "Gelombang Transversal", desc: "Getaran tegak lurus arah rambat, contohnya gelombang air.", topic: "mekanik" },
    { title: "Gelombang Longitudinal", desc: "Getaran sejajar arah rambat, contohnya bunyi.", topic: "mekanik" },
    { title: "Amplitudo", desc: "Simpangan paling jauh dari posisi seimbang.", topic: "mekanik" },
    { title: "Frekuensi", desc: "Jumlah getaran tiap detik.", topic: "mekanik" },
    { title: "Periode", desc: "Waktu yang dibutuhkan untuk satu getaran.", topic: "mekanik" },
    { title: "Panjang Gelombang", desc: "Jarak antara dua puncak gelombang.", topic: "mekanik" },
    { title: "Cepat Rambat Gelombang", desc: "Kecepatan gelombang merambat dalam medium.", topic: "mekanik" },
    { title: "Interferensi", desc: "Gabungan dua gelombang yang saling bertemu.", topic: "mekanik" },
    { title: "Difraksi", desc: "Pembelokan gelombang saat melewati celah sempit.", topic: "mekanik" },
    { title: "Refleksi", desc: "Pemantulan gelombang saat mengenai penghalang.", topic: "mekanik" },
    { title: "Refraksi", desc: "Perubahan arah gelombang saat pindah medium.", topic: "mekanik" },
    { title: "Gelombang Stasioner", desc: "Gelombang diam dengan simpul dan perut.", topic: "mekanik" },

    /* GELOMBANG BUNYI */
    { title: "Bunyi", desc: "Getaran yang bisa didengar oleh telinga.", topic: "bunyi" },
    { title: "Sumber Bunyi", desc: "Benda yang bergetar dan menghasilkan bunyi.", topic: "bunyi" },
    { title: "Medium Bunyi", desc: "Bunyi merambat lewat padat, cair, dan gas.", topic: "bunyi" },
    { title: "Cepat Rambat Bunyi", desc: "Bunyi paling cepat merambat di benda padat.", topic: "bunyi" },
    { title: "Intensitas Bunyi", desc: "Kuat lemahnya bunyi yang terdengar.", topic: "bunyi" },
    { title: "Taraf Intensitas", desc: "Ukuran kuat bunyi dalam satuan desibel.", topic: "bunyi" },
    { title: "Desibel (dB)", desc: "Satuan untuk mengukur tingkat kebisingan.", topic: "bunyi" },
    { title: "Nada", desc: "Bunyi dengan frekuensi teratur.", topic: "bunyi" },
    { title: "Gema", desc: "Pantulan bunyi yang terdengar terpisah.", topic: "bunyi" },
    { title: "Gaung", desc: "Pantulan bunyi yang datang hampir bersamaan.", topic: "bunyi" },
    { title: "Resonansi", desc: "Getaran jadi besar karena frekuensinya sama.", topic: "bunyi" },
    { title: "Efek Doppler", desc: "Bunyi terdengar berubah karena sumber bergerak.", topic: "bunyi" },
    { title: "Ultrasonik", desc: "Bunyi dengan frekuensi di atas 20.000 Hz.", topic: "bunyi" },
    { title: "Infrasonik", desc: "Bunyi dengan frekuensi di bawah 20 Hz.", topic: "bunyi" },

    /* KONSEP UMUM */
    { title: "Energi Gelombang", desc: "Energi yang dibawa oleh gelombang.", topic: "fisika" },
    { title: "Puncak Gelombang", desc: "Bagian tertinggi dari gelombang.", topic: "fisika" },
    { title: "Lembah Gelombang", desc: "Bagian terendah dari gelombang.", topic: "fisika" },
    { title: "Rapatan", desc: "Bagian gelombang bunyi yang paling rapat.", topic: "fisika" },
    { title: "Renggangan", desc: "Bagian gelombang bunyi yang paling renggang.", topic: "fisika" },
    { title: "Spektrum Bunyi", desc: "Rentang frekuensi bunyi yang ada.", topic: "fisika" },
    { title: "Resonator", desc: "Benda yang mudah beresonansi.", topic: "fisika" },
    { title: "Hukum Gelombang", desc: "v = λ × f, hubungan cepat rambat gelombang.", topic: "fisika" }
  ];

  let visibleCards = [...cards];
  let currentPage = 1;
  const cardsPerPage = 9;

  /* ================= RENDER ================= */
  function renderCards() {
    grid.innerHTML = "";

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    visibleCards.slice(start, end).forEach(card => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div class="card-inner">
          <div class="card-front">${card.title}</div>
          <div class="card-back">
            <p class="desc hidden">${card.desc}</p>
            <button class="playBtn">🔊 Putar</button>
          </div>
        </div>
      `;

      const desc = el.querySelector(".desc");

      el.addEventListener("click", () => {
        el.classList.toggle("flipped");
      });

      el.querySelector(".playBtn").addEventListener("click", e => {
  e.stopPropagation();
  el.classList.add("flipped");
  speakWithTyping(`${card.title}. ${card.desc}`, desc);
});
el.style.border = "2px solid red";
el.style.color = "white";
el.style.padding = "20px";
      grid.appendChild(el);
    });

    const totalPage = Math.ceil(visibleCards.length / cardsPerPage) || 1;
    pageInfo.textContent = `Halaman ${currentPage} / ${totalPage}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPage;
  }

  /* ================= PAGINATION ================= */
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderCards();
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < Math.ceil(visibleCards.length / cardsPerPage)) {
      currentPage++;
      renderCards();
    }
  };

  /* ================= SEARCH ================= */
  searchInput.addEventListener("input", () => {
    const key = searchInput.value.toLowerCase();
    visibleCards = cards.filter(c =>
      c.title.toLowerCase().includes(key) ||
      c.desc.toLowerCase().includes(key)
    );
    currentPage = 1;
    renderCards();
  });

  /* ================= FILTER ================= */
  topicFilter.addEventListener("change", () => {
    const val = topicFilter.value;
    visibleCards = val === "all" ? [...cards] : cards.filter(c => c.topic === val);
    currentPage = 1;
    renderCards();
  });

  shuffleBtn.onclick = () => {
    visibleCards.sort(() => Math.random() - 0.5);
    currentPage = 1;
    renderCards();
  };

  resetBtn.onclick = () => {
    searchInput.value = "";
    topicFilter.value = "all";
    visibleCards = [...cards];
    currentPage = 1;
    renderCards();
  };

  renderCards();
});
