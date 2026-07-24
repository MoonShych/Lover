/* ============================================================
   script.js — บอกรักเธอ One Page Website
   สารบัญ (Table of Contents):
   1.  CONFIG            — แก้ตรงนี้ที่เดียวเพื่อใส่เนื้อหาของคุณ
   2.  Sound              — เสียงสังเคราะห์ด้วย Web Audio (ไม่ต้องใช้ไฟล์เสียง)
   3.  Particles           — หัวใจลอย / ประกาย / confetti (canvas + DOM)
   4.  PasswordScreen       — ตรวจรหัสผ่าน
   5.  LoveLoadingAnimation  — แอนิเมชันหัวใจตกกระทบระเบิด
   6.  ScrollReveal          — เอฟเฟกต์ตอน Scroll เข้า viewport
   7.  Timeline               — Section 2: Our Story
   8.  Gallery                — Section 3: Gallery + Lightbox
   9.  LoveLetter              — Section 4: Typewriter
   10. RelationshipTimer        — Section 5: Realtime Counter
   11. MusicPlayer               — Floating Music Controller
   12. FinalSection               — Section 6: ปุ่มบอกรัก
   13. App                        — Boot sequence, ต่อทุกอย่างเข้าด้วยกัน
   ============================================================ */

/* ============================================================
   1. CONFIG — แก้ไฟล์นี้ส่วนนี้ที่เดียวเพื่อปรับเนื้อหาทั้งเว็บ
   ============================================================ */
const CONFIG = {
  // รหัสผ่านหน้า Password (ตามค่าที่ระบุ: วันสำคัญของคุณ)
  password: "011025",
  passwordHint: "💖 คำใบ้ : วันสำคัญของเรา",
  passwordWrongMessage: "ลองนึกถึงวันสำคัญของเราอีกครั้งนะ ❤️",

  // Section 1: Hero
  heroTitle: "Welcome to Our Story ❤️",
  herName: "น้องปาน😘",
  // รูปแบบ: "YYYY-MM-DDTHH:mm:ss"
  relationshipStart: "2025-10-01T00:00:00",
  relationshipStartLabel: "เริ่มคบกันตั้งแต่ 1 ตุลาคม 2568",

  // Section 2: Our Story Timeline
  // ใส่ image: "assets/images/xxx.jpg" ถ้ามีรูป ไม่ใส่ก็ได้ (จะโชว์ placeholder)
  timeline: [
    { date: "01 ต.ค. 2025", title: "วันที่เค้าจีบ", text: "วันที่เค้าจีบจริงๆก็ไม่ได้วันนี้นะ เราคบกันมาก่อนน้าาอ้วน แต่เค้าขออ้วน เป็นแฟนกันไหมวันนี้", icon: "💫", image: "" },
    { date: "ร้านหมูกระทะ", title: "อ้วนเลี้ยง🥰", text: "เหมือนจะกินเลี้ยงอ้วนจบฝึกงาน จำได้ว่าเค้าซุกแต่อ้วนตอนเค้าเมา😵‍💫", icon: "🤤", image: "" },
    { date: "วันอะไรดี", title: "ไอติมอร่อยมะ", text: "เหมือนว่าเป็นเพราะเค้าเลี้ยงไอติมหรือเปล่าน้าา แล้วก็วันต่อมาจำไม่ได้แล้วว่าอีกวัน แต่เหมือนมีคนลงสตอรี่ อจ. ว่าให้ทักมาอยากจีบหรือป่าว จำไม่ได้😛", icon: "❤️", image: "" },
    { date: "วันครบรอบ", title: "รักกก", text: "10 เดือนแล้วก็รักตลอด ไม่เปลี่ยนด้วย😾", icon: "🌸", image: "" }
  ],

  // Section 3: Gallery — ใส่ path รูปจริงไว้ที่ assets/images/
  gallery: [
    { src: "assets/images/photo1.jpg", caption: "ใส่แคปชั่นรูปนี้" },
    { src: "assets/images/photo2.jpg", caption: "ใส่แคปชั่นรูปนี้" },
    { src: "assets/images/photo3.jpg", caption: "ใส่แคปชั่นรูปนี้" },
    { src: "assets/images/photo4.jpg", caption: "ใส่แคปชั่นรูปนี้" },
    { src: "assets/images/photo5.jpg", caption: "ใส่แคปชั่นรูปนี้" },
    { src: "assets/images/photo6.jpg", caption: "ใส่แคปชั่นรูปนี้" }
  ],

  // Section 4: Love Letter
  letterTitle: "จดหมายถึงเธอ",
  letter:
    `ถึงคนที่ฉันรักที่สุด,

เย้ๆ 10 เดือนแล้วเค้ารักเธอน้าา ถึงเค้าจะไม่มีอารายให้ แต่เค้าก็ได้ความรักให้นะอิอิ

อยู่กะเค้านานๆน้าา อย่าทิ้งเค้าเลยย🥹 แล้วเค้าก็จะไม่ทิ้งอ้วนแน่🫡 เค้าสัญญา อ้วนเป็นคนแรกเลยน้าาที่อยู่กับเค้านานขนาดนี้

เค้าขอโทษที่เคยทำเรื่องแย่ และก็ขอบคุณที่ยังไม่ทิ้งกันไปไหนทั้งที่เค้าก็มีงี่เง่าบ้างแต่เค้าก็รักอ้วนคนเดียวน้าา 

อ้วนจำวันที่มาหาเค้าได้ไหม แล้วอ้วนอยากมาหาเค้าอีกหรอ เห็นแย้วไม่ใช่หรอว่าเค้าติดแฟนขนาดไหน ซุกทั้งวันอะบอกเยย มามะ😘

รักเธอที่สุดในโลกนะ 🤍`,

  // Music — วางไฟล์เพลงไว้ที่ assets/music/song.mp3
  musicSrc: "assets/music/song.mp3",
  musicTitle: "เพลงของเราสองคน",

  // Section 6: Final
  finalMessage: "รักเธอมากที่สุดในโลกใบนี้ ไม่ว่าจะอีกกี่วันฉันก็ยังเลือกเธอเสมอ ❤️",
  finalThanksMessage: "ขอบคุณที่เข้ามาในชีวิตของเรา ❤️"
};

