/* =========================================================================
   ANNIVERSARY WEBSITE — SCRIPT.JS
   โครงสร้าง:
   1. CONFIG            -> แก้ข้อความ / รหัสผ่าน / วันครบรอบ / รูป / เพลง ที่นี่
   2. UTILITIES         -> ฟังก์ชันช่วยเหลือทั่วไป (เสียง, สุ่ม, พิกัด)
   3. BUTTERFLY ENGINE   -> คลาสผีเสื้อ + การควบคุมฝูงผีเสื้อ
   4. PAGE NAVIGATION    -> สลับหน้า
   5. หน้า 1-7           -> ลอจิกเฉพาะแต่ละหน้า
   6. INIT              -> เริ่มทำงานเมื่อโหลดหน้าเสร็จ
   ========================================================================= */


/* =========================================================================
   1. CONFIG — แก้ไขตรงนี้ที่เดียวเพื่อปรับแต่งเว็บ
   ========================================================================= */
const CONFIG = {

  // รหัสผ่าน (วันครบรอบ) รูปแบบ DDMMYY
  password: "011025",

  // วันครบรอบจริง ใช้คำนวณตัวนับเวลาในหน้า 3
  // new Date(ปี, เดือน-1, วัน)  ***เดือนเริ่มนับที่ 0 = มกราคม***
  anniversaryDate: new Date(2025, 9, 1, 0, 0, 0),

  // ชื่อคนรัก ใช้แสดงในหน้าสุดท้าย
  partnerName: "อ้วน",

  // รูปภาพความทรงจำ — เพิ่ม/ลบ/แก้ไขได้อิสระ
  // เก็บไฟล์จริงไว้ที่ assets/images/
  photos: [
    { src: "assets/images/1.jpeg", caption: "" },
    { src: "assets/images/2.jpeg", caption: "" },
    { src: "assets/images/3.png", caption: "" },
    { src: "assets/images/4.jpg", caption: "" },
    { src: "assets/images/5.jpeg", caption: "" },
    { src: "assets/images/6.jpeg", caption: "" },
    { src: "assets/images/7.jpeg", caption: "" },
    { src: "assets/images/8.jpeg", caption: "" },
    { src: "assets/images/9.jpeg", caption: "" },
    { src: "assets/images/10.jpeg", caption: "" },
  ],

  // ข้อความในจดหมาย — แก้ไขได้ยาวเท่าที่ต้องการ ระบบพิมพ์ทีละตัวรองรับข้อความยาว
  letterText:
`ถึงคนที่ฉันรักที่สุด,

เย้ๆ 10 เดือนแล้วเค้ารักเธอน้าา ถึงเค้าจะไม่มีอารายให้ แต่เค้าก็ได้ความรักให้นะอิอิ

อยู่กะเค้านานๆน้าา อย่าทิ้งเค้าเลยย🥹 แล้วเค้าก็จะไม่ทิ้งอ้วนแน่🫡 เค้าสัญญา อ้วนเป็นคนแรกเลยน้าาที่อยู่กับเค้านานขนาดนี้

เค้าขอโทษที่เคยทำเรื่องแย่ และก็ขอบคุณที่ยังไม่ทิ้งกันไปไหนทั้งที่เค้าก็มีงี่เง่าบ้างแต่เค้าก็รักอ้วนคนเดียวน้าา ขอโทษด้วยที่โรคจิตแต่ก็ไม่เปลี่ยนนะอิอิ 

อ้วนจำวันที่มาหาเค้าได้ไหม แล้วอ้วนอยากมาหาเค้าอีกหรอ เห็นแย้วไม่ใช่หรอว่าเค้าติดแฟนขนาดไหน ซุกทั้งวันอะบอกเยย มามะ😘

รักเธอที่สุดในโลกนะ ♥️`,

  // ไฟล์เสียงเอฟเฟกต์ — เก็บไว้ที่ assets/sounds/
  sounds: {
    click: "assets/sounds/click.mp3",
    unlock: "assets/sounds/unlock.mp3",
    paper: "assets/sounds/paper.mp3",
    butterfly: "assets/sounds/butterfly.mp3",
    magic: "assets/sounds/magic.mp3",
    success: "assets/sounds/success.mp3",
  },

  // เพลงพื้นหลัง — เก็บไว้ที่ assets/music/ (เริ่มเล่นตอนเข้าหน้า 3)
  musicVolume: 0.55,
};


