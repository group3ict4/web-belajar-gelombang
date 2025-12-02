/* ==========================
   BACKSOUND CONTROL
========================== */

const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");
let bgmOn = false;

bgm.volume = 0.35;

bgmToggle.onclick = () => {
  bgmOn = !bgmOn;
  if(bgmOn){
    bgm.play().catch(()=>{});
    bgmToggle.textContent = "🔊 Backsound: ON";
  } else {
    bgm.pause();
    bgmToggle.textContent = "🔇 Backsound: OFF";
  }
};


/* ==========================
   NAVIGATION
========================== */

document.getElementById("backSim").onclick = () => {
  window.location.href = "menu.html";
};
document.getElementById("toSimResult").onclick = () => {
  window.location.href = "menu.html";
};


/* ==========================
   QUIZ DATA (15 soal)
========================== */

const quiz = [
  { soal:" Berikut ini merupakan pernyataan yang benar mengenai bunyi, kecuali .....", opsi:["Bunyi merupakan gelombang longitudinal","Bunyi merupakan gelombang mekanik","Mengalami polarisasi"], jawaban:2, pemb:"-"},
  { soal:"Pada malam hari bunyi petir terdengar lebih keras dari pada siang hari, hal ini terjadi karena adanya.....", opsi:["Pemantulan gelombang bunyi"," Pembiasan gelombang bunyi"," Pelenturan gelombang bunyi"], jawaban:1, pemb:"-"},
  { soal:"Perbedaan antara gema dan gaung terletak pada.....", opsi:["Kelengkapan kata yang terdengar"," Jarak sumber suara dengan pendengar","Jarak sumber suara dengan penghalang"], jawaban:2, pemb:"-"},
  { soal:"Sifat dari gelombang ultrasonik yang digunakan dalam pemeriksaan organ tubuh dengan alat ultrasonografi (USG) adalah sifat.....", opsi:[" Interferensi"," Refleksi"], jawaban:1, pemb:"-"},
  { soal:"λ = 2 m, f = 200 Hz. Cepat rambat?", opsi:["200 m/s","400 m/s","100 m/s"], jawaban:1, pemb:"v = fλ = 200×2 = 400 m/s."},
  { soal:"f = 500 Hz → periode?", opsi:["0.5 s","0.02 s","0.002 s"], jawaban:2, pemb:"T = 1/500 = 0.002 s."},

  { soal:" Dua pipa organa terbuka, pipa A dan pipa B ditiup secara bersamaan. Ternyata suara nada dasar pipa organa A sama dengan pipa organa B. Maka, pernyataan berikut yang benar adalah.....", opsi:[" Panjang pipa organa A dua kali dari pipa organa B","Panjang pipa organa B tiga kali dari pipa organa A"], jawaban:1, pemb:""},
  { soal:"Seutas dawai mempunyai panjang 90 cm menghasilkan nada dasar sebesar 50 Hz. Berapa panjang gelombang dawai yang dihasilkan......", opsi:["2 m","1.6 m","1.8 m"], jawaban:2, pemb:"-"},

  { soal:"Taraf intensitas percakapan antara Anna dan Elsa di dalam suatu ruangan. adalah 35 dB. Jika terdapat 20 orang lainnya sedang bercakap-cakap di ruangan yang sama, taraf intensitas yang dihasilkan menjadi.....", opsi:["35 dB","40 dB", "45 dB"], jawaban:2, pemb:""},

  { soal:"  Berikut ini adalah persamaan simpangan gelombang berjalan: y = 10 sinn (0,4t – 0,5x). Periode gelombangnya adalah...", opsi:["10","5","0,2"], jawaban:1, pemb:"."},
];


/* ==========================
   QUIZ ENGINE
========================== */

let nomor = 0;
let score = 0;

const numberEl = document.getElementById("number");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const explainEl = document.getElementById("explain");
const nextBtn = document.getElementById("nextBtn");

function renderSoal(){
  const q = quiz[nomor];

  numberEl.textContent = `Soal ${nomor+1} / ${quiz.length}`;
  questionEl.textContent = q.soal;

  choicesEl.innerHTML = "";
  explainEl.style.display = "none";
  nextBtn.style.display = "none";

  q.opsi.forEach((ops, i)=>{
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = ops;

    btn.onclick = () => pilih(i, btn);

    choicesEl.appendChild(btn);
  });
}

renderSoal();

function pilih(i, ele){
  const benar = quiz[nomor].jawaban;

  if(i === benar){
    ele.classList.add("correct");
    score++;
    confetti({particleCount:70, spread:70});
  } else {
    ele.classList.add("wrong");
  }

  explainEl.style.display = "block";
  explainEl.textContent = quiz[nomor].pemb;

  Array.from(document.getElementsByClassName("choice")).forEach(c => c.onclick = null);

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  nomor++;
  if(nomor >= quiz.length){
    selesai();
  } else {
    renderSoal();
  }
};


/* ==========================
   RESULT
========================== */

function selesai(){
  document.getElementById("quizCard").style.display = "none";
  document.getElementById("resultBox").style.display = "block";
  document.getElementById("scoreVal").textContent = `Skor Kamu: ${score}/${quiz.length}`;
}
