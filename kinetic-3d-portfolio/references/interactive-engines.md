# Interactive Physics, Shader & Adaptive Lab Engines Blueprint

Keep every interactive engine 100% dependency-free (Vanilla JS + WebGL / Canvas 2D / Web Audio API), auto-sleeping when scrolled out of view via `IntersectionObserver`, and respectful of `(prefers-reduced-motion: reduce)`.

---

## 1. Calm WebGL GLSL Fluid Silk Shader (`initHeroWebglFluid`)

- Render a full-bleed `<canvas id="heroWebglCanvas">` inside `#top` (`opacity: 0.54`).
- Parameterize `u_primary` and `u_spark` vec3 uniforms from the active discipline palette (`#7B2EFF+#C7FF3D`, `#2563EB+#F59E0B`, `#10B981+#EAB308`, etc.) so non-engineering sites carry their own signature atmosphere instead of looking tech-generic.
- Fragment shader uses 4-octave `fbm()` domain warping reacting smoothly to normalized pointer coordinates, plus automatic **Canvas 2D radial gradient fallback**.

---

## 2. Verlet 8-Node Rope Physics 3D Pass Card (`initLanyardPhysics`)

- Simulate an 8-node spring chain anchored at top-center with 6 constraint iterations per frame, `0.982` damping, `0.52` gravity, and gentle breeze sway.
- Support pointer capture drag & release fling velocity (`tip.ox = tip.x - velX`), dynamic `rotateZ/Y/X`, cursor-tracked `mix-blend-mode: screen` holographic foil, and `180°` card flip (`.is-flipped` via button or double-click).
- **Non-Tech Adaptation**: Change the front/back card copy to match the user's status (e.g., `ID-2027 · OPEN FOR INTERNSHIP`, `DESIGNER PASS`, `CREATIVE DIRECTOR`, `CONSULTANT PASS` with relevant degree/availability specs and copyable email/WeChat).

---

## 3. Adaptive `#sec-lab` Instruments Across All 5 Disciplines

Choose the interactive lab engine that showcases authentic domain fluency:

1. **Track A (Control / AI / Mechanical)**:
   - *Servo PID Scope*: Integrate `y'' + 2*zeta*wn*y' + wn^2*y = wn^2*(u*0.36 + dist)` at `dt = 0.01`, computing live `Mp`, `tr`, `ts`, `ess` + disturbance injection.
   - *AI Hybrid RAG*: Interactive BM25 vs Dense Vector weight slider recalculating Top-K document chunk scores and latency readout.
2. **Track B (Design / Photography / Visual Arts / Film)**:
   - **Live Before/After Split-Curtain Grading & Palette Studio**: Draw an artistic editorial studio composition on Canvas 2D with a draggable vertical curtain (`Before RAW` on left vs `After Graded` on right), 3 real-time sliders (`曝光 Exposure`, `色温 Warmth`, `胶片反差 Contrast`), 3 one-click style presets (e.g., `克莱因画报`, `暖阳胶片`, `赛博暗调`), live palette hex swatches, and a `"复制当前色板 CSS ↗"` button!
3. **Track C (Business / Finance / Product Manager)**:
   - **Live Growth Funnel / ROI Simulator**: Traffic, Conversion Rate, and Retention sliders rendering animated step-by-step funnel bars on Canvas + real-time LTV/CAC ratio & projected monthly revenue readout.
4. **Track D (Humanities / Media / Education / Law / Medicine)**:
   - **Interactive Podcast Waveform / Diagnostic Matcher / Study Card Deck**: Clickable scenario tabs or audio-reactive Canvas bars + instant insight takeaways + one-click bookmarking into the inquiry brief.
5. **Track E (Campus Graduate / Freelance Scope Estimator)**:
   - Deliverable complexity + turnaround days sliders + toggleable add-ons outputting estimated timeline & readiness directly into `#inqDeliverable`.

---

## 4. Seamless Dual-Row Velocity Marquee (`initMarquee` + `stepMarquee`)

- Duplicate items cleanly once (`[...list, ...list]`) and compute `halfW = row.scrollWidth / 2` dynamically inside rAF (eliminates seam jump bugs).
- Support scroll-velocity `skewX`, drag scrubbing (`6px` click-suppress threshold), and hover focus slowdown (`0.18x`).

---

## 5. Adaptive Console Modal (`#termModalBackdrop` vs `#qaModalBackdrop`)

- **Tech Users**: Keep `>_` Geek CLI Terminal (`whoami`, `works`, `lab`, `contact`, `theme`).
- **Design / Business / Humanities / General Users**: Keep the sleek macOS-style floating modal aesthetic, but transform it into **"✨ 互动快问快答台 (Quick Q&A Studio)"** with friendly clickable topic chips (`求职/合作意向`, `核心软件与技能`, `代表项目亮点`, `报价与档期说明`, `一键复制联系方式`) — approachable, zero-intimidation, and intuitive for HR or clients!

---

## 6. Human-Centered Conversion Flow & Slider Precision

1. **Visitor Intent Quick-Switch (`#workIntentButtons`)**: Split works by real visitor persona (e.g. `HR · 看实习项目` vs `甲方 · 看商业约稿`). Always compute counts dynamically or match `data.js` 1:1.
2. **Range Slider Step Alignment**: When binding preset buttons to `<input type="range" step="0.02">`, ensure `(presetValue - min)` is an exact integer multiple of `step` (e.g. use `min="0.80"` rather than `0.85` for even `0.02` steps) so preset reads back exact values without browser step rounding.
3. **One-Click Service/Course/Experience Inquiry**: Populate `#inqCategory` and `#inqTopic`, smooth-scroll to `#sec-contact`, flash `.is-highlighted`, and copy contact template.
4. **Zero-Typing Quick Preference Chips (`#inqQuickTags`)**: Toggleable chips auto-joining into `#inqDeliverable`.
5. **Drawer Prev/Next Continuous Browsing (`#drawerPrevWorkBtn` / `#drawerNextWorkBtn`)** + scroll-revealed `#quickFloatBar`.