/* =========================================================================
   2. UTILITIES
   ========================================================================= */

/** เล่นเสียงเอฟเฟกต์ (เงียบ ๆ ถ้าไฟล์ไม่มี ไม่ทำให้เว็บพัง) */
function playSound(name) {
  const src = CONFIG.sounds[name];
  if (!src) return;
  try {
    const audio = new Audio(src);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  } catch (e) { /* ไม่มีไฟล์เสียง - ข้ามไป */ }
}

/** ค่อย ๆ ปรับระดับเสียงของ <audio> element */
function fadeAudio(audioEl, targetVolume, durationMs) {
  const steps = 24;
  const startVolume = audioEl.volume;
  const stepTime = durationMs / steps;
  let currentStep = 0;

  clearInterval(audioEl._fadeInterval);
  audioEl._fadeInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    audioEl.volume = startVolume + (targetVolume - startVolume) * progress;
    if (currentStep >= steps) {
      clearInterval(audioEl._fadeInterval);
      audioEl.volume = targetVolume;
      if (targetVolume === 0) audioEl.pause();
    }
  }, stepTime);
}

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/** แปลงพิกัดหน้าจอ (clientX/Y) เป็นพิกัด local เทียบกับกึ่งกลางจอ
    (เพราะ #butterfly-group ยึดอยู่ตำแหน่งกึ่งกลางจอเสมอ) */
function screenToLocal(clientX, clientY) {
  return {
    x: clientX - window.innerWidth / 2,
    y: clientY - window.innerHeight / 2,
  };
}

function elementCenterLocal(el) {
  const r = el.getBoundingClientRect();
  return screenToLocal(r.left + r.width / 2, r.top + r.height / 2);
}