/* ============================================================
   2. SOUND — เสียงสังเคราะห์ด้วย Web Audio API
   ============================================================ */
const Sound = (() => {
  let actx;
  function ensureCtx() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) actx = new AC();
    }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone({ freq = 440, duration = 0.15, type = 'sine', gain = 0.06, sweep = null } = {}) {
    const ctx = ensureCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (sweep) osc.frequency.exponentialRampToValueAtTime(sweep, ctx.currentTime + duration);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }
  return {
    unlock() { ensureCtx(); },
    click() { tone({ freq: 720, duration: 0.09, gain: 0.05 }); },
    pop() { tone({ freq: 500, duration: 0.18, type: 'triangle', gain: 0.08, sweep: 900 }); },
    explosion() {
      tone({ freq: 220, duration: 0.4, type: 'sawtooth', gain: 0.07, sweep: 60 });
      setTimeout(() => tone({ freq: 880, duration: 0.3, gain: 0.06, sweep: 1400 }), 80);
    },
    paper() { tone({ freq: 300, duration: 0.25, type: 'triangle', gain: 0.04, sweep: 500 }); }
  };
})();

/* ============================================================
   3. PARTICLES — Ambient floating hearts + canvas burst engine
   ============================================================ */
const Particles = (() => {
  const HEART_CHARS = ['❤️', '💗', '💕', '💖', '💓'];

  function ambient(containerEl, { count = 8, sparkles = true } = {}) {
    if (!containerEl) return () => { };
    let running = true;

    function spawnHeart() {
      if (!running) return;
      const el = document.createElement('span');
      el.className = 'floating-heart';
      el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
      const size = 12 + Math.random() * 18;
      const duration = 6 + Math.random() * 6;
      el.style.left = Math.random() * 100 + '%';
      el.style.fontSize = size + 'px';
      el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      el.style.animationDuration = duration + 's';
      el.style.opacity = String(0.5 + Math.random() * 0.5);
      containerEl.appendChild(el);
      setTimeout(() => el.remove(), duration * 1000 + 200);
    }
    function spawnSparkle() {
      if (!running) return;
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.textContent = '✨';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.fontSize = (8 + Math.random() * 10) + 'px';
      el.style.animationDuration = (1.2 + Math.random() * 1.4) + 's';
      containerEl.appendChild(el);
      setTimeout(() => el.remove(), 2800);
    }

    const heartInterval = setInterval(spawnHeart, 900 / (count / 8));
    let sparkleInterval;
    if (sparkles) sparkleInterval = setInterval(spawnSparkle, 750);
    for (let i = 0; i < 4; i++) setTimeout(spawnHeart, i * 250);

    return function stop() {
      running = false;
      clearInterval(heartInterval);
      if (sparkleInterval) clearInterval(sparkleInterval);
    };
  }

  function resizeCanvas(canvas, ctx, dpr) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawHeart(ctx, size) {
    const s = size / 10;
    ctx.beginPath();
    ctx.moveTo(0, 3 * s);
    ctx.bezierCurveTo(-6 * s, -4 * s, -12 * s, 3 * s, 0, 10 * s);
    ctx.bezierCurveTo(12 * s, 3 * s, 6 * s, -4 * s, 0, 3 * s);
    ctx.fill();
  }

  function burst(canvas, { x, y, count = 60, colors, hearts = true, power = 1 } = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    resizeCanvas(canvas, ctx, dpr);

    const palette = colors || ['#FF4F9A', '#FFC0CB', '#FF8FBB', '#FFFFFF', '#FFD1E3'];
    const parts = [];
    const cx = x ?? canvas.width / (2 * dpr);
    const cy = y ?? canvas.height / (2 * dpr);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.random() * 5) * power;
      const isHeart = hearts && Math.random() < 0.4;
      parts.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: isHeart ? 10 + Math.random() * 10 : 4 + Math.random() * 5,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
        isHeart,
        shape: Math.random() < 0.5 ? 'rect' : 'circle'
      });
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive = true;
        p.vy += 0.09;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.isHeart) drawHeart(ctx, p.size);
        else if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (alive) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();
  }

  return { ambient, burst, resizeCanvas, drawHeart };
})();

