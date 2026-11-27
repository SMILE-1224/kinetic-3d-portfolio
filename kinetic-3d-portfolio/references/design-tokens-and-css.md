# Design Tokens, Theme Presets & Layout Redlines (`MotionSites` System)

## 1. Google Fonts `<head>` Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Kanit:wght@700;800;900&family=Noto+Sans+SC:wght@400;500;700;900&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
```

---

## 2. Core CSS Custom Properties & 5 Discipline Accent Presets

Keep the signature **Obsidian `#0C0C0C` ↔ Pure White `#FFFFFF rounded-t-[48px]`** canvas rhythm across every major, and swap only `--accent-primary` and `--accent-spark` to match the user's discipline:

```css
:root {
  --bg-obsidian: #0c0c0c;
  --bg-obsidian-2: #141416;
  --bg-obsidian-card: #161619;
  --bg-white: #ffffff;
  --bg-stone: #f3f4f7;
  --ink-light: #f5f6f8;
  --ink-light-muted: #9ca3af;
  --ink-dark: #111317;
  --ink-dark-muted: #525866;
  --line-dark: rgba(255, 255, 255, 0.12);
  --line-dark-strong: rgba(255, 255, 255, 0.24);
  --line-light: rgba(17, 19, 23, 0.11);
  --accent-primary: #7b2eff;      /* Override per discipline below */
  --accent-spark: #c7ff3d;        /* Override per discipline below */
  --grad-metal: linear-gradient(180deg, #e5edf5 0%, #9aa4b0 56%, #59626c 100%);
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --sheet-radius: 48px;
}
```

### 2.5 Discipline Accent Preset Table

| Discipline Track | `--accent-primary` (CTA / Glow) | `--accent-spark` (Badges / Highlights) | Hero WebGL Tint Feel |
| :--- | :--- | :--- | :--- |
| **Track A · Engineering & AI** | `#7B2EFF` (Electric Violet) | `#C7FF3D` (Neon Lime) | Deep cosmic purple + crisp lime silk |
| **Track B · Design, UI & Media** | `#2563EB` (Klein Blue) | `#F59E0B` (Warm Amber) | Gallery Klein blue + warm amber rim |
| **Track C · Business, Fin & PM** | `#10B981` (Emerald) | `#EAB308` (Champagne Gold) | Deep emerald glass + warm gold spark |
| **Track D · Humanities, Edu & Law/Med** | `#F43F5E` (Editorial Rose) | `#818CF8` (Soft Indigo) | Warm studio rose + serene indigo |
| **Track E · Monochrome Swiss Minimal** | `#E5EDF5` (Platinum Ink `#111317` text) | `#A1A1AA` (Brushed Silver) | Pure silver graphite silk (zero neon) |

---

## 3. Metallic Display Headings & Rounded Sheets

```css
.display-xl {
  font-family: "Kanit", "Noto Sans SC", "Outfit", sans-serif;
  font-size: clamp(38px, 5.4vw, 72px);
  font-weight: 800;
  line-height: 0.90;
  letter-spacing: -0.03em;
  background: var(--grad-metal);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.display-xl.dark-ink {
  background: none;
  -webkit-background-clip: initial;
  background-clip: initial;
  color: var(--ink-dark);
}

.rounded-sheet {
  position: relative;
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 86px 0 96px;
  margin-top: -36px;
}
```

---

## 4. MotionSites Hero Centerpiece & Mobile Fallback