/** จุดบนเส้นโค้งรูปหัวใจ (สูตรพาราเมตริก) index i จาก n จุดทั้งหมด */
function heartPoint(i, n, scale) {
  const t = (i / n) * Math.PI * 2;
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

function sleep(ms) { return new Promise((res) => setTimeout(res, ms)); }


/* =========================================================================
   3. BUTTERFLY ENGINE
   ========================================================================= */

const butterflyGroup = document.getElementById("butterfly-group");
const COLOR_CLASSES = ["c-pink", "c-lavender", "c-white"];

class Butterfly {
  constructor(colorClass) {
    this.el = document.createElement("div");
    this.el.className = `butterfly flutter ${colorClass || pick(COLOR_CLASSES)}`;
    this.el.innerHTML = `<svg viewBox="0 0 100 80"><use href="#butterfly-svg"></use></svg>`;
    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.scale = 1;
    this.el.style.transition = "none";
    butterflyGroup.appendChild(this.el);
  }

  /** ตั้ง transition ก่อนขยับ (null = ปิด transition สำหรับ RAF loop) */
  setTransition(css) {
    this.el.style.transition = css === null ? "none" : css;
  }

  moveTo(x, y, rot = 0, scale = 1) {
    this.x = x; this.y = y; this.rot = rot; this.scale = scale;
    this.el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
  }

  fadeOut() { this.el.classList.add("fade-out"); }
  fadeIn() { this.el.classList.remove("fade-out"); }

  remove() {
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }
}

/* ---------- ผีเสื้อบินอิสระ (ambient) ใช้ในหน้า Welcome / Password / Gallery ---------- */

let idleButterflies = [];   // { bf, rafId }
let idleRunning = false;

function startIdleButterflies(count = 4) {
  stopIdleButterflies();
  idleRunning = true;

  for (let i = 0; i < count; i++) {
    const bf = new Butterfly();
    const startX = rand(-window.innerWidth / 2, window.innerWidth / 2);
    const startY = rand(-window.innerHeight / 2, window.innerHeight / 2);
    const speed = rand(0.15, 0.3);
    const phase = rand(0, Math.PI * 2);
    const driftAngle = rand(0, Math.PI * 2);

    const state = { bf, x: startX, y: startY, phase, speed, driftAngle };

    function step(t) {
      if (!idleRunning) return;
      state.phase += 0.01 * state.speed * 16;
      // การเคลื่อนที่แบบล่องลอยช้า ๆ + สั่นเป็นคลื่นเบา ๆ
      state.x += Math.cos(state.driftAngle) * 0.35;
      state.y += Math.sin(state.driftAngle) * 0.35 + Math.sin(state.phase) * 0.6;

      // วนกลับเมื่อบินออกขอบจอ
      const halfW = window.innerWidth / 2 + 40;
      const halfH = window.innerHeight / 2 + 40;
      if (state.x > halfW) state.x = -halfW;
      if (state.x < -halfW) state.x = halfW;
      if (state.y > halfH) state.y = -halfH;
      if (state.y < -halfH) state.y = halfH;

      const wobbleRot = Math.sin(state.phase) * 12;
      state.bf.moveTo(state.x, state.y, wobbleRot);
      state.rafId = requestAnimationFrame(step);
    }
    state.rafId = requestAnimationFrame(step);
    idleButterflies.push(state);
  }
}

function stopIdleButterflies() {
  idleRunning = false;
  idleButterflies.forEach((s) => {
    cancelAnimationFrame(s.rafId);
    s.bf.remove();
  });
  idleButterflies = [];
}

/** ให้ผีเสื้ออิสระที่กำลังบินอยู่ "บินหนี" ออกจออย่างรวดเร็ว (ใช้ตอนใส่รหัสผิด) */
function fleeIdleButterflies() {
  idleButterflies.forEach((s) => {
    idleRunning = false;
    cancelAnimationFrame(s.rafId);
    s.bf.setTransition("transform 0.9s ease-in");
    const fleeX = s.x < 0 ? -window.innerWidth : window.innerWidth;
    s.bf.moveTo(fleeX, s.y - 120, -20);
    s.bf.fadeOut();
  });
  setTimeout(() => {
    idleButterflies.forEach((s) => s.bf.remove());
    idleButterflies = [];
    // ผีเสื้อกลับมาใหม่หลังจากตั้งหลักได้
    if (document.getElementById("page-2").classList.contains("active")) {
      startIdleButterflies(3);
    }
  }, 950);
}

/* ---------- ผีเสื้อบินผ่านเป็นระยะ (ใช้ในหน้า Gallery) ---------- */

let galleryButterflyTimer = null;

function startGalleryButterflies() {
  stopGalleryButterflies();
  const spawnOne = () => {
    const bf = new Butterfly();
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? -window.innerWidth / 2 - 40 : window.innerWidth / 2 + 40;
    const endX = fromLeft ? window.innerWidth / 2 + 40 : -window.innerWidth / 2 - 40;
    const y = rand(-window.innerHeight / 3, window.innerHeight / 3);
    bf.setTransition("none");
    bf.moveTo(startX, y, fromLeft ? 10 : -10);
    requestAnimationFrame(() => {
      bf.setTransition("transform 4.5s linear, opacity 1s ease");
      bf.moveTo(endX, y + rand(-40, 40), fromLeft ? -10 : 10);
    });
    setTimeout(() => bf.remove(), 4700);
  };
  spawnOne();
  galleryButterflyTimer = setInterval(spawnOne, rand(4000, 6000));
}

function stopGalleryButterflies() {
  clearInterval(galleryButterflyTimer);
  galleryButterflyTimer = null;
}

/* ---------- การรวมตัวเป็นหัวใจ (Butterfly Heart Transition) ----------
   ใช้ทั้งตอนปลดล็อกรหัสผ่าน (หน้า2->3) และตอน Final Surprise (หน้า7)     */

async function playHeartTransition(options = {}) {
  const {
    count = 20,
    entryFrom = "right",     // "right" | "all"
    exitTo = "left",         // "left" | "up"
    heartScale = 7,
    onHeartFormed = null,    // callback เมื่อรวมเป็นหัวใจแล้ว (ใช้แสดงข้อความทับ)
    onDisperse = null,       // callback ตอนเริ่มแตกกระจาย (ใช้เผยหน้าใหม่)
    holdMs = 1800,
  } = options;

  playSound("butterfly");
  const halfW = window.innerWidth / 2;
  const halfH = window.innerHeight / 2;
  const swarm = [];

  // --- 1) สร้างผีเสื้อ และตั้งจุดเริ่มต้น ---
  for (let i = 0; i < count; i++) {
    const bf = new Butterfly();
    let startX, startY;
    if (entryFrom === "all") {
      const edge = Math.floor(rand(0, 4));
      if (edge === 0) { startX = -halfW - 60; startY = rand(-halfH, halfH); }
      else if (edge === 1) { startX = halfW + 60; startY = rand(-halfH, halfH); }
      else if (edge === 2) { startX = rand(-halfW, halfW); startY = -halfH - 60; }
      else { startX = rand(-halfW, halfW); startY = halfH + 60; }
    } else {
      startX = halfW + 80 + rand(0, 120);
      startY = rand(-halfH * 0.6, halfH * 0.6);
    }
    bf.moveTo(startX, startY, rand(-15, 15));
    swarm.push(bf);
  }

  await sleep(60);

  // --- 2) บินเข้ามากระจายตัวในจอ (จำนวนเพิ่มขึ้นเรื่อย ๆ ตามลำดับ) ---
  swarm.forEach((bf, i) => {
    bf.setTransition(`transform ${rand(1.6, 2.2).toFixed(2)}s cubic-bezier(.3,.6,.3,1) ${(i * 0.05).toFixed(2)}s`);
    const scatterX = rand(-halfW * 0.7, halfW * 0.7);
    const scatterY = rand(-halfH * 0.6, halfH * 0.6);
    bf.moveTo(scatterX, scatterY, rand(-20, 20));
  });
  await sleep(2400);

  // --- 3) บินวนเป็นวงกลม (RAF loop ระยะสั้น) ---
  const orbitRadius = Math.min(halfW, halfH) * 0.55;
  const orbitDuration = 1900;
  const orbitStart = performance.now();
  swarm.forEach((bf) => bf.setTransition(null));

  await new Promise((resolve) => {
    function orbitStep(now) {
      const elapsed = now - orbitStart;
      const progress = Math.min(elapsed / orbitDuration, 1);
      swarm.forEach((bf, i) => {
        const angle = (i / swarm.length) * Math.PI * 2 + progress * Math.PI * 4;
        const r = orbitRadius * (1 - progress * 0.4);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * 0.85;
        bf.moveTo(x, y, (angle * 180) / Math.PI);
      });
      if (progress < 1) requestAnimationFrame(orbitStep);
      else resolve();
    }
    requestAnimationFrame(orbitStep);
  });

  // --- 4) รวมตัวเป็นหัวใจ ---
  playSound("magic");
  swarm.forEach((bf, i) => {
    bf.setTransition("transform 1.3s cubic-bezier(.2,.8,.2,1)");
    const p = heartPoint(i, swarm.length, heartScale);
    bf.moveTo(p.x, p.y, 0, 1);
  });
  await sleep(1500);

  // --- 5) หัวใจเต้นสองครั้ง ---
  butterflyGroup.style.transition = "transform 0.35s ease-in-out";
  for (let beat = 0; beat < 2; beat++) {
    butterflyGroup.style.transform = "scale(1.14)";
    await sleep(350);
    butterflyGroup.style.transform = "scale(1)";
    await sleep(320);
  }

  if (typeof onHeartFormed === "function") await onHeartFormed();

  // --- 6) หัวใจหมุนช้า ๆ ---
  butterflyGroup.style.transition = "transform 3s linear";
  butterflyGroup.style.transform = "rotate(360deg) scale(1)";
  await sleep(holdMs);

  // reset การหมุนแบบไม่มี transition (กลับ 0 องศาแบบไม่ให้เห็นกระตุก)
  butterflyGroup.style.transition = "none";
  butterflyGroup.style.transform = "rotate(0deg) scale(1)";

  // --- 7) แตกออกเป็นผีเสื้ออีกครั้ง + 8) บินออก ---
  if (typeof onDisperse === "function") onDisperse();
  playSound("success");

  swarm.forEach((bf, i) => {
    bf.setTransition(`transform ${rand(1.3, 1.8).toFixed(2)}s cubic-bezier(.4,0,.2,1) ${(i * 0.03).toFixed(2)}s`);
    let exitX, exitY;
    if (exitTo === "up") {
      exitX = rand(-halfW * 0.8, halfW * 0.8);
      exitY = -halfH - rand(80, 260);
    } else {
      exitX = -halfW - rand(80, 260);
      exitY = rand(-halfH * 0.6, halfH * 0.6);
    }
    bf.moveTo(exitX, exitY, rand(-30, 30));
    setTimeout(() => bf.fadeOut(), 900 + i * 20);
  });

  await sleep(2000);
  swarm.forEach((bf) => bf.remove());
}


/* =========================================================================
   4. PAGE NAVIGATION
   ========================================================================= */

function goToPage(n) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(`page-${n}`);
  if (target) target.classList.add("active");
  onPageEnter(n);
}

