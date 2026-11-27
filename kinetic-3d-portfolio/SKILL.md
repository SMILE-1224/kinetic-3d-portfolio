---
name: kinetic-3d-portfolio
description: >-
  Build or redesign a MotionSites-inspired 3D metallic dark-and-white editorial
  personal portfolio or studio showroom for ANY major or profession (engineering,
  design/art/media, business/finance/PM, humanities/education/law/medicine, and
  campus graduates or freelancers). Always adapts the interactive lab, accent
  palette, terminology, and custom photo-to-cartoon 3D/2.5D character mascot to
  the user's own field rather than assuming tech defaults. Activate whenever the
  user asks to create, upgrade, or clone a cool, futuristic, non-AI-cliché
  personal portfolio, interactive resume, or digital showcase.
---

# Kinetic 3D Portfolio Builder (`MotionSites` Cross-Discipline System)

Build a high-impact personal digital showroom anchored on five pillars: **Intuitive (直观)**, **Editorial Beauty (美观)**, **Kinetic Motion (炫酷)**, **Interactive Depth (沉浸/科技感)**, and **Human-Centered UX (人性化设计)** — explicitly eliminating generic SaaS grids, cheesy black-screen preloader splashes, and strobing text scrambles.

> **Golden Rule**: NEVER assume the user is a software or hardware engineer. Always run Step 1's profession discovery first and adapt every visual accent, card field, interactive lab instrument, and modal style to their actual discipline!

---

## Step 1: Mandatory Profession-First Discovery & 5-Track Auto-Mapping

Before generating content or UI structure, identify (or confirm with the user):
1. **Major / Profession & Target Visitors**: Who are you and who is visiting? (e.g., internship HR, brand clients, design directors, graduate school advisors, students, readers).
2. **Preferred Cartoon / Stylized Character Style + User Photos**: Let the user pick from 6 diverse cartoon/3D styles (see Step 2) and attach personal reference photo(s), OR describe gender, hairstyle, outfit, and glasses preference.
3. **Accent Palette Preset**: Keep the signature Obsidian `#0C0C0C` ↔ Pure White `#FFFFFF rounded-t-[48px]` editorial alternation, and choose the accent pair from [design-tokens-and-css.md](./references/design-tokens-and-css.md).
4. **Portfolio Inventory**: 4 hero metrics, 6–28 visual case studies, 3–6 workflow pillars, courses/experiences/archive items, and contact details (use clean placeholders if not provided; strip private IDs/schools if requested).

### 5-Discipline Adaptation Matrix

| Track | Target Disciplines | Default Accent Pair | `#sec-lab` Left Interactive Instrument | Floating Console Modal (`#termModalBackdrop` / `#qaModalBackdrop`) |
| :--- | :--- | :--- | :--- | :--- |
| **Track A · 工科与硬科技** | 控制/自动化、机械/CAD、电子/嵌入式、CS/AI、科研 | `#7B2EFF` + `#C7FF3D` | Real-time numerical PID oscilloscope / RAG weight sandbox / FEA load switcher | Geek CLI Terminal (`>_`) |
| **Track B · 设计与数字艺术** | 视觉传达、UI/UX、交互设计、建筑/环艺、摄影、影视动效 | `#2563EB` + `#F59E0B` (or `#7B2EFF` + `#F472B6`) | Live Before/After Split-Curtain Color Grading & Palette Studio / Material Light Preview | **Interactive Quick Q&A Studio** (`✨ 互动问答`) — zero intimidating CLI jargon |
| **Track C · 商科产品与金融** | 金融量化、商业分析、市场营销、产品经理、咨询 | `#10B981` + `#EAB308` | Live ROI / Growth Funnel Calculator & Portfolio Risk-Return Simulator | **Interactive Quick Q&A Studio** (`✨ 互动问答`) |
| **Track D · 人文社科与医法教传** | 传媒新闻、外语、教育培训、法律、医学、心理学、播客自媒体 | `#F43F5E` + `#818CF8` | Interactive Audio Wave / Diagnostic Matcher / Flip Knowledge Card Deck | **Interactive Quick Q&A Studio** (`✨ 互动问答`) |
| **Track E · 毕业生与自由职业** | 26/27届大三/应届求职、校园主理人、独立顾问 | Track-matched + `#7B2EFF`/`#2563EB` | Interactive Project Scope & Availability Estimator OR major-specific lab | **Interactive Quick Q&A Studio** or CLI based on major |

