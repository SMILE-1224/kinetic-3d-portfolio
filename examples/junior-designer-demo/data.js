window.PORTFOLIO_DATA = {
  profile: {
    brandCn: "林知夏,",
    brandEn: "ZHIXIA STUDIO",
    roleLine: "2027届视觉传达与交互设计在读（大三） · 校园文创主理人 · 寻找 2027 暑期 UI/品牌设计实习",
    wechat: "zhixia_design_demo",
    email: "hello@zhixia-studio.example",
    availability: "2027 暑期可全职实习 4-6 个月 · 商业约稿 48H 内出初版方案"
  },
  heroStats: [
    { top: "CURATED WORKS", target: 14, suffix: "+", label: "完整设计全案" },
    { top: "VISUAL ARCHIVE", target: 42, suffix: "+", label: "海报 / 动效 / 包装" },
    { top: "DESIGN HONORS", target: 8, suffix: "项", label: "大广赛与设计奖项" },
    { top: "INTERNSHIP READY", target: 100, suffix: "%", label: "即刻到岗交付力" }
  ],
  featuredWorks: [
    {
      id: "ui-pulse",
      code: "UI-01",
      intent: "hr",
      category: "ui",
      catLabel: "PRODUCT UI · DESIGN SYSTEM",
      title: "PULSE 空间音频与情绪歌单 App 全链路交互重构",
      subtitle: "面向 Z 世代通勤与专注场景的深色空间声场播放器，构建 48 个响应式 Figma Tokens 与动效曲线。",
      role: "核心交互 & Design System 主创",
      timeline: "5 周 · 个人端到端全案",
      tags: ["Figma Variables", "Design System", "Lottie"],
      cover: "./assets/covers/case-01.svg",
      palette: ["#0B1021", "#2563EB", "#60A5FA", "#F59E0B"],
      metrics: [
        { value: "48 组", label: "Dark/Light 语义化 Token" },
        { value: "96%", label: "研发物理微交互还原率" },
        { value: "-38%", label: "32名内测用户任务耗时降幅" }
      ],
      process: [
        { step: "01", title: "深色声场调研", desc: "拆解夜间与通勤 14 个核心听歌触点，消除 4 级跳转冗余。" },
        { step: "02", title: "单指手势重构", desc: "建立双态情绪胶囊导航，1 秒直达白噪音混音台。" },
        { step: "03", title: "语义化 Token", desc: "用 Figma Variables 搭建 48 组双态颜色与圆角变量规范。" },
        { step: "04", title: "32人走查交付", desc: "输出弹簧物理黑胶阻尼参数表与 Lottie 微交互资源。" }
      ],
      problem: "旧版音频产品歌单发现路径长达 4 级，且夜间播放页高饱和背景叠加专辑图容易造成文字可读性下降。",
      solution: "引入双态情绪胶囊导航与模糊专辑微光扩散层，将“一键进入白噪音混音台”缩短至单指手势 1 秒直达，并交付完整 Design Token 规范文档。",
      highlights: [
        "基于 Figma Variables 搭建 Dark / Light 48 组语义化颜色与间距 Token",
        "设计物理惯性黑胶微交互与波形阻尼反馈，研发还原率达 96%",
        "校园 32 名内测用户可用性测试任务完成时间下降 38%"
      ],
      deliverables: ["Figma 完整组件库源文件", "微交互动效参数规范表", "30 页求职复盘演讲稿"]
    },
    {
      id: "ui-aura",
      code: "UI-02",
      intent: "hr",
      category: "ui",
      catLabel: "AI WORKSPACE · CANVAS UX",
      title: "AURA NOTES 无限画布灵感收集与 AI 情绪版工作台",
      subtitle: "专为设计师与策展人打造的无界参考图采集白板，支持自动色板提取与网格磁吸排布。",
      role: "空间画布 UX & AI 交互设计",
      timeline: "4 周 · 课程高分旗舰作品",
      tags: ["Spatial UI", "Color Extraction", "Web App"],
      cover: "./assets/covers/case-02.svg",
      palette: ["#0E1528", "#3B82F6", "#818CF8", "#FBBF24"],
      metrics: [
        { value: "0.3s", label: "拖入自动提取 5 色 Pantone" },
        { value: "18 套", label: "空状态与拖拽反馈规范" },
        { value: "96/100", label: "大三交互设计方向最高分" }
      ],
      process: [
        { step: "01", title: "跨工具痛点梳理", desc: "追踪 12 位设计生采图路线，定位色相检索与归档断点。" },
        { step: "02", title: "无边沉浸画布", desc: "设定鼠标静止 1.5s 自动隐退工具栏的零干扰视口。" },
        { step: "03", title: "悬浮吸管色轮", desc: "拖入参考图即时聚类主副色阶并联动 Pantone 标签。" },
        { step: "04", title: "高保真 Web 交付", desc: "交付全交互状态机原型与关键画布缩放标注。" }
      ],
      problem: "设计师收集灵感时需在花瓣、Pinterest 与本地文件夹间反复切换，参考图无法直接按色系或构图检索。",
      solution: "设计悬浮吸管色相筛选条与自由画布缩放比例锚点，实现拖入图片 0.3 秒生成 5 色 Pantone 卡片并自动归档。",
      highlights: [
        "首创无边框零干扰画布工具栏，鼠标静止 1.5s 自动收起边栏",
        "整理 18 套高对比度空状态与拖拽反馈插画规范",
        "获大三下学期校内交互设计方向课程最高分（96/100）"
      ],
      deliverables: ["Web 端高保真原型链接", "用户旅程地图与竞品拆解", "核心组件切图标注"]
    },
    {
      id: "ui-orbit",
      code: "UI-03",
      intent: "hr",
      category: "ui",
      catLabel: "DATA VISUALIZATION · B2B",
      title: "ORBIT STUDIO 校园社团活动票务与文创数据看板",
      subtitle: "将复杂的多校区票务核销与文创周边库存转化为直观可视化图表，助力社团运营决策。",
      role: "B端数据可视化 & H5 核销设计",
      timeline: "3 周 · 校园文化节实战上线",
      tags: ["Dashboard UI", "ECharts Spec", "Responsive"],
      cover: "./assets/covers/case-03.svg",
      palette: ["#0F172A", "#2563EB", "#A3E635", "#F59E0B"],
      metrics: [
        { value: "2,400+", label: "电子票务现场流畅核销人次" },
        { value: "22 张", label: "B端后台与双端响应式界面" },
        { value: "6 类", label: "全光照高对比图表字体规范" }
      ],
      process: [
        { step: "01", title: "Excel 核销诊断", desc: "跟随 4 个校园市集现场记录扫码拥堵与尺码错漏盲区。" },
        { step: "02", title: "PC+H5 信息重构", desc: "划分票务实时大盘、断码琥珀预警与移动端单手核销区。" },
        { step: "03", title: "户内/外对比度", desc: "以克莱因蓝主轨叠加亮青/琥珀警告标签统一 6 类图表。" },
        { step: "04", title: "线上走查验收", desc: "完成 22 张端到端页面及走查验收清单，文化节零事故上线。" }
      ],
      problem: "此前校园演出与市集均靠手动填 Excel，无法实时掌握不同学院观演偏好与周边尺码断货预警。",
      solution: "以极简卡片栅格搭配克莱因蓝主色与琥珀预警标签，重构移动端扫码核销端与 PC 端数据概览页。",
      highlights: [
        "统一 6 类图表字号对比度，确保户外阳光与室内暗光均清晰易读",
        "协助校园文化节累计完成 2,400+ 人次电子票务流畅核销"
      ],
      deliverables: ["B端后台界面 22 张", "移动端核销 H5 设计稿", "视觉走查验收清单"]
    },
    {
      id: "ui-velvet",
      code: "UI-04",
      intent: "hr",
      category: "motion",
      catLabel: "MOTION PROTOTYPE · AUDIO",
      title: "VELVET AUDIO 桌面端 Hi-Fi 调音台动效系统",
      subtitle: "为独立音频硬件伴侣软件设计旋钮阻尼、频谱粒子响应与窗口无缝折叠转场动画。",
      role: "动效原型工程师 & 交互视觉",
      timeline: "3 周 · Rive 状态机专项",
      tags: ["After Effects", "Rive State", "Micro-UX"],
      cover: "./assets/covers/case-04.svg",
      palette: ["#090D1A", "#38BDF8", "#F43F5E", "#F59E0B"],
      metrics: [
        { value: "64px", label: "一键折叠迷你控制胶囊高度" },
        { value: "60fps", label: "Rive 状态机拖拽零掉帧" },
        { value: "12 组", label: "三阶贝塞尔与 Spring 动效曲线" }
      ],
      process: [
        { step: "01", title: "硬件手感采样", desc: "测绘真实 Hi-Fi 解码耳放金属阻尼旋钮刻度与惯性回弹。" },
        { step: "02", title: "Rive 状态机搭建", desc: "建立 Hover、Drag、Detent 磁吸卡点与峰谷余晖四态联动。" },
        { step: "03", title: "折叠形态推演", desc: "将全尺寸调音台压缩为一指可达的 64px 桌面悬浮胶囊。" },
        { step: "04", title: "参数工程交付", desc: "交付 AE 工程、可嵌入 .riv 文件与研发精确帧参数文档。" }
      ],
      problem: "桌面音频工具界面普遍像上世纪老式软件，参数调节缺少真实硬件阻尼手感。",
      solution: "参考物理金属旋钮刻度阻尼与 OLED 频谱余晖效果，使用 Rive 制作可鼠标直接拖拽的状态机动效。",
      highlights: [
        "输出精确到帧的三阶贝塞尔曲线与 Spring 物理弹性参数",
        "支持单窗口一键折叠为仅 64px 高度的桌面迷你控制胶囊"
      ],
      deliverables: ["Rive 可交互动效文件", "AE 原生工程与 GIF/MP4", "开发对接参数文档"]
    },
    {
      id: "ui-prism",
      code: "UI-05",
      intent: "hr",
      category: "ui",
      catLabel: "DESIGN TOKENS · MULTI-OS",
      title: "PRISM KIT 跨端校园公益助手设计规范与组件系统",
      subtitle: "服务于校园失物招领、二手书流转与自习室预约的统一多端设计体系与无障碍色彩标准。",
      role: "设计系统架构师 · 无障碍规范",
      timeline: "4 周 · 校内开源共创",
      tags: ["WCAG AA", "Token Architecture", "MiniApp"],
      cover: "./assets/covers/case-05.svg",
      palette: ["#101827", "#2563EB", "#10B981", "#F59E0B"],
      metrics: [
        { value: "AA+", label: "全量核心正文对比度达标" },
        { value: "64 页", label: "图文组件规范与 Token 手册" },
        { value: "-50%", label: "新开发同学上手适配周期" }
      ],
      process: [
        { step: "01", title: "多端界面审计", desc: "盘点 3 届志愿团队失物招领/预约小程序 36 个样式分歧点。" },
        { step: "02", title: "三层 Token 解耦", desc: "制定 Foundations → Semantic → Component 三层 JSON 映射。" },
        { step: "03", title: "WCAG 对比度校准", desc: "全量校准出错警示绿/琥珀/红在浅色与深色底板的 AA 达标率。" },
        { step: "04", title: "Figma+JSON 开源", desc: "发布社区可复用组件包并配合前端同学落地样式变量。" }
      ],
      problem: "多届志愿开发团队各自手写样式，导致按钮圆角、字号层级和报错提示色前后严重割裂。",
      solution: "从零梳理 Foundations → Tokens → Components 三层规范，保证 iOS/小程序/Web 三端视觉高度统一。",
      highlights: [
        "全量校验核心按钮与正文对比度均达 WCAG AA 标准以上",
        "沉淀 64 页图文规范手册，新同学上手开发周期缩短 50%"
      ],
      deliverables: ["Figma Community 开源组件包", "语义化 JSON Token 导出文件", "规范说明书"]
    },
    {
      id: "br-solstice",
      code: "BR-01",
      intent: "client",
      category: "brand",
      catLabel: "BRAND VI · PACKAGING",
      title: "SOLSTICE ROAST 至日精品挂耳咖啡品牌识别与包装全案",
      subtitle: "以太阳光线角度为灵感打造的都市轻奢咖啡视觉系统：包含几何 Logo、烫金礼盒与杯套物料。",
      role: "独立品牌视觉 & 包装 3D 渲染",
      timeline: "3 周 · 商业签约落地",
      tags: ["Brand VI", "Packaging 3D", "Typography"],
      cover: "./assets/covers/case-06.svg",
      palette: ["#1C1917", "#2563EB", "#F59E0B", "#F5F2EB"],
      metrics: [
        { value: "5 款", label: "独立风味挂耳与刀版盒落地" },
        { value: "45°", label: "“至日斜角”超级品牌符号" },
        { value: "4K", label: "Blender 棚拍级商业渲染" }
      ],
      process: [
        { step: "01", title: "货架视觉突围", desc: "对标 15 家独立烘焙门店，找出极简高反差斜角记忆锚点。" },
        { step: "02", title: "几何 Logo 推导", desc: "以 45° 日照入射角构建品牌标志、英文字距与辅助光影图形。" },
        { step: "03", title: "印前工艺打样", desc: "选定温润象牙特种纸，搭配克莱因蓝/琥珀金局部 UV 烫印。" },
        { step: "04", title: "C4D/Blender 出街", desc: "制作 4K 产品三视图直出电商主图，并交付 AI 刀版印前源文件。" }
      ],
      problem: "独立烘焙品牌缺乏一眼记住的货架识别符号，线下快闪店拍摄打卡率偏低。",
      solution: "提炼“至日时刻”45 度斜角几何光影图形，采用温润象牙纸配克莱因蓝/琥珀金局部 UV 工艺。",
      highlights: [
        "完成主标、辅助图形、5 款不同风味挂耳盒与手提袋全套刀版落地",
        "使用 Blender + C4D 渲染棚拍级产品三视图用于线上宣发"
      ],
      deliverables: ["AI 矢量 VI 手册", "印刷刀版线与专色潘通号", "Blender 4K 产品渲染图"]
    },
    {
      id: "br-boundless",
      code: "BR-02",
      intent: "client",
      category: "editorial",
      catLabel: "EXHIBITION · CURATION",
      title: "BOUNDLESS 2027 学院春季联合毕业设计展主视觉与导视",
      subtitle: "担任总视觉主创：包揽动态主海报、展厅折页、亚克力吊牌与纪念票根全套物料设计。",
      role: "总视觉主创 & 美术统筹（6 人组）",
      timeline: "6 周 · 全院展览实体落地",
      tags: ["Key Visual", "Editorial Print", "Wayfinding"],
      cover: "./assets/covers/case-07.svg",
      palette: ["#0C0C10", "#9AA4B0", "#2563EB", "#F59E0B"],
      metrics: [
        { value: "1.2w+", label: "校园主推文主视觉传播阅读" },
        { value: "40+ 张", label: "印前校色大型展板实体落地" },
        { value: "6 人", label: "统筹美术小组跨部门高效协同" }
      ],
      process: [
        { step: "01", title: "展厅动线测绘", desc: "梳理 4 大专业展区人流交叉点，解决往届“找不到展区”痛点。" },
        { step: "02", title: "钢银 3D 主视觉", desc: "制作 Blender 钢银立体字母动态主海报，强化展厅视觉中心。" },
        { step: "03", title: "色彩导视与票根", desc: "用颜色地贴导视 + 可撕纪念票根建立强仪式感观展动线。" },
        { step: "04", title: "印前统筹交付", desc: "制定 CMYK 校色标准，按期验收 40+ 展板与文创吊牌零失误出街。" }
      ],
      problem: "往届校园展览海报信息密度过大、展区指示混乱，观众不易找准各专业展区路线。",
      solution: "用大型钢银立体字母作为空间主锚点，以颜色分区导视地面贴纸 + 可撕式纪念票根串联观展动线。",
      highlights: [
        "主视觉海报在校园公众号获 1.2w+ 阅读，线下文创周边现场售罄",
        "统筹 6 位美术组同学按印前校色标准完成 40+ 张展板输出"
      ],
      deliverables: ["主视觉静态/动态海报全套", "展厅导视系统平面图", "印刷品印前 PDF"]
    },
    {
      id: "br-cityfolk",
      code: "BR-03",
      intent: "client",
      category: "brand",
      catLabel: "CULTURAL MERCH · ILLUSTRATION",
      title: "CITY FOLK 城市漫游指南盲盒文创礼盒与插画视觉",
      subtitle: "为本地独立书店定制的伴手礼套盒：收录扁平几何地标插画、贴纸书、透卡与手账胶带。",
      role: "插画师 & 文创结构设计师",
      timeline: "4 周 · 大广赛省二等奖",
      tags: ["Illustration", "Merchandise", "Risograph"],
      cover: "./assets/covers/case-08.svg",
      palette: ["#1E1B4B", "#EC4899", "#F59E0B", "#2563EB"],
      metrics: [
        { value: "500 套", label: "首批盲盒 3 周售罄并二次加印" },
        { value: "12 处", label: "高辨识街头波普地标矢量插画" },
        { value: "省二等", label: "第16届大广赛省级荣誉认证" }
      ],
      process: [
        { step: "01", title: "青年慢游采风", desc: "走访 12 处街头独立咖啡与天桥地标，提取城市烟火细节。" },
        { step: "02", title: "双色波普绘制", desc: "采用 Risograph 双色叠印颗粒质感重绘全部扁平几何插画。" },
        { step: "03", title: "盲盒组合结构", desc: "将透卡、异形模切贴纸与手账胶带装入轻量化抽屉盲盒。" },
        { step: "04", title: "门店爆款加印", desc: "书店试点 500 套三周售空，作品同获大广赛省级二等奖。" }
      ],
      problem: "传统旅游纪念品同质化严重，年轻游客更偏好轻量、可贴在手账/电脑上的艺术周边。",
      solution: "以现代波普双色叠印插画重绘 12 处街头咖啡馆与老街天桥，做成盲盒透卡 + 异形贴纸组合。",
      highlights: [
        "首批试产 500 套文创盒 3 周售罄并完成二次加印",
        "作品入选第 16 届全国大学生广告艺术大赛省级二等奖"
      ],
      deliverables: ["12 幅矢量地标插画源文件", "贴纸与礼盒印刷源文件", "门店陈列效果图"]
    },
    {
      id: "br-kinetic",
      code: "BR-04",
      intent: "client",
      category: "editorial",
      catLabel: "3D TYPOGRAPHY · POSTER",
      title: "KINETIC TYPE LAB 实验性动态字体海报与三维材质探索",
      subtitle: "连续 21 天三维与平面排版实验计划：融合玻璃折射、液态金属字效与摄影色彩美学。",
      role: "三维艺术指导 & 字体实验",
      timeline: "21 天 · 每日实验沉淀计划",
      tags: ["Blender Cycles", "3D Type", "Art Direction"],
      cover: "./assets/covers/case-09.svg",
      palette: ["#09090B", "#2563EB", "#F59E0B", "#E2E8F0"],
      metrics: [
        { value: "21 张", label: "风格克制统一的 4K 实验海报" },
        { value: "0.5s", label: "信息流高反差视觉抓眼速率" },
        { value: "16 套", label: "可复用 Blender 程序化材质球" }
      ],
      process: [
        { step: "01", title: "吸睛节奏拆解", desc: "测试移动端信息流前 0.5 秒视线落点，确定强反差金属字距。" },
        { step: "02", title: "节点变形系统", desc: "编写 Blender 几何节点字体扭曲模板，兼具可读与先锋感。" },
        { step: "03", title: "双灯折射材质", desc: "调试克莱因蓝+琥珀双缘光玻璃色散材质与电影级景深。" },
        { step: "04", title: "材质库全集沉淀", desc: "输出 21 张 4K 组图与可直接复用的材质工程预设。" }
      ],
      problem: "传统二维海报在短视频和移动端信息流中很难在 0.5 秒内抓住观众目光。",
      solution: "建立 Blender 材质球库与节点驱动字母变形模板，实现高反差、有空间景深的动态字体实验。",
      highlights: [
        "产出 21 张风格统一、配色克制的 4K 实验海报作品集",
        "沉淀一套可直接用于个人主页与活动宣传的视觉材质库"
      ],
      deliverables: ["21 张高清海报组图", "Blender 材质与工程参考", "排版构图复盘文档"]
    }
  ],
  stickyWorkflows: [
    {
      num: "01",
      badge: "BRAND & VISUAL IDENTITY",
      title: "品牌视觉识别、包装刀版与潮流文创全案",
      subtitle: "从品牌情绪板、标志规范到专色印刷落地与 Blender 棚拍级渲染，让作品真实可触达货架。",
      category: "brand",
      bullets: [
        "标志图形演进推导 + 最小留白与字体组合规范",
        "实拍级产品三维包装渲染与线下物料印前校色",
        "兼具传播打卡属性的校园文创与快闪视觉延展"
      ],
      images: [
        { src: "./assets/covers/case-06.svg", label: "SOLSTICE 咖啡 VI" },
        { src: "./assets/covers/case-08.svg", label: "CITY FOLK 文创礼盒" },
        { src: "./assets/covers/case-07.svg", label: "BOUNDLESS 展陈" }
      ]
    },
    {
      num: "02",
      badge: "PRODUCT UI & DESIGN SYSTEM",
      title: "B/C 端产品交互架构、Figma Tokens 与响应式设计",
      subtitle: "拒绝只画好看但无法落地的“飞机稿”，坚持用真实可用性问题与语义化 Token 对接前端研发。",
      category: "ui",
      bullets: [
        "围绕用户旅程痛点精简路径，建立高复用性组件库",
        "遵循 WCAG 对比度与暗黑/浅色双态无障碍适配",
        "交付开发友好的精确标注、切图及状态说明文档"
      ],
      images: [
        { src: "./assets/covers/case-01.svg", label: "PULSE 音频系统" },
        { src: "./assets/covers/case-02.svg", label: "AURA 灵感画布" },
        { src: "./assets/covers/case-05.svg", label: "PRISM 多端规范" }
      ]
    },
    {
      num: "03",
      badge: "MOTION & 3D ART DIRECTION",
      title: "微交互状态机、动态字体海报与视觉调色实验",
      subtitle: "结合 AE / Rive 动效曲线与 Blender 材质光影，为数字产品注入克制而耐看的生命力。",
      category: "motion",
      bullets: [
        "物理级弹性过渡曲线调试与微反馈状态原型验证",
        "独立摄影审美驱动的氛围光影与风格化调色预设",
        "21+ 实验性三维排版与艺术指导视觉海报沉淀"
      ],
      images: [
        { src: "./assets/covers/case-04.svg", label: "VELVET 音频动效" },
        { src: "./assets/covers/case-09.svg", label: "KINETIC 三维字体" },
        { src: "./assets/covers/case-03.svg", label: "ORBIT 数据动效" }
      ]
    },
    {
      num: "04",
      badge: "EXHIBITION & CAMPUS CURATION",
      title: "校园艺术展主视觉策展与跨专业项目统筹落地",
      subtitle: "大三期间独立牵头多场百人/千人级校园设计展与市集，锻炼甲方沟通、排期控场与跨组协作力。",
      category: "editorial",
      bullets: [
        "独立对接摄影、文案与开发团队，把控从草图到出街全节点",
        "累计主导 3 场校园设计周物料落地与公众号破万传播",
        "输出结构化作品集复盘与商业约稿透明排期体系"
      ],
      images: [
        { src: "./assets/covers/case-07.svg", label: "学院毕业设计展" },
        { src: "./assets/covers/case-08.svg", label: "独立书店联名框" },
        { src: "./assets/covers/case-06.svg", label: "线下快闪店导视" }
      ]
    }
  ],
  services: [
    {
      icon: "figma",
      title: "2027 暑期 UI / 交互实习",
      desc: "大三在读，专业课绩点前 5%，具备完整的端到端项目复盘与 Figma 变量规范实战力，可全身心投入 4-6 个月实习。",
      items: ["App / Web 产品重构", "Design Token 体系维护", "用研访谈与可用性走查"]
    },
    {
      icon: "palette",
      title: "品牌 VI 与精品包装定制",
      desc: "适合新消费茶饮、精品咖啡、文创书店与高校社团活动：交付可商用矢量源文件与印刷刀版规范。",
      items: ["Logo 与辅助图形识别", "礼盒/贴纸/透卡文创全案", "Blender 3D 产品渲染图"]
    },
    {
      icon: "spark",
      title: "商业海报与活动主视觉",
      desc: "针对展览、音乐节、市集及线上专题页打造高辨识度主视觉与多尺寸延展物料，拒绝套模板廉价感。",
      items: ["动态主海报与长图", "展厅导视与纪念票根", "社媒传播九宫格全套"]
    },
    {
      icon: "motion",
      title: "动效原型与三维渲染包装",
      desc: "用 Rive / AE 与 Blender 为产品官网或路演 Demo 加持丝滑交互演示，让你的汇报或 Pitch 脱颖而出。",
      items: ["Rive 交互状态机动画", "三维字体/产品短片", "官网 Hero 视觉动效指导"]
    },
    {
      icon: "camera",
      title: "视觉调色与氛围感人像后期",
      desc: "结合胶片色彩理论与棚拍布光审美，提供活动纪实修图、品牌产品精修与专属风格化 LUT 调色。",
      items: ["电影感色调 LUT 定制", "商业静物与咖啡饮品精修", "Lightroom/PS 无损分图层"]
    },
    {
      icon: "compass",
      title: "设计竞赛辅导与作品集共创",
      desc: "面向低年级同学分享大广赛、计算机设计大赛及跨学科组队经验，梳理排版节奏与答辩陈述逻辑。",
      items: ["作品集版式重构建议", "比赛痛点破题与提案", "设计简历视觉精修"]
    }
  ],
  experiences: [
    {
      code: "EXP-01",
      tag: "实习经历 / 互联网",
      title: "某新锐数字内容平台 · 暑期体验设计实训生",
      period: "2026.07 — 2026.09",
      detail: "参与创作工具端资产库改版与 16 枚高复用图标重绘；主导“灵感色板提取”交互流程优化，输出规范文档并配合前端完成 Pixel-level 视觉走查。",
      chips: ["Figma", "Design System", "视觉走查", "效率提升 32%"]
    },
    {
      code: "EXP-02",
      tag: "策展主创 / 校园",
      title: "学院视觉与媒体设计周 · 总视觉主创 & 美术组负责人",
      period: "2026.03 — 2026.06",
      detail: "统筹 6 人视觉小组完成主题定位、三维金属主视觉海报、场馆导视地贴、电子导览 H5 及 500 份文创票根落地，活动主推文阅读量突破 12,000+。",
      chips: ["主视觉策划", "Blender", "印前校色", "6人团队协作"]
    },
    {
      code: "EXP-03",
      tag: "竞赛奖项 / 国家级",
      title: "第 16 届全国大学生广告艺术大赛 · 省级二等奖（独立创作）",
      period: "2026.05",
      detail: "围绕城市青年慢生活洞察创作《CITY FOLK 城市漫游盲盒》，包揽前期田野调研、双色波普插画绘制及全套文创礼盒结构排版落地。",
      chips: ["大广赛获奖", "波普插画", "包装落地"]
    },
    {
      code: "EXP-04",
      tag: "商业接单 / 独立",
      title: "SOLSTICE 精品咖啡等 8 个品牌视觉与新消费约稿项目",
      period: "2025.09 — 至今",
      detail: "大二下至今独立承接本地独立咖啡、书店及科技社团品牌识别与物料设计累计 14+ 单，坚持「2 轮结构化反馈机制」，客户复购率超 60%。",
      chips: ["Brand VI", "独立接单", "按期 100% 交付"]
    },
    {
      code: "EXP-05",
      tag: "学业荣誉 / 校级",
      title: "连续两学年校级一等奖学金 · 专业排名 Top 5%（3.91 / 4.0）",
      period: "2024.09 — 至今",
      detail: "核心课程《品牌视觉识别》《交互原型与动效》《摄影与色彩设计》《三维造型基础》均获 94+ 满绩评价，多份课程作业入选学院优秀作品年鉴。",
      chips: ["GPA 3.91/4.0", "一等奖学金", "优秀作品留档"]
    },
    {
      code: "EXP-06",
      tag: "跨界共创 / 社团",
      title: "高校极客与设计共创工坊 · 设计合伙人",
      period: "2025.10 — 至今",
      detail: "与计算机学院开发同学长期组队参加黑客松与创业大赛，负责全部产品界面、演示短片与路演 Deck 视觉包装，多次助力团队拿下最佳创意奖。",
      chips: ["跨学科协作", "黑客松设计", "Pitch Deck"]
    }
  ],
  toolStack: [
    "FIGMA",
    "BLENDER",
    "AFTER EFFECTS",
    "RIVE",
    "ILLUSTRATOR",
    "PHOTOSHOP",
    "LIGHTROOM",
    "CINEMA 4D",
    "HTML / CSS MOTION",
    "SPLINE 3D",
    "INDESIGN",
    "MIDJOURNEY WORKFLOW"
  ],
  radar: {
    indicators: [
      { name: "UI与组件系统", max: 100 },
      { name: "品牌识别与排版", max: 100 },
      { name: "动效与交互原型", max: 100 },
      { name: "Blender三维视觉", max: 100 },
      { name: "摄影与调色美学", max: 100 },
      { name: "用研与团队落地", max: 100 }
    ],
    values: [94, 92, 89, 86, 91, 93]
  },
  donutData: [
    { name: "产品 UI 与规范系统", value: 14 },
    { name: "品牌识别与包装文创", value: 11 },
    { name: "动态海报与三维实验", value: 10 },
    { name: "策展导视与商业摄影", value: 7 }
  ]
};