function onPageEnter(n) {
  // จัดการผีเสื้ออิสระ + ตัวจับเวลาต่าง ๆ ตามหน้าที่เข้า
  stopGalleryButterflies();

  if (n === 1) startIdleButterflies(5);
  else stopIdleButterflies();

  if (n === 2) startIdleButterflies(3);

  if (n === 3) enterMemoryPage();
  if (n === 4) startGalleryButterflies();
  if (n === 7) {} // จัดการเองใน handleFinalSurprise
}


/* =========================================================================
   5. หน้า 1 — WELCOME
   ========================================================================= */

document.getElementById("btn-open-gift").addEventListener("click", () => {
  playSound("click");
  goToPage(2);
});


/* =========================================================================
   5. หน้า 2 — PASSWORD
   ========================================================================= */

const passwordInput = document.getElementById("password-input");
const passwordBox = document.getElementById("password-box");
const errorMsg = document.getElementById("error-msg");
const btnUnlock = document.getElementById("btn-unlock");

function checkPassword() {
  const value = passwordInput.value.trim();

  if (value === CONFIG.password) {
    playSound("unlock");
    errorMsg.classList.remove("show");
    stopIdleButterflies();
    runEntryTransition();
  } else {
    playSound("click");
    passwordBox.classList.remove("shake");
    void passwordBox.offsetWidth; // reflow เพื่อให้ animation เล่นซ้ำได้
    passwordBox.classList.add("shake");
    errorMsg.classList.add("show");
    fleeIdleButterflies();
    setTimeout(() => errorMsg.classList.remove("show"), 2200);
  }
}