```css
.hero-stage {
  position: relative;
  min-height: 100svh;
  padding: 86px 0 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-obsidian);
  overflow: clip;
}

.hero-centerpiece {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: clamp(340px, 53vh, 520px);
  text-align: center;
}

.hero-giant-heading {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 0.88;
  margin-bottom: clamp(46px, 8vh, 92px);
  pointer-events: none;
}

.hero-giant-cn {
  font-family: "Noto Sans SC", "Kanit", sans-serif;
  font-weight: 900;
  font-size: clamp(42px, 7.6vw, 110px);
  background: var(--grad-metal);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-giant-en {
  font-family: "Kanit", sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 10.6vw, 154px);
  text-transform: uppercase;
  white-space: nowrap;
  background: var(--grad-metal);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-avatar-stage {
  position: absolute;
  left: 50%;
  bottom: -14px;
  transform: translateX(-50%);
  z-index: 4;
  height: clamp(290px, 46vh, 455px);
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.hero-avatar-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 24px 44px rgba(0, 0, 0, 0.78));
  -webkit-mask-image: linear-gradient(180deg, #000 80%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 80%, transparent 100%);
}

@media (max-width: 768px) {
  .hero-centerpiece { min-height: auto; padding: 8px 0 4px; }
  .hero-giant-heading { margin-bottom: 0; }
  .hero-avatar-stage {
    position: relative;
    left: auto;
    bottom: auto;
    transform: none !important;
    height: 210px;
    margin-top: -14px;
  }
}
```

---

## 5. Unboxed Editorial Gallery Cards & Critical CSS Redlines

1. **Unboxed `.work-card`**: Do NOT wrap card text in a heavy rectangular SaaS card border. Put borders, rounded `22px` corners, and 3D spotlight/tilt ONLY on `.work-media-frame`.
2. **`position: sticky` Survival**:
   - Use `overflow-x: clip;` on BOTH `html` and `body` (never `overflow-x: hidden`).
   - NEVER include `.sticky-card` inside a `position: relative;` utility block; keep `.sticky-card { position: sticky; top: calc(84px + var(--idx, 0) * 18px); }` intact above `900px`.
3. **Accordion Click Target**: Add `.acc-trigger > * { pointer-events: none; }` and `scroll-margin-top: 90px;`.
4. **Drawer Fast Slide-In & Wide Awwwards Bento Sheet**:
   - Animate `.drawer-panel` (`width: min(940px, 96vw)`) from `opacity: 0; transform: translateX(36px);` over `0.24s` (not `100%`) so footer buttons (`← 上一作品 / 下一作品 →`) stay clickable immediately.
   - Inside `.drawer-scroll-body`, replace plain stacked boxes with 7 distinct Bento surfaces: `.drawer-hero-stage` (`#0d1018` ambient cover + lightbox trigger), `.drawer-kpi-grid` (`repeat(3, 1fr)`), asymmetric `.drawer-narrative-grid` (dark `.drawer-card-challenge` vs light `.drawer-card-strategy`), 4-col `.drawer-process-flow`, interactive `.drawer-palette-strip` / `.drawer-spec-strip`, `repeat(2, 1fr)` `.drawer-highlights-grid`, and `repeat(3, 1fr)` `.drawer-deliverables-grid` (collapsing cleanly to `1fr` under `640px–900px`).
5. **High-Impact Zero-Flicker Scroll Motion**:
   - **Masked Split-Line Headings**: `[data-kinetic-heading]` splits lines into `.kinetic-line` (`overflow: hidden`) + `.kinetic-line-inner` sliding from `translateY(112%) skewY(2.2deg)` to `0` when `.is-revealed` fires (with `prefers-reduced-motion` fallback). **CRITICAL**: Put `background: var(--grad-metal); -webkit-background-clip: text; color: transparent;` onto `.kinetic-line-inner` (and clear it on `.display-xl[data-kinetic-heading]`) so WebKit gradient text renders cleanly through transformed spans!
   - **Kinetic Ribbon Dividers**: `.kinetic-ribbon-band` full-bleed typographic bands scrolled cleanly inside the shared marquee rAF loop.
   - **Floating Orbit Chips**: Desktop-only `.hero-orbit-chip` (`hidden <= 1024px`) so `390px` mobile stays clean.
6. **Mobile Navbar (`<= 640px`)**: Hide desktop search/modal/SFX buttons below `1024px–1180px`, compact `.nav-shell` to `height: 48px; overflow: hidden;` so mobile never overflows `390px`.