---

## Step 2: Diverse Photo-to-Cartoon Character & Floating Props

Follow [avatar-and-props-prompts.md](./references/avatar-and-props-prompts.md) to avoid repetitive "one-size-fits-all" avatars:

1. **Inspect Reference Photo(s)**: Preserve true facial proportions, eyebrows, nose bridge, hairstyle, skin tone, and smile. Explicitly honor glasses vs. no-glasses preference (never turn head-worn sunglasses into eye-worn sunglasses unless asked).
2. **Select from 6 Diverse Styles**:
   - **Style 1**: Pixar / Blender 3D 科技潮玩风 (Tech, Product, General STEM)
   - **Style 2**: Pop-Mart 潮流盲盒 Q 版 / 柔和 3D 黏土风 (Design, Education, Media, Campus Creators)
   - **Style 3**: 赛博机能 / Arcane 电影厚涂 3D 风 (Film, Game Art, Music, Esports)
   - **Style 4**: 现代日系赛璐璐 / 国潮 2.5D 二次元立绘风 (Illustration, ACG, Humanities, Creative Content)
   - **Style 5**: 轻奢杂志哑光 3D 潮偶风 (Finance, Consulting, Law, Architecture)
   - **Style 6**: 现代波普 / Risograph 印刷艺术插画风 (Curating, Literature, Brand Strategy)
3. **Tailor Outfit, Handheld Prop & 4 Corner Props**: Match gender, major, and accent rim lights (e.g., knit vest + mirrorless camera for visual design; blazer + fountain pen for law/finance; smart lab coat/stethoscope for medicine; half-zip hoodie for tech) on a **completely solid `#08080A` dark studio background**.
4. **Extract Halo-Free RGBA PNGs**:
   ```bash
   python ./scripts/cutout_avatar_rgba.py raw_avatar.jpg ./assets/hero-avatar-3d.png
   ```
   Also support clean `.svg` editorial posters for works/marquee covers when photography or renders are unavailable.

---

## Step 3: 9-Section Alternating Editorial Architecture (`#0C0C0C` ↔ `#FFFFFF`)