btnUnlock.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

async function runEntryTransition() {
  // ซ่อนปุ่ม/อินพุตระหว่างทรานซิชัน แล้วค่อยเปลี่ยนหน้า
  document.getElementById("page-2").querySelector(".page-inner").style.opacity = "0";
  await playHeartTransition({
    count: 18,
    entryFrom: "right",
    exitTo: "left",
    heartScale: 7,
    holdMs: 1600,
    onDisperse: () => goToPage(3),
  });
}


/* =========================================================================
   5. หน้า 3 — ความทรงจำของเรา (Countdown)
   ========================================================================= */

let countdownInterval = null;
let musicStarted = false;

function enterMemoryPage() {
  if (!musicStarted) {
    musicStarted = true;
    const music = document.getElementById("bg-music");
    music.volume = 0;
    music.play().catch(() => {});
    fadeAudio(music, CONFIG.musicVolume, 3000);
  }

  updateCountdown();
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  let diff = now - CONFIG.anniversaryDate;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("cd-days").textContent = days;
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
}


/* =========================================================================
   5. หน้า 4 — PHOTO GALLERY
   ========================================================================= */

const galleryTrack = document.getElementById("gallery-track");
const galleryDotsWrap = document.getElementById("gallery-dots");
let galleryIndex = 0;