/* Ripple effect for tappable elements */
document.addEventListener('pointerdown', (e) => {
  const target = e.target.closest('.btn-primary, .music-btn-small, .gallery-item, .timer-unit, .scroll-down-btn');
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 1.3;
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
  target.style.overflow = target.style.overflow || 'hidden';
  target.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
}, { passive: true });

/* ============================================================
   4. PASSWORD SCREEN
   ============================================================ */
const PasswordScreen = (() => {
  function init(onSuccess) {
    const hintEl = document.getElementById('password-hint');
    const errorEl = document.getElementById('password-error');
    const inputEl = document.getElementById('password-input');
    const unlockBtn = document.getElementById('btn-unlock');
    const card = document.querySelector('.password-card');

    hintEl.textContent = CONFIG.passwordHint;

    function attempt() {
      Sound.click();
      const value = inputEl.value.trim();
      if (value === CONFIG.password) {
        errorEl.classList.remove('show');
        unlockBtn.disabled = true;
        Sound.pop();
        setTimeout(() => onSuccess && onSuccess(), 300);
      } else {
        errorEl.textContent = CONFIG.passwordWrongMessage;
        errorEl.classList.add('show');
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
        inputEl.value = '';
        inputEl.focus();
      }
    }
    unlockBtn.addEventListener('click', attempt);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
  }
  return { init };
})();

/* ============================================================
   5. LOVE LOADING ANIMATION
   ============================================================ */
