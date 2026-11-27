(function () {
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  let activeWorkCat = "all";
  let activeWorkIntent = "all";
  let workSearchQuery = "";
  let currentDrawerWork = null;
  let radarChartInstance = null;
  let donutChartInstance = null;

  function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.hidden = true; }, 2600);
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => showToast(successMsg));
    } else {
      showToast(successMsg);
    }
  }

  // 1. Calm WebGL FBM Liquid Silk Shader (Klein Blue #2563EB + Warm Amber #F59E0B)
  function initHeroWebglFluid() {
    const canvas = document.getElementById("heroWebglCanvas");
    const heroSec = document.getElementById("top");
    const hud = document.getElementById("heroTelemetryHud");
    if (!canvas || !heroSec) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = null;
    try {
      gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    } catch (e) { gl = null; }

    let w = 0, h = 0, active = true;
    let mouseNX = 0.5, mouseNY = 0.45, curMX = 0.5, curMY = 0.45;

    function resize() {
      const rect = heroSec.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("pointermove", (e) => {
      mouseNX = e.clientX / Math.max(1, window.innerWidth);
      mouseNY = 1.0 - e.clientY / Math.max(1, window.innerHeight);
      if (hud) hud.textContent = `ATELIER · XY ${Math.round(e.clientX)},${Math.round(e.clientY)}`;
    }, { passive: true });

    new IntersectionObserver((en) => { active = en[0].isIntersecting; }, { threshold: 0.03 }).observe(heroSec);

    if (!gl) {
      const ctx2d = canvas.getContext("2d");
      resize();
      if (!ctx2d) return;
      const draw2d = () => {
        if (active && w > 0) {
          ctx2d.fillStyle = document.documentElement.getAttribute("data-theme") === "light" ? "#f5f6f9" : "#0c0c0c";
          ctx2d.fillRect(0, 0, canvas.width, canvas.height);
          const g = ctx2d.createRadialGradient(canvas.width * curMX, canvas.height * (1 - curMY), 10, canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6);
          g.addColorStop(0, "rgba(37,99,235,0.28)");
          g.addColorStop(0.55, "rgba(245,158,11,0.12)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx2d.fillStyle = g;
          ctx2d.fillRect(0, 0, canvas.width, canvas.height);
        }
        if (!reduceMotion) requestAnimationFrame(draw2d);
      };
      draw2d();
      return;
    }

    const vsSrc = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;
    const fsSrc = `
      precision mediump float;
      uniform vec2 u_res, u_mouse; uniform float u_time, u_light;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5; mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for(int i=0;i<4;i++){ v += a * noise(p); p = rot * p * 2.02; a *= 0.5; }
        return v;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
        vec2 p = uv * 2.0 - 1.0; p.x *= u_res.x / max(1.0, u_res.y);
        vec2 m = u_mouse * 2.0 - 1.0; m.x *= u_res.x / max(1.0, u_res.y);
        float d = length(p - m); vec2 w = (p - m) * exp(-d * 1.45) * 0.4;
        float t = u_time * 0.2;
        vec2 q = vec2(fbm(p*1.1 + vec2(0.0, t)), fbm(p*1.1 + vec2(5.2, -t*0.8)));
        vec2 r = vec2(fbm(p*1.3 + 2.5*q + w + t*0.3), fbm(p*1.3 + 2.5*q - w - t*0.3));
        float f = fbm(p*1.1 + 2.1*r);
        vec3 klein = vec3(0.145, 0.388, 0.922);
        vec3 amber = vec3(0.960, 0.620, 0.043);
        vec3 dark = mix(vec3(0.047, 0.047, 0.055), klein * 0.48, smoothstep(0.32, 0.86, f) * 0.88);
        dark += amber * (pow(max(0.0, sin(r.x*6.0 + f*4.0)), 5.0) * 0.22 + exp(-d*2.1)*0.22);
        dark += klein * exp(-d*2.1) * 0.36;
        vec3 light = mix(vec3(0.955, 0.96, 0.98), vec3(0.84, 0.90, 0.99), smoothstep(0.32, 0.86, f) * 0.55);
        gl_FragColor = vec4(mix(dark, light, u_light), 1.0);
      }
    `;
    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = compile(gl.VERTEX_SHADER, vsSrc), fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return;
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_pos"); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res"), uMouse = gl.getUniformLocation(prog, "u_mouse"), uTime = gl.getUniformLocation(prog, "u_time"), uLight = gl.getUniformLocation(prog, "u_light");
    resize(); window.addEventListener("resize", resize);
    const t0 = performance.now();
    (function loop(now) {
      if (active && canvas.width > 0) {
        curMX += (mouseNX - curMX) * 0.08; curMY += (mouseNY - curMY) * 0.08;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, curMX, curMY);
        gl.uniform1f(uTime, reduceMotion ? 1.0 : (now - t0) * 0.001);
        gl.uniform1f(uLight, document.documentElement.getAttribute("data-theme") === "light" ? 1.0 : 0.0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reduceMotion) requestAnimationFrame(loop);
    })(t0);
  }

  // 2. Hero Parallax & Metrics
  function initHeroParallaxAndMetrics() {
    const container = document.getElementById("heroMetricsGrid");
    if (container && DATA.heroStats) {
      container.innerHTML = DATA.heroStats.map((s) => `
        <div class="hud-stat">
          <span class="hud-stat-top">${s.top}</span>
          <div class="hud-stat-val" data-count-target="${s.target}" data-suffix="${s.suffix}">0${s.suffix}</div>
          <div class="hud-stat-lbl">${s.label}</div>
        </div>
      `).join("");

      const vals = container.querySelectorAll(".hud-stat-val");
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / 1000);
        const eased = 1 - Math.pow(1 - p, 3);
        vals.forEach((el) => { el.textContent = Math.round(Number(el.dataset.countTarget) * eased) + (el.dataset.suffix || ""); });
        if (p < 1) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 200);
    }

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const avatarWrap = document.getElementById("heroAvatarWrap");
    const t1 = document.getElementById("heroTitleLine1");
    const t2 = document.getElementById("heroTitleLine2");
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
      ty = e.clientY / Math.max(1, window.innerHeight) - 0.5;
    }, { passive: true });
    (function glide() {
      if (window.innerWidth > 768 && window.scrollY < window.innerHeight) {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        const dx = cx * 20, dy = cy * 12;
        if (avatarWrap) avatarWrap.style.transform = `translateX(calc(-50% + ${dx.toFixed(1)}px)) translateY(${dy.toFixed(1)}px) perspective(900px) rotateY(${(cx * 9).toFixed(2)}deg) rotateX(${(-cy * 6).toFixed(2)}deg)`;
        if (t1) t1.style.transform = `translate3d(${(-dx * 0.45).toFixed(1)}px, ${(-dy * 0.28).toFixed(1)}px, 0)`;
        if (t2) t2.style.transform = `translate3d(${(dx * 0.55).toFixed(1)}px, ${(dy * 0.25).toFixed(1)}px, 0)`;
      } else if (window.innerWidth <= 768 && avatarWrap) {
        avatarWrap.style.transform = "";
      }
      requestAnimationFrame(glide);
    })();
  }

  // 3. Seamless Dual-Row Marquee + Scroll Choreography
  function initMarqueeAndScroll() {
    const r1 = document.getElementById("marqueeRow1");
    const r2 = document.getElementById("marqueeRow2");
    const half = DATA.featuredWorks.slice(0, 5);
    const half2 = DATA.featuredWorks.slice(4, 9);
    const mk = (list) => [...list, ...list].map((w) => `
      <div class="marquee-card" data-work-id="${w.id}">
        <img src="${w.cover}" alt="${w.title}" decoding="async" />
        <span class="marquee-card-tag">${w.code} · ${w.title}</span>
      </div>
    `).join("");
    if (r1 && r2) {
      r1.innerHTML = mk(half); r2.innerHTML = mk(half2);
      [r1, r2].forEach((row) => row.addEventListener("click", (e) => {
        const card = e.target.closest(".marquee-card");
        if (!card) return;
        const w = DATA.featuredWorks.find((x) => x.id === card.dataset.workId);
        if (w) openWorkDrawer(w);
      }));
    }

    const pEl = document.getElementById("aboutRevealText");
    let aboutChars = [];
    if (pEl) {
      pEl.innerHTML = pEl.textContent.trim().split("").map((ch) => `<span class="reveal-char">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
      aboutChars = Array.from(pEl.querySelectorAll(".reveal-char"));
    }

    const aboutSec = document.getElementById("sec-about");
    const props = Array.from(document.querySelectorAll(".about-prop"));
    const prog = document.getElementById("scrollProgress");
    const header = document.getElementById("siteHeader");
    const floatBar = document.getElementById("quickFloatBar");
    let offset = 0, lastT = performance.now();

    function onScroll() {
      const sy = window.scrollY;
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (prog) prog.style.width = `${Math.min(100, (sy / docH) * 100).toFixed(2)}%`;
      if (header) header.classList.toggle("is-scrolled", sy > 36);
      if (floatBar) floatBar.classList.toggle("is-at-top", sy < 360);

      if (aboutSec && aboutChars.length) {
        const rect = aboutSec.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.78 - rect.top) / (rect.height * 0.65)));
        const activeCount = Math.floor(p * aboutChars.length);
        aboutChars.forEach((c, i) => { c.style.opacity = i <= activeCount ? "1" : "0.28"; });
        if (window.innerWidth > 900) {
          props.forEach((el) => {
            const py = (rect.top - vh * 0.3) * parseFloat(el.dataset.parallax || "0.15");
            el.style.transform = `translate3d(0, ${py.toFixed(1)}px, 0)`;
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    (function step(now) {
      const dt = Math.min(32, Math.max(0, now - lastT)) / 16.67;
      lastT = now;
      if (r1 && r2) {
        offset += 0.42 * dt;
        const hw1 = r1.scrollWidth > 100 ? r1.scrollWidth / 2 : 1600;
        const hw2 = r2.scrollWidth > 100 ? r2.scrollWidth / 2 : hw1;
        const s1 = ((offset + window.scrollY * 0.14) % hw1 + hw1) % hw1;
        const s2 = (((offset * 0.85) + window.scrollY * 0.14) % hw2 + hw2) % hw2;
        r1.style.transform = `translate3d(-${s1.toFixed(1)}px, 0, 0)`;
        r2.style.transform = `translate3d(${(-hw2 + s2).toFixed(1)}px, 0, 0)`;
      }
      requestAnimationFrame(step);
    })(lastT);
  }

  // 4. Track B Interactive Lab: Live Before/After Split-Curtain Color Grading Studio
  function initDesignGradingLab() {
    const canvas = document.getElementById("gradingCanvas");
    const stage = document.getElementById("gradingStageWrap");
    const divLine = document.getElementById("gradingDividerLine");
    const expEl = document.getElementById("gradExp");
    const warmEl = document.getElementById("gradWarm");
    const conEl = document.getElementById("gradCon");
    const expVal = document.getElementById("gradExpVal");
    const warmVal = document.getElementById("gradWarmVal");
    const conVal = document.getElementById("gradConVal");
    const presetsWrap = document.getElementById("gradingPresets");
    const palWrap = document.getElementById("gradingPaletteBoxes");
    const copyCssBtn = document.getElementById("copyPaletteCssBtn");
    if (!canvas || !stage) return;

    const PRESETS = {
      klein: { exp: 0.25, warm: -18, con: 1.24, bgTop: "#0b1938", bgBot: "#1e3a8a", orb: "#2563eb", sun: "#f59e0b", colors: ["#2563EB", "#60A5FA", "#F59E0B", "#0C0D14"] },
      amber: { exp: 0.35, warm: 26, con: 1.18, bgTop: "#27170d", bgBot: "#78350f", orb: "#f59e0b", sun: "#fbbf24", colors: ["#F59E0B", "#FDBA74", "#2563EB", "#1F140E"] },
      cyber: { exp: -0.05, warm: -28, con: 1.38, bgTop: "#090d1a", bgBot: "#311042", orb: "#38bdf8", sun: "#f43f5e", colors: ["#38BDF8", "#818CF8", "#F43F5E", "#090B10"] }
    };
    let curPreset = PRESETS.klein;
    let splitPct = 0.58;
    let draggingSplit = false;
    const ctx = canvas.getContext("2d");

    function renderPaletteBoxes() {
      if (!palWrap) return;
      palWrap.innerHTML = curPreset.colors.map((hex) => `
        <div class="swatch-stat-box">
          <i class="swatch-dot" style="background:${hex};"></i>
          <span>${hex}</span>
        </div>
      `).join("");
    }

    function resize() {
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function drawScene(w, h, graded) {
      const exp = parseFloat(expEl.value);
      const warm = parseFloat(warmEl.value);
      const con = parseFloat(conEl.value);

      if (!graded) {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#3a3d42");
        g.addColorStop(1, "#25272b");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "#52565e";
        ctx.beginPath(); ctx.arc(w * 0.65, h * 0.45, 76, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#6c7078";
        ctx.beginPath(); ctx.arc(w * 0.34, h * 0.56, 52, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.24, h * 0.18, w * 0.52, h * 0.64);
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.font = "700 26px Kanit, sans-serif";
        ctx.fillText("EDITORIAL 2027", w * 0.28, h * 0.53);
      } else {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, curPreset.bgTop);
        g.addColorStop(1, curPreset.bgBot);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        const rg = ctx.createRadialGradient(w * 0.65, h * 0.45, 8, w * 0.65, h * 0.45, 92);
        rg.addColorStop(0, curPreset.sun);
        rg.addColorStop(0.65, curPreset.orb);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(w * 0.65, h * 0.45, 88 * con * 0.85, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = curPreset.orb;
        ctx.globalAlpha = Math.min(1, 0.72 + exp * 0.25);
        ctx.beginPath(); ctx.arc(w * 0.34, h * 0.56, 54, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;

        if (warm !== 0) {
          ctx.fillStyle = warm > 0 ? `rgba(245,158,11,${Math.min(0.28, Math.abs(warm) / 140)})` : `rgba(37,99,235,${Math.min(0.28, Math.abs(warm) / 140)})`;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.62)";
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.24, h * 0.18, w * 0.52, h * 0.64);
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 26px Kanit, sans-serif";
        ctx.fillText("EDITORIAL 2027", w * 0.28, h * 0.53);
      }
    }

    function draw() {
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const w = r.width, h = r.height;
      const splitX = w * splitPct;

      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, splitX, h); ctx.clip();
      drawScene(w, h, false);
      ctx.restore();

      ctx.save();
      ctx.beginPath(); ctx.rect(splitX, 0, w - splitX, h); ctx.clip();
      drawScene(w, h, true);
      ctx.restore();

      if (divLine) divLine.style.left = `${(splitPct * 100).toFixed(1)}%`;
      if (expVal) expVal.textContent = (parseFloat(expEl.value) >= 0 ? "+" : "") + parseFloat(expEl.value).toFixed(2);
      if (warmVal) warmVal.textContent = warmEl.value;
      if (conVal) conVal.textContent = parseFloat(conEl.value).toFixed(2);
    }

    const updateSplit = (clientX) => {
      const r = stage.getBoundingClientRect();
      splitPct = Math.max(0.08, Math.min(0.92, (clientX - r.left) / Math.max(1, r.width)));
      draw();
    };
    stage.addEventListener("pointerdown", (e) => { draggingSplit = true; stage.setPointerCapture?.(e.pointerId); updateSplit(e.clientX); });
    window.addEventListener("pointermove", (e) => { if (draggingSplit) updateSplit(e.clientX); }, { passive: true });
    window.addEventListener("pointerup", () => { draggingSplit = false; });

    [expEl, warmEl, conEl].forEach((inp) => inp.addEventListener("input", () => {
      presetsWrap?.querySelectorAll(".grading-preset-btn").forEach((b) => b.classList.remove("active"));
      draw();
    }));

    presetsWrap?.addEventListener("click", (e) => {
      const btn = e.target.closest(".grading-preset-btn");
      if (!btn) return;
      presetsWrap.querySelectorAll(".grading-preset-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curPreset = PRESETS[btn.dataset.preset] || PRESETS.klein;
      expEl.value = curPreset.exp;
      warmEl.value = curPreset.warm;
      conEl.value = curPreset.con;
      renderPaletteBoxes();
      draw();
    });

    copyCssBtn?.addEventListener("click", () => {
      const css = `:root { --palette-primary: ${curPreset.colors[0]}; --palette-accent: ${curPreset.colors[1]}; --palette-spark: ${curPreset.colors[2]}; --palette-bg: ${curPreset.colors[3]}; }`;
      copyText(css, `已复制色板 CSS 变量 (${curPreset.colors.join(" / ")})`);
    });

    renderPaletteBoxes();
    resize();
    window.addEventListener("resize", resize);
  }

  // 5. Verlet 8-Node 3D Lanyard Pass
  function initLanyardPhysics() {
    const stage = document.getElementById("lanyardStage");
    const ropeCanvas = document.getElementById("lanyardRopeCanvas");
    const card = document.getElementById("lanyardCard3d");
    const flipBtn = document.getElementById("lanyardFlipBtn");
    if (!stage || !ropeCanvas || !card) return;
    const ctx = ropeCanvas.getContext("2d");
    let sw = 0, sh = 0, segLen = 14, dragging = false, vx = 0, vy = 0, lx = 0, ly = 0;
    const N = 8;
    const nodes = Array.from({ length: N }, (_, i) => ({ x: 180, y: i * 14, ox: 180, oy: i * 14 }));

    function sync() {
      const r = stage.getBoundingClientRect();
      if (r.width < 10) return;
      sw = r.width; sh = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ropeCanvas.width = Math.round(sw * dpr); ropeCanvas.height = Math.round(sh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      segLen = Math.min(18, Math.max(9, (sh - (card.offsetHeight || 374) - 52) / (N - 1)));
      if (!dragging) nodes.forEach((nd, i) => { nd.x = sw * 0.5; nd.y = i * segLen; nd.ox = nd.x; nd.oy = nd.y; });
    }
    sync(); window.addEventListener("resize", sync);

    flipBtn?.addEventListener("click", (e) => { e.stopPropagation(); card.classList.toggle("is-flipped"); });
    document.getElementById("lanyardCopyBtn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      copyText(DATA.profile.wechat, `已复制设计师微信号：${DATA.profile.wechat}`);
    });

    card.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true; card.setPointerCapture?.(e.pointerId);
      const r = stage.getBoundingClientRect(); lx = e.clientX - r.left; ly = e.clientY - r.top; vx = 0; vy = 0;
    });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const r = stage.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      vx = Math.max(-24, Math.min(24, (px - lx) * 0.85)); vy = Math.max(-24, Math.min(24, (py - ly) * 0.85));
      lx = px; ly = py;
      nodes[N - 1].x = Math.max(40, Math.min(sw - 40, px));
      nodes[N - 1].y = Math.max(36, Math.min(sh - 80, py));
      nodes[N - 1].ox = nodes[N - 1].x; nodes[N - 1].oy = nodes[N - 1].y;
    }, { passive: true });
    window.addEventListener("pointerup", () => {
      if (!dragging) return; dragging = false;
      nodes[N - 1].ox = nodes[N - 1].x - vx; nodes[N - 1].oy = nodes[N - 1].y - vy;
    });

    (function step() {
      if (sw > 0) {
        for (let i = 1; i < N; i++) {
          if (dragging && i === N - 1) continue;
          const nd = nodes[i], rx = (nd.x - nd.ox) * 0.982, ry = (nd.y - nd.oy) * 0.982;
          nd.ox = nd.x; nd.oy = nd.y; nd.x += rx; nd.y += ry + 0.52;
        }
        for (let it = 0; it < 5; it++) {
          nodes[0].x = sw * 0.5; nodes[0].y = 0;
          for (let i = 0; i < N - 1; i++) {
            const a = nodes[i], b = nodes[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.001, diff = (segLen - d) / d;
            if (i === 0) { if (!(dragging && i + 1 === N - 1)) { b.x += dx * diff; b.y += dy * diff; } }
            else if (dragging && i + 1 === N - 1) { a.x -= dx * diff; a.y -= dy * diff; }
            else { a.x -= dx * diff * 0.5; a.y -= dy * diff * 0.5; b.x += dx * diff * 0.5; b.y += dy * diff * 0.5; }
          }
        }
        const tip = nodes[N - 1], prev = nodes[N - 2];
        const rotZ = Math.max(-20, Math.min(20, Math.atan2(tip.x - prev.x, Math.max(8, tip.y - prev.y)) * 45));
        card.style.transform = `translate3d(${tip.x.toFixed(1)}px, ${(tip.y - 12).toFixed(1)}px, 0) rotateZ(${rotZ.toFixed(2)}deg)`;
        ctx.clearRect(0, 0, sw, sh);
        ctx.lineCap = "round"; ctx.strokeStyle = "#1d2436"; ctx.lineWidth = 12;
        ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < N; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.stroke();
        ctx.strokeStyle = "rgba(37, 99, 235, 0.7)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < N; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.stroke();
      }
      requestAnimationFrame(step);
    })();
  }

  // 6. Works Gallery + Intent Filter + Drawer
  function initWorksGallery() {
    const cats = [
      { id: "all", label: `全部作品 (${DATA.featuredWorks.length})` },
      { id: "ui", label: `产品 UI (${DATA.featuredWorks.filter((w) => w.category === "ui").length})` },
      { id: "motion", label: `动效交互 (${DATA.featuredWorks.filter((w) => w.category === "motion").length})` },
      { id: "brand", label: `品牌包装 (${DATA.featuredWorks.filter((w) => w.category === "brand").length})` },
      { id: "editorial", label: `策展海报 (${DATA.featuredWorks.filter((w) => w.category === "editorial").length})` }
    ];
    const intentWrap = document.getElementById("workIntentButtons");
    const filterWrap = document.getElementById("workFilterButtons");

    intentWrap?.addEventListener("click", (e) => {
      const btn = e.target.closest(".intent-pill-btn");
      if (!btn) return;
      activeWorkIntent = btn.dataset.intent;
      activeWorkCat = "all";
      intentWrap.querySelectorAll(".intent-pill-btn").forEach((b) => b.classList.toggle("active", b.dataset.intent === activeWorkIntent));
      filterWrap?.querySelectorAll(".filter-pill-btn").forEach((b) => b.classList.toggle("active", b.dataset.cat === "all"));
      renderWorksGrid();
    });

    if (filterWrap) {
      filterWrap.innerHTML = cats.map((c) => `<button type="button" class="filter-pill-btn ${c.id === "all" ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("");
      filterWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-pill-btn");
        if (!btn) return;
        activeWorkCat = btn.dataset.cat;
        if (activeWorkCat !== "all") {
          activeWorkIntent = "all";
          intentWrap?.querySelectorAll(".intent-pill-btn").forEach((b) => b.classList.toggle("active", b.dataset.intent === "all"));
        }
        filterWrap.querySelectorAll(".filter-pill-btn").forEach((b) => b.classList.toggle("active", b.dataset.cat === activeWorkCat));
        renderWorksGrid();
      });
    }

    document.getElementById("workSearchInput")?.addEventListener("input", (e) => {
      workSearchQuery = e.target.value.trim().toLowerCase();
      renderWorksGrid();
    });
    renderWorksGrid();
  }

  function renderWorksGrid() {
    const grid = document.getElementById("worksGrid");
    if (!grid) return;
    const list = DATA.featuredWorks.filter((w) => {
      if (activeWorkIntent !== "all" && w.intent !== activeWorkIntent) return false;
      if (activeWorkCat !== "all" && w.category !== activeWorkCat) return false;
      if (!workSearchQuery) return true;
      return [w.code, w.title, w.subtitle, ...(w.tags || [])].join(" ").toLowerCase().includes(workSearchQuery);
    });

    grid.innerHTML = list.map((w) => `
      <article class="work-card" data-work-id="${w.id}">
        <div class="work-media-frame">
          <img src="${w.cover}" alt="${w.title}" decoding="async" />
          <div class="work-top-row">
            <span class="work-code-pill">${w.code}</span>
            <span class="work-hover-pill">查看复盘 ↗</span>
          </div>
        </div>
        <div class="work-body">
          <div class="work-meta-pills">
            <span class="work-cat-pill">${w.catLabel}</span>
            ${(w.tags || []).slice(0, 2).map((t) => `<span class="work-mini-tag">${t}</span>`).join("")}
          </div>
          <h3 class="work-title">${w.title}</h3>
          <p class="work-subtitle">${w.subtitle}</p>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".work-card").forEach((card) => {
      card.addEventListener("click", () => {
        const w = DATA.featuredWorks.find((x) => x.id === card.dataset.workId);
        if (w) openWorkDrawer(w);
      });
    });
  }

  function openWorkDrawer(w) {
    currentDrawerWork = w;
    const d = document.getElementById("workDrawer");
    if (!d) return;
    document.getElementById("drawerCatBadge").textContent = w.catLabel;
    document.getElementById("drawerCodeBadge").textContent = w.code;
    document.getElementById("drawerTitle").textContent = w.title;
    document.getElementById("drawerSubtitle").textContent = w.subtitle;
    document.getElementById("drawerMainImg").src = w.cover;
    document.getElementById("drawerProblem").textContent = w.problem;
    document.getElementById("drawerSolution").textContent = w.solution;
    document.getElementById("drawerHighlights").innerHTML = (w.highlights || []).map((x) => `<li>${x}</li>`).join("");
    document.getElementById("drawerDeliverables").innerHTML = (w.deliverables || []).map((x) => `<li>${x}</li>`).join("");
    d.hidden = false;
    d.setAttribute("aria-hidden", "false");
    d.querySelector(".drawer-scroll-body").scrollTop = 0;
    syncFloatBarVisibility();
  }

  function stepDrawerWork(delta) {
    const idx = DATA.featuredWorks.findIndex((w) => w.id === currentDrawerWork?.id);
    const next = (Math.max(0, idx) + delta + DATA.featuredWorks.length) % DATA.featuredWorks.length;
    openWorkDrawer(DATA.featuredWorks[next]);
  }

  function closeWorkDrawer() {
    const d = document.getElementById("workDrawer");
    if (!d) return;
    d.hidden = true;
    d.setAttribute("aria-hidden", "true");
    syncFloatBarVisibility();
  }

  // 7. Workflows, Services, Experiences & ECharts
  function initSectionsAndCharts() {
    const wfWrap = document.getElementById("stickyStackList");
    if (wfWrap) {
      wfWrap.innerHTML = DATA.stickyWorkflows.map((wf, idx) => `
        <article class="sticky-card" style="--idx:${idx};">
          <div class="sticky-left">
            <div class="sticky-head-meta">
              <span class="sticky-num">${wf.num}</span>
              <span class="mono-badge">${wf.badge}</span>
            </div>
            <h3 class="sticky-title">${wf.title}</h3>
            <p class="sticky-sub">${wf.subtitle}</p>
            <ul class="sticky-bullets">${wf.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          </div>
          <div class="sticky-visual-trio">
            ${wf.images.map((im) => `<div class="sticky-img-tile"><img src="${im.src}" alt="${im.label}" /></div>`).join("")}
          </div>
        </article>
      `).join("");
    }

    const sGrid = document.getElementById("servicesGrid");
    if (sGrid) {
      sGrid.innerHTML = DATA.services.map((s) => `
        <article class="pillar-card">
          <h3 class="pillar-title">${s.title}</h3>
          <p class="pillar-desc">${s.desc}</p>
          <ul class="pillar-items">${s.items.map((it) => `<li>${it}</li>`).join("")}</ul>
          <div class="pillar-foot">
            <button type="button" class="pillar-inquire-btn" data-svc="${s.title}">一键预约此类 ↗</button>
          </div>
        </article>
      `).join("");
      sGrid.addEventListener("click", (e) => {
        const btn = e.target.closest(".pillar-inquire-btn");
        if (!btn) return;
        const topic = document.getElementById("inqTopic");
        if (topic) topic.value = `咨询 / 预约：${btn.dataset.svc}`;
        document.getElementById("sec-contact")?.scrollIntoView({ behavior: "smooth" });
        const panel = document.querySelector(".contact-form-panel");
        panel?.classList.add("is-highlighted");
        setTimeout(() => panel?.classList.remove("is-highlighted"), 1200);
      });
    }

    const expList = document.getElementById("expAccordionList");
    if (expList) {
      expList.innerHTML = DATA.experiences.map((ex, i) => `
        <div class="acc-item ${i === 0 ? "is-open" : ""}">
          <button type="button" class="acc-trigger" aria-expanded="${i === 0 ? "true" : "false"}">
            <span class="acc-code">${ex.code}</span>
            <span class="acc-cat">${ex.tag}</span>
            <span class="acc-title">${ex.title}</span>
            <span class="acc-meta">${ex.period}</span>
            <span class="acc-plus">+</span>
          </button>
          <div class="acc-panel"><div class="acc-panel-inner"><div class="acc-body">
            <p>${ex.detail}</p>
            <div class="acc-pills-row">${ex.chips.map((c) => `<span class="acc-chip">${c}</span>`).join("")}</div>
          </div></div></div>
        </div>
      `).join("");
      expList.addEventListener("click", (e) => {
        const tr = e.target.closest(".acc-trigger");
        if (!tr) return;
        const item = tr.closest(".acc-item");
        const open = item.classList.toggle("is-open");
        tr.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    const cloud = document.getElementById("toolStackCloud");
    if (cloud) cloud.innerHTML = DATA.toolStack.map((t) => `<span class="tool-pill">${t}</span>`).join("");

    if (typeof echarts !== "undefined") {
      radarChartInstance = echarts.init(document.getElementById("radarChart"));
      radarChartInstance.setOption({
        radar: {
          radius: "64%",
          indicator: DATA.radar.indicators,
          axisName: { color: "#111317", fontSize: 11.5, fontWeight: 700 }
        },
        series: [{
          type: "radar",
          data: [{
            value: DATA.radar.values,
            areaStyle: { color: "rgba(37, 99, 235, 0.24)" },
            lineStyle: { color: "#2563eb", width: 2.5 },
            itemStyle: { color: "#2563eb" }
          }]
        }]
      });

      const colors = ["#2563eb", "#f59e0b", "#10b981", "#818cf8"];
      donutChartInstance = echarts.init(document.getElementById("donutChart"));
      donutChartInstance.setOption({
        color: colors,
        series: [{ type: "pie", radius: ["48%", "78%"], label: { show: false }, data: DATA.donutData }]
      });
      document.getElementById("donutLegendList").innerHTML = DATA.donutData.map((d, i) => `
        <div class="donut-legend-row">
          <span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${colors[i]};margin-right:7px;"></i>${d.name}</span>
          <strong>${d.value} 项</strong>
        </div>
      `).join("");
      window.addEventListener("resize", () => { radarChartInstance?.resize(); donutChartInstance?.resize(); });
    }
  }

  // 8. Quick Q&A Studio + Command Palette + Form Quick Tags
  const QA_ANSWERS = {
    intern: "我目前为视觉传达与数字媒体交互专业大三在读（GPA 3.91/4.0，专业前 5%），已有一段暑期互联网体验设计实训经历。2027 年 6 月起可连续全职实习 4-6 个月，期待加入体验设计、品牌创意或数字营销设计团队。",
    skills: "核心界面与系统规范使用 Figma Variables + Rive 状态机；三维海报与包装渲染使用 Blender Cycles + C4D；平面与印前落地使用 Illustrator + Photoshop + Lightroom。",
    process: "商业合作固定三步：① 48 小时内提供情绪板与初步构图方向；② 定稿后开启 2 轮结构化反馈迭代；③ 交付全套可编辑 AI / Figma / Blender 源文件及专色印前标注。",
    contact: "微信号：zhixia_design_demo ｜ 作品集 PDF 获取邮箱：hello@zhixia-studio.example。加好友备注【实习面试】或【约稿合作】可 2 小时内回复。"
  };

  function syncFloatBarVisibility() {
    const bar = document.getElementById("quickFloatBar");
    if (!bar) return;
    const anyOpen = ["workDrawer", "qaModalBackdrop", "cmdPaletteBackdrop"].some((id) => {
      const el = document.getElementById(id);
      return el && !el.hidden;
    });
    bar.classList.toggle("is-hidden", anyOpen);
  }

  function bindGlobalModalsAndEvents() {
    const qaBack = document.getElementById("qaModalBackdrop");
    const qaAns = document.getElementById("qaAnswerBox");
    const openQa = () => { if (qaBack) { qaBack.hidden = false; qaBack.setAttribute("aria-hidden", "false"); syncFloatBarVisibility(); } };
    const closeQa = () => { if (qaBack) { qaBack.hidden = true; qaBack.setAttribute("aria-hidden", "true"); syncFloatBarVisibility(); } };
    if (qaAns) qaAns.textContent = QA_ANSWERS.intern;
    document.getElementById("qaChips")?.addEventListener("click", (e) => {
      const ch = e.target.closest(".qa-chip");
      if (!ch) return;
      document.querySelectorAll(".qa-chip").forEach((c) => c.classList.toggle("active", c === ch));
      if (qaAns) qaAns.textContent = QA_ANSWERS[ch.dataset.qa] || "";
    });
    document.getElementById("navQaTriggerBtn")?.addEventListener("click", openQa);
    document.getElementById("openQaStudioBtn")?.addEventListener("click", openQa);
    document.getElementById("floatQaBtn")?.addEventListener("click", openQa);
    document.getElementById("qaOverlay")?.addEventListener("click", closeQa);
    document.getElementById("qaCloseBtn")?.addEventListener("click", closeQa);

    const cmdBack = document.getElementById("cmdPaletteBackdrop");
    const cmdInp = document.getElementById("cmdSearchInput");
    const cmdList = document.getElementById("cmdResultsList");
    const openCmd = () => { if (cmdBack) { cmdBack.hidden = false; cmdBack.setAttribute("aria-hidden", "false"); renderCmd(""); syncFloatBarVisibility(); setTimeout(() => cmdInp?.focus(), 20); } };
    const closeCmd = () => { if (cmdBack) { cmdBack.hidden = true; cmdBack.setAttribute("aria-hidden", "true"); syncFloatBarVisibility(); } };

    function renderCmd(q) {
      if (!cmdList) return;
      const items = [
        { title: "前往实时调色对比实验室", sub: "Interactive Before/After Grading", run: () => document.getElementById("sec-lab")?.scrollIntoView({ behavior: "smooth" }) },
        { title: "打开 HR / 甲方互动快问快答台", sub: "实习到岗、约稿流程与 PDF", run: openQa },
        ...DATA.featuredWorks.map((w) => ({ title: `${w.code} · ${w.title}`, sub: w.catLabel, run: () => openWorkDrawer(w) }))
      ].filter((x) => !q || (x.title + x.sub).toLowerCase().includes(q.toLowerCase())).slice(0, 10);
      cmdList.innerHTML = items.map((it, idx) => `<button type="button" class="cmd-item" data-idx="${idx}"><strong>${it.title}</strong><span style="color:#9ca3af;font-size:12px;">${it.sub}</span></button>`).join("");
      cmdList.querySelectorAll(".cmd-item").forEach((btn) => btn.addEventListener("click", () => { closeCmd(); items[Number(btn.dataset.idx)]?.run(); }));
    }
    cmdInp?.addEventListener("input", () => renderCmd(cmdInp.value));
    document.getElementById("cmdPaletteTrigger")?.addEventListener("click", openCmd);
    document.getElementById("floatCmdBtn")?.addEventListener("click", openCmd);
    document.getElementById("cmdOverlay")?.addEventListener("click", closeCmd);
    document.getElementById("cmdCloseBtn")?.addEventListener("click", closeCmd);

    document.getElementById("drawerCloseBtn")?.addEventListener("click", closeWorkDrawer);
    document.getElementById("drawerOverlay")?.addEventListener("click", closeWorkDrawer);
    document.getElementById("drawerPrevWorkBtn")?.addEventListener("click", () => stepDrawerWork(-1));
    document.getElementById("drawerNextWorkBtn")?.addEventListener("click", () => stepDrawerWork(1));
    document.getElementById("drawerInquireBtn")?.addEventListener("click", () => {
      copyText(DATA.profile.wechat, `已复制《${currentDrawerWork?.title}》咨询话术与微信：${DATA.profile.wechat}`);
    });

    ["copyContactHeaderBtn", "heroCopyWechatBtn", "copyWechatContactBtn", "floatWechatBtn"].forEach((id) => {
      document.getElementById(id)?.addEventListener("click", () => copyText(DATA.profile.wechat, `已复制微信号：${DATA.profile.wechat}`));
    });

    document.getElementById("inqQuickTags")?.addEventListener("click", (e) => {
      const chip = e.target.closest(".inq-tag-chip");
      const inp = document.getElementById("inqDeliverable");
      if (!chip || !inp) return;
      const tag = chip.dataset.tag;
      const active = chip.classList.toggle("is-active");
      const arr = inp.value.split("·").map((s) => s.trim()).filter(Boolean);
      if (active && !arr.includes(tag)) arr.push(tag);
      else if (!active) { const i = arr.indexOf(tag); if (i >= 0) arr.splice(i, 1); }
      inp.value = arr.join(" · ");
    });

    document.getElementById("generateInquiryBtn")?.addEventListener("click", () => {
      const c = document.getElementById("inqCategory")?.value || "";
      const t = document.getElementById("inqTopic")?.value.trim() || "合作/面试邀约";
      const d = document.getElementById("inqDeliverable")?.value.trim() || "作品集 PDF / 初版方案";
      copyText(`你好林知夏！我在你的作品集网站看到了相关案例：\n1. 类型：${c}\n2. 说明：${t}\n3. 期望：${d}`, `已复制沟通卡片！微信：${DATA.profile.wechat}`);
    });

    document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      document.documentElement.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
    });

    const mobBtn = document.getElementById("mobileMenuBtn");
    const mobDrawer = document.getElementById("mobileNavDrawer");
    mobBtn?.addEventListener("click", () => { if (mobDrawer) mobDrawer.hidden = !mobDrawer.hidden; });
    mobDrawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { mobDrawer.hidden = true; }));
    document.getElementById("mobileCmdBtn")?.addEventListener("click", () => { if (mobDrawer) mobDrawer.hidden = true; openCmd(); });
    document.getElementById("mobileQaBtn")?.addEventListener("click", () => { if (mobDrawer) mobDrawer.hidden = true; openQa(); });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openCmd(); }
      if (e.key === "Escape") { closeCmd(); closeQa(); closeWorkDrawer(); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroWebglFluid();
    initHeroParallaxAndMetrics();
    initMarqueeAndScroll();
    initDesignGradingLab();
    initLanyardPhysics();
    initWorksGallery();
    initSectionsAndCharts();
    bindGlobalModalsAndEvents();
  });
})();