1. **Borderless-to-Frosted Floating Header (`#siteHeader`)**: Transparent minimal row at `y = 0`; transitions smoothly to frosted dark glass (`.is-scrolled`) past `36px`. Single clean row on desktop; compact mobile header (`<= 640px`) with hamburger drawer.
2. **Full-Viewport `100svh` MotionSites Hero (`#top`)**:
   - Calm WebGL GLSL fluid silk shader (`opacity: 0.54`, tinted cleanly to the track's accent hue) + bottom/center radial studio halo.
   - Centerpiece: Full-width two-line `Kanit` 800/900 steel-silver gradient headline (`#E5EDF5 → #59626C`) + centered overlapping stylized cartoon/3D portrait (`#heroAvatarWrap`) with bottom alpha-fade mask and smooth damped pointer 3D parallax.
   - Bottom Split Bar: Left 2-line value proposition + solid primary track-accent CTA pill + `#sec-lab` outline pill + one-click contact copy pill; Right 4-column borderless `Kanit` Giant Metric counters.
3. **Dual-Row Velocity-Skewed Marquee**: Dark `#15171F` showcase cards with crisp inner display frames scrolling seamlessly in opposite directions via dynamic `row.scrollWidth / 2` modulo, scroll velocity `skewX`, pointer-drag scrubbing, and hover focus slow-down.
4. **`ABOUT ME` Parallax Section (`#sec-about`)**: Stacked `Kanit` headline + mini avatar chip, character-by-character scroll opacity reveal, 4 domain-matched floating corner props with mouse-repulsion spring physics, and 3 hairline columns.
5. **Pure White `FEATURED WORKS` Gallery (`#sec-works`)**:
   - **Persona Intent Quick-Switch Strip (`#workIntentButtons`)** aligned to the user's real visitors (e.g., `我是 HR · 看实习项目` vs `我是甲方 · 看商业约稿`; **always verify button counts match `DATA.featuredWorks` dynamically!**).
   - **Editorial Unboxed Cards**: Rounded `#F3F4F7` `.work-media-frame` on top (receiving hover/3D spotlight), open unboxed category pill + tags + title + 2-line summary below.
   - Slide-over Case Study Drawer (`#workDrawer`) with snappy `240ms` `36px` fade-slide entrance, multi-image gallery lightbox, keyboard `←/→/Esc`, and `← 上一作品 / 下一作品 →` footer switcher.
6. **Obsidian Sticky-Stacking Workflows (`#sec-workflows`)**: Flagship cards (`01`–`04/06`) using `position: sticky; top: calc(84px + var(--idx) * 18px);` with subtle scale recession.
7. **Dedicated Interactive Lab (`#sec-lab`)**: Two-column showcase pairing the **Discipline-Specific Live Interactive Instrument** (left) with the **Verlet 8-Node Rope Physics 3D Pass Card** (`drag & fling` + `180°` flip, right) and a trigger for the **Geek CLI** OR **Quick Q&A Studio**.
8. **Capabilities / Resume Timeline / ECharts Analytics**: Service or internship experience accordions (`grid-template-rows: 0fr → 1fr`, `.acc-trigger > * { pointer-events: none; }`), one-click card-to-contact inquiry buttons, and optional ECharts capability radar/donut/topology graph.
9. **Obsidian `LET'S BUILD / CREATE` Contact Sheet (`#sec-contact`) & Smart Float Pill (`#quickFloatBar`)**: Radial studio halo, 2×2 contact cards, **30-Second Brief Generator** with 5 clickable **Zero-Typing Quick Preference Chips**, and bottom-right `#quickFloatBar` hidden at `scrollY < 360` and whenever drawers/modals open.

---

## Step 4 & Step 5: Visual Tokens, Engines & Layout Redlines

- Consult [design-tokens-and-css.md](./references/design-tokens-and-css.md) and [interactive-engines.md](./references/interactive-engines.md).
- **Mandatory Redlines**:
  - Zero `#preloader` black-curtain splashes or text scrambles.
  - `html, body { overflow-x: clip; }` (NEVER `overflow-x: hidden`), and NEVER apply `position: relative` or 3D tilt transform to `.sticky-card`.
  - Apply 3D tilt to `.work-media-frame` only.
  - Switch `.hero-avatar-stage` to in-flow `position: relative` below `768px` so mobile stacks cleanly with `0px` overlap or overflow.
  - Compute or verify exact item counts on every filter badge/chip against `data.js`.

---

## Step 6: Verification Checklist

1. Run the static asset & redline audit:
   ```bash
   python ./scripts/audit_portfolio.py .
   ```
2. Test live in Desktop (`1440×900`) and Mobile (`390×844`):
   - `0` console errors, `0` broken images/SVGs, clean cutout on `#0C0C0C`.
   - Sticky cards remain `position: sticky` during scroll.
   - `#sec-lab` interactive controls, Verlet lanyard flip/drag, intent switcher, drawer prev/next, quick-tag form fill, and modal studio all work live.
   - Mobile `390×844` yields `0px` horizontal overflow across top, middle, and bottom scroll positions.