const LoveLoadingAnimation = (() => {
  function run(onComplete) {
    const canvas = document.getElementById('loading-canvas');
    const flash = document.getElementById('loading-flash');
    const caption = document.getElementById('loading-caption');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    Particles.resizeCanvas(canvas, ctx, dpr);

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    const HEART_COUNT = 26;
    const smallHearts = [];
    for (let i = 0; i < HEART_COUNT; i++) smallHearts.push(makeHeart(i));

    function makeHeart(i) {
      return {
        x: W() * (0.75 + Math.random() * 0.4),
        y: -40 - Math.random() * 200,
        size: 10 + Math.random() * 22,
        speed: 1.6 + Math.random() * 2.2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.05,
        hue: 330 + Math.random() * 20,
        delay: i * 85 + Math.random() * 200,
        trail: [],
        opacity: 0.7 + Math.random() * 0.3
      };
    }

    let startTime = null, giantHeart = null, giantSpawned = false, exploded = false, rafId;

    function drawBackdrop(alpha) {
      ctx.fillStyle = `rgba(26,10,18,${alpha})`;
      ctx.fillRect(0, 0, W(), H());
    }

    function drawHeartShape(x, y, size, rot, hue, opacity, glow) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = opacity;
      if (glow) { ctx.shadowColor = `hsla(${hue}, 100%, 70%, .9)`; ctx.shadowBlur = glow; }
      ctx.fillStyle = `hsl(${hue}, 100%, ${65 + Math.random() * 5}%)`;
      const s = size / 10;
      ctx.beginPath();
      ctx.moveTo(0, 3 * s);
      ctx.bezierCurveTo(-6 * s, -4 * s, -12 * s, 3 * s, 0, 10 * s);
      ctx.bezierCurveTo(12 * s, 3 * s, 6 * s, -4 * s, 0, 3 * s);
      ctx.fill();
      ctx.restore();
    }

    function frame(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const darken = Math.min(elapsed / 500, 1) * 0.35 + 0.05;
      drawBackdrop(darken);

      for (const h of smallHearts) {
        if (elapsed < h.delay) continue;
        h.x -= h.speed; h.y += h.speed * 1.15; h.rot += h.vr;
        h.trail.push({ x: h.x, y: h.y, life: 1 });
        if (h.trail.length > 8) h.trail.shift();
        for (const t of h.trail) {
          ctx.save();
          ctx.globalAlpha = t.life * 0.35;
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(t.x, t.y, 1.6, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
          t.life -= 0.12;
        }
        drawHeartShape(h.x, h.y, h.size, h.rot, h.hue, h.opacity, 14);
      }

      const giantPhaseElapsed = elapsed - (HEART_COUNT * 85 + 300);
      if (giantPhaseElapsed > 0 && !exploded) {
        if (!giantSpawned) {
          giantSpawned = true;
          giantHeart = { x: W() * 0.85, y: -100, size: 20, targetSize: 90, rot: 0, hue: 336 };
          caption.textContent = 'หัวใจดวงใหญ่กำลังจะมาถึง...';
        }
        giantHeart.x -= 3.4; giantHeart.y += 3.9; giantHeart.rot += 0.01;
        giantHeart.size = Math.min(giantHeart.size + 1.2, giantHeart.targetSize);
        drawHeartShape(giantHeart.x, giantHeart.y, giantHeart.size, giantHeart.rot, giantHeart.hue, 1, 40);

        const targetX = W() * 0.22, targetY = H() * 0.75;
        if (
          (giantHeart.x <= targetX || giantHeart.y >= targetY) &&
          !exploded
        ) {
          exploded = true;
          explode(targetX, targetY);
        }
      }

      if (!exploded) rafId = requestAnimationFrame(frame);
    }

    function explode(x, y) {
      caption.textContent = 'บูม! 💥';
      Sound.explosion();
      const overlay = document.getElementById('fx-overlay');
      Particles.burst(overlay, { x, y, count: 150, power: 1.4, hearts: true });

      let ringR = 0;
      function ringFrame() {
        ringR += 14;
        ctx.save();
        ctx.globalAlpha = Math.max(1 - ringR / 260, 0);
        ctx.strokeStyle = '#ffdcec';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
        if (ringR < 260) requestAnimationFrame(ringFrame);
      }
      ringFrame();

      requestAnimationFrame(() => {
        flash.style.transition = 'opacity .15s ease-in';
        flash.style.opacity = '1';
        setTimeout(() => {
          if (!exploded) {
            exploded = true;
            explode(W() * 0.22, H() * 0.75);
          }
        }, 6000);
      });

      setTimeout(() => onComplete && onComplete(), 1300);
    }

    caption.textContent = 'กำลังพาเธอไปสู่โลกของเรา...';
    rafId = requestAnimationFrame(frame);
    window.addEventListener('resize', () => Particles.resizeCanvas(canvas, ctx, dpr), { passive: true });
  }
  return { run };
})();

