# Diverse Photo-to-Cartoon Character & Domain Props Guide

Never force every user into a single tech-bro hoodie aesthetic. Adapt style, clothing, props, and lighting to both the user's **reference photo(s)** and **real profession**.

---

## 1. Universal Photo-to-Cartoon Prompt Formula

```text
[Style Base] + [Strict Facial & Hair Likeness from Photo] + [Gender / Vibe / Age] +
[Profession-Matched Outfit] + [Pose & Handheld Prop] + [Dual Rim Lights Matching Site Palette] +
[Uniform Solid #08080A Pitch-Dark Studio Backdrop + Sharp Silhouette + Zero Floor Shadows or Text]
```

**Essential Likeness & Cleanup Guardrails**:
- Keep exact eye shape, eyebrow thickness, nose bridge, jawline, smile warmth, and hair parting from the user's photo.
- Specify glasses explicitly (`thin-frame clear glasses` vs. `no glasses`). If the user's photo has sunglasses pushed up on the head or worn casually, add `NO sunglasses` unless requested.
- Specify `uniform pure solid dark background (#08080A)` so [cutout_avatar_rgba.py](../scripts/cutout_avatar_rgba.py) isolates clean RGBA edges without white/gray halos.

---

## 2. Six Diverse Cartoon & Stylized Character Styles (Copy & Customize)

### Style 1 · Pixar / Blender 3D 科技潮玩风（理工/产品/通用高质感）
```text
Stylized 3D Pixar and Blender Octane character bust portrait inspired strictly by the user's reference facial features, hairstyle, eyebrows, and expression, [wearing matte black half-zip tech hoodie / smart-casual knitwear] and [thin-frame clear glasses / no glasses], NO sunglasses. Chest-up centered framing facing forward with confident warm smile and subtle expressive hand gesture. Studio rim lights: subtle [violet #7B2EFF] on left contour and [neon lime #C7FF3D] edge highlight on right shoulder. Isolated cleanly on a completely uniform pure pitch-black background (#08080A), crisp silhouette, high-end subsurface skin scattering, 4k studio render.
```

### Style 2 · 潮流盲盒 Q 版 / 柔和 3D 黏土风（Pop-Mart Claymorphism · 设计/自媒体/教育/校园IP）
```text
Adorable collectible Pop-Mart vinyl designer toy / soft matte clay 3D bust portrait capturing the likeness, hairstyle, bangs, and bright cheerful expression of the user's reference photo (NO sunglasses). Slightly stylized rounded sculptural proportions, wearing [cream cable-knit vest over crisp white shirt / pastel studio jacket], holding [a compact vintage mirrorless camera / digital tablet stylus]. Soft velvety lighting with [Klein blue #2563EB] left rim glow and [warm amber #F59E0B] right edge rim light. Isolated on a uniform pure pitch-black studio backdrop (#08080A), zero floor shadows, ultra-clean edges.
```

### Style 3 · 赛博机能 / Arcane 电影厚涂 3D 风（影视/游戏美术/音乐/潮流先锋）
```text
Stylized painterly 3D character bust portrait inspired by Arcane hand-painted cinema style and user's exact facial likeness and hairstyle (NO sunglasses). Wearing [technical cyber-utility jacket with subtle metallic hardware and collar strap], calm charismatic half-smile, subtle dynamic three-quarter head angle looking toward viewer. Dramatic painterly brushwork texture on skin and fabric with [electric violet #7B2EFF] key rim and crisp [cyan/lime] edge highlight. Isolated cleanly on a pure pitch-black background (#08080A), sharp silhouette.
```

### Style 4 · 现代日系赛璐璐 / 国潮 2.5D 二次元立绘风（插画/传媒/ACG/年轻博主）
```text
Modern clean Japanese anime / crisp 2.5D cel-shaded editorial character bust illustration faithfully adapted from the user's facial likeness, hair silhouette, and eyes (NO sunglasses). Wearing [trendy oversized varsity jacket or minimalist graphic overshirt], friendly lively expression, holding [wireless studio headphones around neck / sketchbook]. Crisp clean linework, rich luminous anime cel-shading with [rose-magenta #F43F5E] and [indigo #818CF8] subtle rim lighting. Isolated cleanly on a uniform pitch-black background (#08080A), zero clutter or text.
```