// SVG หัวใจแบบง่าย ใช้เป็นภาพสำรองถ้ายังไม่ได้ใส่รูปจริง
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'>
      <rect width='300' height='300' fill='#FFEDF2'/>
      <text x='50%' y='53%' font-size='70' text-anchor='middle' dominant-baseline='middle'>🤍</text>
    </svg>`
  );

function buildGallery() {
  galleryTrack.innerHTML = "";
  galleryDotsWrap.innerHTML = "";

  CONFIG.photos.forEach((photo, i) => {
    const slide = document.createElement("div");
    slide.className = "gallery-slide";
    slide.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
      <div class="gallery-caption">${photo.caption}</div>
    `;
    galleryTrack.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => setGalleryIndex(i));
    galleryDotsWrap.appendChild(dot);
  });
}

function setGalleryIndex(i) {
  const count = CONFIG.photos.length;
  galleryIndex = (i + count) % count;
  galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
  document.querySelectorAll(".gallery-dot").forEach((d, idx) => {
    d.classList.toggle("active", idx === galleryIndex);
  });
}

document.getElementById("gallery-prev").addEventListener("click", () => {
  playSound("click");
  setGalleryIndex(galleryIndex - 1);
});
document.getElementById("gallery-next").addEventListener("click", () => {
  playSound("click");
  setGalleryIndex(galleryIndex + 1);
});

// ปัดซ้าย-ขวาบนมือถือ
let touchStartX = null;
document.querySelector(".gallery-frame").addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
document.querySelector(".gallery-frame").addEventListener("touchend", (e) => {
  if (touchStartX === null) return;
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 40) setGalleryIndex(galleryIndex + (diff < 0 ? 1 : -1));
  touchStartX = null;
});


/* =========================================================================
   5. หน้า 5 — LOVE LETTER
   ========================================================================= */

const envelope = document.getElementById("envelope");
const envelopeFlap = document.getElementById("envelope-flap");
const waxSeal = document.getElementById("wax-seal");
const letterPaper = document.getElementById("letter-paper");
const letterTextEl = document.getElementById("letter-text");
const envelopeHint = document.getElementById("envelope-hint");
const btnAfterLetter = document.getElementById("btn-after-letter");
let envelopeOpened = false;

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  openLoveLetter();
});

async function openLoveLetter() {
  playSound("click");
  envelopeHint.classList.add("hidden");

  // ผีเสื้อบินมาเกาะซองแล้วตราหัวใจแตก
  const bf = new Butterfly("c-white");
  const start = elementCenterLocal(envelope);
  bf.moveTo(start.x - 90, start.y - 90, -20);
  await sleep(50);
  bf.setTransition("transform 1s cubic-bezier(.3,.6,.3,1)");
  bf.moveTo(start.x, start.y - 70, 0);
  await sleep(1000);
  playSound("magic");
  waxSeal.classList.add("broken");
  await sleep(400);
  bf.setTransition("transform 1s ease-in");
  bf.moveTo(start.x + 140, start.y - 160, 20);
  bf.fadeOut();
  setTimeout(() => bf.remove(), 1100);

  await sleep(300);
  playSound("paper");
  envelopeFlap.classList.add("open");
  await sleep(700);

  letterPaper.classList.add("slide-out");
  await sleep(900);

  typewriterEffect(letterTextEl, CONFIG.letterText);
}

function typewriterEffect(el, text) {
  el.textContent = "";
  let i = 0;
  const speed = 32; // ms ต่อตัวอักษร
  function typeNext() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeNext, speed);
    } else {
      btnAfterLetter.classList.remove("hidden");
    }
  }
  typeNext();
}


/* =========================================================================
   5. หน้า 6 — THANK YOU
   ========================================================================= */

document.getElementById("btn-final-surprise").addEventListener("click", () => {
  playSound("click");
  goToPage(7);
  handleFinalSurprise();
});


/* =========================================================================
   5. หน้า 7 — FINAL SURPRISE + ENDING
   ========================================================================= */

let finalSurpriseStarted = false;

