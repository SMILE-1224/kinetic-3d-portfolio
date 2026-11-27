# Kinetic 3D Portfolio Kit

**MotionSites 风格 · 零 AI 味 · 全专业通用 3D 交互个人作品集复刻指南与 Agent Skill 套件**

本仓库整合了一套围绕 **直观、美观、炫酷、科技感、人性化设计** 五大维度的个人数字展厅构建体系，不仅适合工科与开发人群，也能通过 **专业前置诊断 + 5 大跨学科赛道自适应 + 6 大多样化卡通形象定制**，服务于视觉设计、产品/金融商科、人文传媒、医学法律教育以及大三/应届求职毕业生。

---

## 目录一览

1. **[MotionSites风格_3D科技感个人作品集_复刻提示词与Skill全套指南.docx](./MotionSites%E9%A3%8E%E6%A0%BC_3D%E7%A7%91%E6%8A%80%E6%84%9F%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86_%E5%A4%8D%E5%88%BB%E6%8F%90%E7%A4%BA%E8%AF%8D%E4%B8%8ESkill%E5%85%A8%E5%A5%97%E6%8C%87%E5%8D%97.docx)**  
   完整 Word 教程文档：含全学科通用 Master Prompt、6 种不同卡通人物风格生图配方、5 行业 20 件悬浮摆件 Prompt、避坑红线与 Skill 安装说明。
2. **[kinetic-3d-portfolio/](./kinetic-3d-portfolio/SKILL.md)**（及一键分享压缩包 **[kinetic-3d-portfolio-skill.zip](./kinetic-3d-portfolio-skill.zip)**）  
   标准跨平台 Agent Skill（兼容 **Antigravity / Gemini / Claude Code / Codex / Cursor**）：
   - `SKILL.md`：6 步标准工作流（强制先诊断专业赛道与卡通画风，再搭建页面）
   - `references/avatar-and-props-prompts.md`：6 种卡通角色风格 × 5 大专业穿搭/摆件 Prompt 矩阵
   - `references/design-tokens-and-css.md`：`Kanit` 钢银金属渐变、5 套行业配色预设、`48px` 圆角画廊与 `sticky` 红线
   - `references/interactive-engines.md`：WebGL 流体丝绸、Verlet 物理 3D 工牌、5 赛道 `#sec-lab` 交互台及非工科「互动快问快答台」蓝图
   - `scripts/cutout_avatar_rgba.py`：纯黑/纯色棚拍渲染图一键去黑底/防白边透明 PNG 抠图脚本
   - `scripts/audit_portfolio.py`：PNG/JPG/SVG 资产完整性、`overflow-x: clip` 与脱敏审计脚本
3. **[examples/junior-designer-demo/](./examples/junior-designer-demo/index.html)**  
   **大三非工科生实测通过 Demo**（`2027 届视觉传达与交互设计` 角色）：采用 **Style 2 盲盒 Q 版 3D 女生形象** + **克莱因蓝 `#2563EB` / 暖琥珀 `#F59E0B`** 配色 + **双帘实时调色工作室 `#sec-lab`** + **HR / 甲方来意分流** + **互动快问快答台**，已实机验证桌面 `1440×900` 与移动端 `390×844` 全链路 0 报错、0 横向溢出。

---

## 快速安装与使用 Skill

1. **导入 Skill**：将 `kinetic-3d-portfolio/` 文件夹复制到：
   - **项目级（推荐团队复用）**：`<你的项目>/.agents/skills/kinetic-3d-portfolio/`
   - **全局通用**：`~/.gemini/config/skills/`（Antigravity/Gemini）或 `~/.claude/skills/`（Claude Code/Codex）或 `~/.cursor/skills/`（Cursor）
2. **上传个人照片并在对话中输入**（示例）：
   > *“请使用 `kinetic-3d-portfolio` 技能为我搭建个人作品集。我是【临床医学 / 视觉设计 / 金融分析 / 软件工程】大三学生，想找【暑期实习 / 商业合作】。这是我的照片，帮我定制成【盲盒黏土 3D / 日系赛璐璐 / 轻奢商务风】卡通形象，并搭配符合我专业的交互实验室。”*