### Style 5 · 轻奢杂志哑光 3D 潮偶风（金融/商科/法律/建筑/企业高管顾问）
```text
Sophisticated minimalist editorial matte 3D character bust portrait retaining the user's authentic facial likeness, groomed hairstyle, and poised intelligent expression (NO sunglasses). Wearing [tailored charcoal blazer over fine merino turtleneck / crisp tailored coat], subtle wristwatch visible with composed welcoming posture. Soft luxury fashion-magazine studio lighting with cool platinum key light and subtle [emerald #10B981 / champagne #EAB308] edge rim. Isolated cleanly on a pure solid pitch-black backdrop (#08080A), ultra-clean silhouette.
```

### Style 6 · 现代波普 / Risograph 杂志质感插画风（人文/作家/策展人/品牌战略）
```text
Contemporary editorial vector-meets-Risograph stylized character bust portrait inspired by the user's real facial features and hairstyle (NO sunglasses). Clean bold geometric shapes with subtle fine tactile grain shading, wearing [relaxed linen shirt or vintage corduroy jacket], thoughtful warm expression holding [a minimalist coffee cup or open art monograph]. High-contrast duotone studio rim accents in [warm vermilion #F43F5E and cobalt #2563EB]. Isolated cleanly on a uniform pitch-black background (#08080A), sharp cutout edge.
```

---

## 3. Profession × Gender Outfit & Handheld Prop Matrix

| Profession Track | Female / Neutral Outfit & Pose | Male / Neutral Outfit & Pose | Handheld / Neck Prop Ideas |
| :--- | :--- | :--- | :--- |
| **A. 工科/硬件/AI** | Structured bomber or crisp half-zip pullover, tucked bob/ponytail | Matte half-zip tech hoodie or minimalist utility overshirt | Tablet / sleek caliper / subtle pointing gesture |
| **B. 设计/摄影/艺术** | Oat knit vest + crisp shirt OR oversized studio denim jacket | Minimalist mock-neck tee + cropped designer workwear jacket | Compact mirrorless camera, Apple Pencil stylus, Pantone deck |
| **C. 商科/金融/PM** | Tailored ivory/charcoal blazer over silk/knit top | Tailored charcoal suit jacket over fine turtleneck (no tie) | Sleek laptop edge, metal fountain pen, minimal notebook |
| **D. 人文/教培/医法传** | Soft cashmere cardigan or crisp tailored medical/academic coat | Clean Oxford shirt with blazer or crisp academic coat | Open hardcover book, wireless condenser mic, stethoscope, gavel emblem |
| **E. 毕业生/个人IP** | Smart campus-creative knitwear / varsity layer, bright approachable smile | Clean layered overshirt / minimalist streetwear, confident energetic pose | Camera, headphones around neck, tablet, coffee cup |

---

## 4. Five-Discipline Floating Corner Props (20 Prompts, Solid `#08080A` Backdrop)

Use 4 matching props in `#sec-about` so every domain feels 100% bespoke (always append `isolated cleanly on a uniform solid pitch-black background #08080A, floating isometric 3D render, no floor shadow`):

- **Track A · 工科与硬科技**:
  1. `Matte obsidian precision planetary gear with violet & lime anodized bevel`
  2. `Translucent amethyst waveform oscilloscope torus with lime trace`
  3. `Futuristic ceramic semiconductor microchip with silver pins & violet core`
  4. `Chamfered obsidian-quartz optical prism refracting violet & lime caustics`
- **Track B · 设计 / 艺术 / 摄影**:
  1. `Matte obsidian & Klein-blue anodized vintage 50mm camera lens floating`
  2. `Floating fanned Pantone color swatch deck in Klein blue, warm amber, ivory, obsidian`
  3. `Sleek graphite digital design stylus pen with glowing warm amber nib`
  4. `Sculptural frosted acrylic glass ribbon / bezier spline wave with blue-amber caustics`
- **Track C · 商科 / 金融 / 产品**:
  1. `Minimalist 3D frosted glass & brushed emerald ascending bar chart monolith`
  2. `Polished obsidian brass balance scale geometric sculpture with subtle gold trim`
  3. `Precision metallic compass / directional prism symbolizing product strategy`
  4. `Translucent emerald glass stacked modular growth blocks floating smoothly`
- **Track D · 人文 / 传媒 / 教育 / 医法**:
  1. `Vintage matte-black & rose-gold broadcast studio condenser microphone`
  2. `3D minimalist hardcover open book with softly glowing warm bookmark ribbon`
  3. `Sleek anodized fountain pen nib sculptural macro with subtle ink-drop highlight`
  4. `Iridescent vinyl record disc & warm-amber acoustic waveform ring`
- **Track E · 毕业生 / 创作者通配**: Mix any 2 props from the user's major + `Minimalist 3D glossy graduation/launchpad badge prism` + `Sleek matte espresso cup or portable sketchbook`.