async function handleFinalSurprise() {
  if (finalSurpriseStarted) return;
  finalSurpriseStarted = true;

  const finalHeartText = document.getElementById("final-heart-text");
  const couplePhotoWrap = document.getElementById("couple-photo-wrap");
  const couplePhoto = document.getElementById("couple-photo");
  const finalText = document.getElementById("final-text");
  const finalNameEl = document.getElementById("final-name");

  couplePhoto.addEventListener("error", () => {
    couplePhoto.src = FALLBACK_IMG;
  });

  // เงียบสักครู่ก่อนเริ่ม
  await sleep(1000);

  await playHeartTransition({
    count: 26,
    entryFrom: "all",
    exitTo: "up",
    heartScale: 8,
    holdMs: 1800,
    onHeartFormed: async () => {
      // หัวใจเปลี่ยนเป็นข้อความ
      finalHeartText.classList.remove("hidden");
      playSound("success");
      await sleep(1800);
      finalHeartText.classList.add("hidden");
    },
    onDisperse: () => {
      couplePhotoWrap.classList.remove("hidden");
      setTimeout(() => finalText.classList.remove("hidden"), 600);
    },
  });

  await sleep(1200);
  startEndingSequence(couplePhotoWrap, finalNameEl);
}

/** ฉากจบ: ผีเสื้อสีขาวตัวเดียววนรอบรูปคู่ แล้วบินหายไป จากนั้นกลับมาเกาะคำว่า "อ้วน" */
async function startEndingSequence(couplePhotoWrap, finalNameEl) {
  const bf = new Butterfly("c-white");
  const photoCenter = elementCenterLocal(couplePhotoWrap);

  // วนรอบรูปคู่
  bf.setTransition(null);
  const orbitStart = performance.now();
  const orbitDuration = 2600;
  await new Promise((resolve) => {
    function step(now) {
      const elapsed = now - orbitStart;
      const progress = Math.min(elapsed / orbitDuration, 1);
      const angle = progress * Math.PI * 2 * 1.5;
      const r = 130;
      bf.moveTo(photoCenter.x + Math.cos(angle) * r, photoCenter.y + Math.sin(angle) * r * 0.6, angle * 30);
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });

  // เกาะที่มุมรูป
  bf.setTransition("transform 0.8s ease");
  bf.moveTo(photoCenter.x + 95, photoCenter.y - 95, 0);
  await sleep(900);

  // กระพือปีกอยู่กับที่สักพัก (คลาส flutter ทำงานอยู่แล้ว)
  await sleep(1000);

  // บินออกจากจอ
  bf.setTransition("transform 1.4s ease-in");
  bf.moveTo(window.innerWidth, photoCenter.y - 260, 30);
  bf.fadeOut();
  setTimeout(() => bf.remove(), 1500);

  // เพลงเริ่มค่อย ๆ เบาลงระหว่างรอ
  const music = document.getElementById("bg-music");

  // รอประมาณ 8 วินาที แล้วผีเสื้อกลับมา
  await sleep(8000);

  const bf2 = new Butterfly("c-white");
  const namePos = elementCenterLocal(finalNameEl);
  bf2.setTransition(null);
  bf2.moveTo(-window.innerWidth, namePos.y - 40, -20);
  await sleep(50);
  bf2.setTransition("transform 1.6s ease-out");
  bf2.moveTo(namePos.x, namePos.y - 22, 0);
  await sleep(1700);

  // กระพือปีกเบา ๆ
  await sleep(1400);

  // บินจากไป + เพลง fade out
  bf2.setTransition("transform 1.6s ease-in");
  bf2.moveTo(namePos.x + 200, namePos.y - 200, 25);
  bf2.fadeOut();
  fadeAudio(music, 0, 3500);
  setTimeout(() => bf2.remove(), 1700);
}


/* =========================================================================
   ปุ่ม "ต่อไป" ทั่วไปในหน้าต่าง ๆ (data-next)
   ========================================================================= */

document.querySelectorAll(".btn-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    playSound("click");
    goToPage(parseInt(btn.dataset.next, 10));
  });
});


/* =========================================================================
   6. INIT
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildGallery();
  goToPage(1);

  // จำกัดให้กรอกรหัสได้เฉพาะตัวเลข
  passwordInput.addEventListener("input", () => {
    passwordInput.value = passwordInput.value.replace(/[^0-9]/g, "");
  });
});