/* ============================================================
   6. SCROLL REVEAL — IntersectionObserver สำหรับ .reveal / .gallery-item
   ============================================================ */
const ScrollReveal = (() => {
  function init(rootEl) {
    const targets = document.querySelectorAll('.reveal, .gallery-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { root: rootEl, threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(t => observer.observe(t));
    return observer;
  }
  return { init };
})();

/* ============================================================
   7. TIMELINE — Section 2: Our Story
   ============================================================ */
const Timeline = (() => {
  function render() {
    const list = document.getElementById('timeline-list');
    list.innerHTML = '';
    CONFIG.timeline.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'timeline-item glass-card reveal';
      el.dataset.icon = item.icon || '💗';

      let photoHtml = '';
      if (item.image) {
        photoHtml = `<div class="timeline-photo"><img src="${item.image}" loading="lazy" alt="${item.title}" onerror="this.parentElement.classList.add('placeholder'); this.remove();"></div>`;
      }

      el.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-text">${item.text}</div>
        ${photoHtml}
      `;
      list.appendChild(el);
    });
  }
  return { render };
})();

/* ============================================================
   8. GALLERY — Section 3: Gallery + Lightbox (tap fullscreen, swipe)
   ============================================================ */
const Gallery = (() => {
  let items = [], currentIndex = 0;

  function render() {
    const grid = document.getElementById('gallery-grid');
    items = CONFIG.gallery;
    grid.innerHTML = '';

    items.forEach((item, i) => {
      const cell = document.createElement('div');
      cell.className = 'gallery-item';
      cell.style.setProperty('--tilt', ((i % 2 === 0 ? -1 : 1) * (2 + Math.random() * 2)) + 'deg');
      cell.style.animationDelay = (Math.random() * 2) + 's';

      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = item.caption || '';
      img.src = item.src;
      img.onerror = () => {
        img.remove();
        const ph = document.createElement('div');
        ph.className = 'gallery-placeholder';
        ph.textContent = '📷';
        cell.prepend(ph);
      };
      cell.appendChild(img);

      if (item.caption) {
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = item.caption;
        cell.appendChild(cap);
      }

      cell.addEventListener('click', () => openLightbox(i));
      grid.appendChild(cell);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    Sound.click();
    document.getElementById('lightbox').classList.add('active');
    renderLightbox();
    setupSwipe();
  }

  function renderLightbox() {
    const item = items[currentIndex];
    const wrap = document.getElementById('lightbox-img-wrap');
    wrap.innerHTML = '';
    const img = document.createElement('img');
    img.src = item.src;
    img.style.transition = 'transform .25s ease';
    img.onerror = () => { wrap.innerHTML = '<div class="gallery-placeholder" style="font-size:60px;">📷</div>'; };

    let zoomed = false;
    img.addEventListener('click', () => {
      zoomed = !zoomed;
      img.style.transform = zoomed ? 'scale(1.5)' : 'scale(1)';
    });

    wrap.appendChild(img);
    document.getElementById('lightbox-caption').textContent = item.caption || '';
  }

  function setupSwipe() {
    const wrap = document.getElementById('lightbox-img-wrap');
    let startX = 0;
    wrap.ontouchstart = (e) => { startX = e.touches[0].clientX; };
    wrap.ontouchend = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0 && currentIndex < items.length - 1) { currentIndex++; renderLightbox(); }
        else if (diff > 0 && currentIndex > 0) { currentIndex--; renderLightbox(); }
      }
    };
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    Sound.click();
  }

  function init() {
    render();
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });
  }
  return { init };
})();

/* ============================================================
   9. LOVE LETTER — Section 4: Typewriter effect
   ============================================================ */
const LoveLetter = (() => {
  let started = false;

  function setup() {
    document.getElementById('letter-title-header').textContent = CONFIG.letterTitle;
    document.getElementById('letter-heading').textContent = `แด่ ${CONFIG.herName} 💌`;
  }

  function startTypewriter() {
    if (started) return;
    started = true;
    const bodyEl = document.getElementById('letter-body');
    const text = CONFIG.letter;
    bodyEl.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    caret.style.height = '16px';
    let i = 0;
    function type() {
      if (i <= text.length) {
        bodyEl.textContent = text.slice(0, i);
        bodyEl.appendChild(caret);
        i += 2;
        if (i % 6 === 0) Sound.paper();
        setTimeout(type, 18);
      } else {
        caret.remove();
      }
    }
    type();
  }

  function watch(rootEl) {
    const section = document.getElementById('sec-letter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) startTypewriter(); });
    }, { root: rootEl, threshold: 0.4 });
    observer.observe(section);
  }

  return { setup, watch };
})();

/* ============================================================
   10. RELATIONSHIP TIMER — Section 5: Realtime + Count Up
   ============================================================ */
const RelationshipTimer = (() => {
  let intervalId = null;

  function animateValue(el, from, to) {
    const start = performance.now();
    const duration = 500;
    function step(ts) {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function start() {
    const startDate = new Date(CONFIG.relationshipStart);
    const els = {
      months: document.getElementById('t-months'),
      days: document.getElementById('t-days'),
      hours: document.getElementById('t-hours'),
      mins: document.getElementById('t-mins'),
      secs: document.getElementById('t-secs')
    };
    const prev = { months: 0, days: 0, hours: 0, mins: 0, secs: 0 };
    let firstRun = true;

    function update() {
      const now = new Date();
      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      const anchor = new Date(startDate);
      anchor.setMonth(anchor.getMonth() + months);
      if (anchor > now) { months -= 1; anchor.setMonth(anchor.getMonth() - 1); }
      const remainderMs = Math.max(now - anchor, 0);
      const days = Math.floor(remainderMs / 86400000);
      const hours = Math.floor((remainderMs / 3600000) % 24);
      const mins = Math.floor((remainderMs / 60000) % 60);
      const secs = Math.floor((remainderMs / 1000) % 60);

      const next = { months: Math.max(months, 0), days, hours, mins, secs };
      Object.keys(next).forEach(key => {
        if (firstRun) {
          animateValue(els[key], 0, next[key]);
        } else if (next[key] !== prev[key]) {
          els[key].textContent = next[key];
        }
        prev[key] = next[key];
      });
      firstRun = false;
    }

    update();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(update, 1000);
  }
  return { start };
})();

/* ============================================================
   11. MUSIC PLAYER — Floating controller, autoplays only after tap
   ============================================================ */
const MusicPlayer = (() => {
  let audio, playing = false, muted = false, userInteracted = false;

  function init() {
    audio = document.getElementById('bg-audio');
    audio.src = CONFIG.musicSrc;
    document.getElementById('music-name').textContent = CONFIG.musicTitle;

    const btnToggle = document.getElementById('btn-music-toggle');
    const btnMute = document.getElementById('btn-music-mute');
    const art = document.getElementById('music-art');
    const progress = document.getElementById('music-progress');

    btnToggle.addEventListener('click', () => {
      Sound.click();
      if (playing) audio.pause();
      else {
        const p = audio.play();
        if (p && p.catch) p.catch(() => { document.getElementById('music-name').textContent = 'ยังไม่พบไฟล์เพลง (assets/music/song.mp3)'; });
      }
    });

    btnMute.addEventListener('click', () => {
      Sound.click();
      muted = !muted;
      audio.muted = muted;
      btnMute.textContent = muted ? '🔇' : '🔊';
    });

    audio.addEventListener('play', () => { playing = true; btnToggle.textContent = '❚❚'; art.classList.add('playing'); });
    audio.addEventListener('pause', () => { playing = false; btnToggle.textContent = '▶'; art.classList.remove('playing'); });
    audio.addEventListener('timeupdate', () => { if (audio.duration) progress.style.width = (audio.currentTime / audio.duration * 100) + '%'; });
  }

  // เริ่มเล่นเพลงอัตโนมัติหลังผู้ใช้แตะหน้าจอครั้งแรก (ตามข้อกำหนดเบราว์เซอร์ + สเปก)
  function armAutoplayOnFirstTap() {
    function onFirstTap() {
      if (userInteracted) return;
      userInteracted = true;
      if (audio) {
        const p = audio.play();
        if (p && p.catch) p.catch(() => { });
      }
      document.removeEventListener('pointerdown', onFirstTap);
    }
    document.addEventListener('pointerdown', onFirstTap, { once: true });
  }

  return { init, armAutoplayOnFirstTap };
})();

/* ============================================================
   12. FINAL SECTION — Section 6
   ============================================================ */
const FinalSection = (() => {
  function setup() {
    document.getElementById('final-message').textContent = CONFIG.finalMessage;
  }

  function init() {
    const btn = document.getElementById('btn-final');
    const thanks = document.getElementById('final-thanks');
    let triggered = false;

    btn.addEventListener('click', () => {
      if (triggered) return;
      triggered = true;
      Sound.explosion();
      const overlay = document.getElementById('fx-overlay');
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;

      Particles.burst(overlay, { x: cx, y: cy, count: 100, power: 1.4 });
      setTimeout(() => Particles.burst(overlay, { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3, count: 70, power: 1.2 }), 150);
      setTimeout(() => Particles.burst(overlay, { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3, count: 70, power: 1.2 }), 300);
      setTimeout(() => Particles.burst(overlay, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7, count: 110, power: 1.5 }), 450);

      thanks.textContent = CONFIG.finalThanksMessage;
      setTimeout(() => thanks.classList.add('show'), 500);
    });
  }
  return { setup, init };
})();

/* ============================================================
   13. APP — Boot sequence
   ============================================================ */
(function App() {
  const screens = {
    splash: document.getElementById('screen-splash'),
    password: document.getElementById('screen-password'),
    loading: document.getElementById('screen-loading'),
    main: document.getElementById('screen-main')
  };
  const ambientStoppers = {};

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  function populateHero() {
    document.getElementById('hero-title').textContent = CONFIG.heroTitle;
    document.getElementById('hero-name').textContent = CONFIG.herName;
    document.getElementById('hero-date').textContent = CONFIG.relationshipStartLabel;
  }

  function boot() {
    populateHero();
    Timeline.render();
    LoveLetter.setup();
    FinalSection.setup();

    // Splash
    ambientStoppers.splash = Particles.ambient(document.getElementById('splash-fx'), { count: 6 });
    setTimeout(() => {
      if (ambientStoppers.splash) ambientStoppers.splash();
      showScreen('password');
      document.getElementById('password-input').focus();
      ambientStoppers.password = Particles.ambient(document.getElementById('password-fx'), { count: 6 });
    }, 2200);

    // Password -> Loading -> Main
    PasswordScreen.init(() => {
      Sound.unlock();
      if (ambientStoppers.password) ambientStoppers.password();
      showScreen('loading');
      LoveLoadingAnimation.run(() => {
        showScreen('main');
        initMainPage();
      });
    });
  }

  function initMainPage() {
    const scrollContainer = document.getElementById('scroll-container');

    ambientStoppers.hero = Particles.ambient(document.getElementById('hero-fx'), { count: 8 });
    ambientStoppers.final = Particles.ambient(document.getElementById('final-fx'), { count: 6 });

    ScrollReveal.init(scrollContainer);
    LoveLetter.watch(scrollContainer);
    Gallery.init();
    RelationshipTimer.start();
    MusicPlayer.init();
    MusicPlayer.armAutoplayOnFirstTap();
    FinalSection.init();

    document.getElementById('btn-scroll-down').addEventListener('click', () => {
      Sound.click();
      document.getElementById('sec-story').scrollIntoView({ behavior: 'smooth' });
    });

    // Reveal hero content immediately since it's already in view
    requestAnimationFrame(() => {
      document.querySelectorAll('#sec-hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('in-view'), i * 120);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
