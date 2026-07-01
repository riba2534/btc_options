<div align="center">

<img src="public/favicon.svg" alt="Option Strategy Logo" width="96" height="96" />

# BTC 期权策略图解 · Option Strategy

*如果说衍生品是金融产品中的皇冠，那么期权就是这顶皇冠上的明珠*

**交互式可视化学习 BTC 期权策略 —— 从「什么是期权」到 40+ 进阶组合，小白也能看懂。**

[![Deploy](https://github.com/riba2534/btc_options/actions/workflows/deploy.yml/badge.svg)](https://github.com/riba2534/btc_options/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-许可证)

**[🌐 在线访问 → option.red](https://option.red)**

</div>

---

一个面向学习者的 BTC 期权策略**交互式教学网站**。每个策略都配有可交互的到期盈亏曲线、情景推演表与结构化详解，并辅以「一句话大白话、生活类比、新手误区、加密实盘提醒」等小白友好内容，帮助你由浅入深地理解期权的**构造、风险、收益与适用场景**。

> 纯前端静态站点，所有盈亏在浏览器端实时计算，**无后端、不涉及任何真实交易**。仅用于教育与可视化演示。

## 目录

- [功能特性](#-功能特性)
- [内容覆盖](#-内容覆盖)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [数据模型](#-数据模型)
- [新增与维护策略](#-新增与维护策略)
- [部署](#-部署)
- [免责声明](#-免责声明)
- [参与贡献](#-参与贡献)
- [许可证](#-许可证)

## ✨ 功能特性

- **📈 交互式盈亏图**：基于 Recharts 绘制到期盈亏曲线（±40% 价格区间），自动标注盈亏平衡点、最大盈利/亏损与「收益无限 / 风险无限」方向；悬停查看任意价格的盈亏。
- **🧮 纯前端实时计算**：根据每个策略的「期权腿（legs）」在浏览器端推算盈亏曲线与情景表，数据与图表始终自洽。
- **💬 小白友好分层讲解**：每个策略提供
  - 「一句话大白话」「用生活类比理解」「✅/🚫 什么时候用 / 别用」；
  - 「🚫 新手常见误区」「⚙️ 加密期权 & 实盘提醒」；
  - 「希腊字母暴露表」（Delta / Gamma / Theta / Vega 一眼看清方向）。
- **📚 完整教学体系**：内置「期权基础、新手学习路径（含策略选择决策树）、术语速查、进阶概念（平价公式 / Skew / 欧式现金交割）」四个教学条目。
- **📐 统一七章节详解**：每个策略的详解遵循一致的 HTML 模板（核心思想 / 构造 / 损益 / 实战案例 / 使用场景 / 风险提示 / 专业建议），含具体数值与希腊字母说明。
- **📱 响应式 & 无障碍**：移动端抽屉式侧栏、键盘可达（focus 环 / 跳转链接 / `aria-*`）、`prefers-reduced-motion` 适配。

## 📚 内容覆盖

共 **46 项**内容（4 项基础/教学 + 42 个策略），按方向与波动率观点分类：

| 分类 | 数量 | 示例 |
| --- | :---: | --- |
| **期权基础 / 教学** | 4 | 期权基础、新手学习路径、术语速查、进阶概念 |
| **看涨 Bullish** | 10 | 买入看涨、牛市看涨价差、风险逆转、合成多头、看涨比例（反向/正向）价差、现金担保看跌… |
| **看跌 Bearish** | 9 | 买入看跌、熊市看跌价差、看跌比例（反向/正向）价差、裸卖看涨、合成空头、空头条式… |
| **盘整 / 中性 Neutral** | 12 | 铁鹰式、铁蝶式、看涨/看跌蝶式、断翼蝶式、看涨/看跌时间价差、卖出跨式/宽跨式、盒式组合… |
| **高波动 Volatility** | 4 | 买入跨式、买入宽跨式、买入内陷宽跨式、反向铁鹰 |
| **收益 / 对冲 Income** | 7 | 备兑看涨、保护性看跌、领口、翡翠蜥蜴、海鸥、轮子、备兑宽跨式 |

> 策略命名统一采用 `中文名 (English Name)` 半角括号格式，英文取行业通用名。

## 🛠 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | React 19 + TypeScript 5.8 |
| 构建 | Vite 6 |
| 图表 | Recharts 3 |
| 样式 | Tailwind CSS 3（本地 PostCSS 构建，含 content 扫描与 safelist） |
| 字体 | Inter（拉丁）+ JetBrains Mono（等宽数字） |
| 部署 | GitHub Actions → Cloudflare Pages |

## 🚀 快速开始

### 环境要求

- Node.js **20+**
- npm

### 安装与开发

```bash
# 1. 克隆仓库
git clone https://github.com/riba2534/btc_options.git
cd btc_options

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（HMR 热更新） |
| `npm run build` | 类型检查 + 生产构建，产物输出到 `dist/` |
| `npm run preview` | 本地预览生产构建产物 |
| `npm run typecheck` | 仅运行 TypeScript 类型检查 |
| `npm run lint` | 运行 ESLint 检查 |

## 📁 项目结构

```
btc_options/
├── App.tsx                     # 主应用（布局、侧边栏导航、响应式逻辑）
├── index.tsx                   # 应用入口
├── index.html                  # HTML 模板（加载 Inter / JetBrains Mono 字体）
├── index.css                   # 全局样式 + Tailwind 指令入口
├── constants.ts                # 对外导出 STRATEGIES 与 DEFAULT_BTC_PRICE
├── types.ts                    # 类型定义：Strategy / OptionLeg / GreekExposure …
├── components/
│   ├── PnLChart.tsx            # 到期盈亏曲线图（Recharts）
│   └── StrategyDetail.tsx      # 策略详情：图表 + 构造 + 情景表 + 详解渲染
├── src/strategies/             # 策略数据（按分类拆分，每个策略独立成文件）
│   ├── basics/                 # 期权基础与教学条目
│   ├── bullish/                # 看涨
│   ├── bearish/                # 看跌
│   ├── neutral/                # 中性
│   ├── volatility/             # 高波动
│   ├── income/                 # 收益 / 对冲
│   └── index.ts                # 聚合为 ALL_STRATEGIES
├── tailwind.config.js          # Tailwind 配置（content / safelist / 字体）
├── postcss.config.js           # PostCSS（tailwindcss + autoprefixer）
└── vite.config.ts              # Vite 配置（端口 / 别名 @ / 分包）
```

## 🧩 数据模型

每个策略都是一个 `Strategy` 对象（见 `types.ts`）。前端根据 `legs` 在浏览器端计算盈亏曲线与情景表，因此**图表与数据天然一致**。

```ts
interface OptionLeg {
  type: 'Call' | 'Put';
  action: 'Buy' | 'Sell';
  strikeOffset: number;   // 行权价相对现价的倍数，如 1.10 = 高出现价 10%
  premiumRatio: number;   // 权利金占现价的比例，如 0.03 = 3%
  expiryLabel?: string;   // 可选：'近月' / '远月'（日历 / 对角价差）
}

interface Strategy {
  id: string;             // kebab-case 唯一 ID，如 'bull-call-spread'
  name: string;           // '中文名 (English Name)' 半角括号
  category: StrategyCategory;
  description: string;    // 一句话概述
  setup: string;          // 构造方法
  legs: OptionLeg[];      // 期权腿（可为空数组，如流程型 / 纯教学条目）
  riskProfile: string;    // 风险收益特征
  idealScenario: string;  // 理想使用场景
  detailedAnalysis: {
    explanation: string;  // 七章节 HTML 详解
    pros: string[];       // 优势 2–4 条
    cons: string[];       // 劣势 2–4 条
  };

  // —— 可选的小白友好 / 进阶字段（组件层按需渲染，缺省则不显示）——
  plainSummary?: string;                                       // 一句话大白话（零术语）
  analogy?: { emoji: string; title: string; text: string };   // 生活类比
  pitfalls?: string[];                                        // 新手常见误区
  quickJudge?: { use: string; avoid: string };                // 极简判断
  greeks?: { delta: string; gamma: string; theta: string; vega: string }; // 希腊字母暴露
  cryptoNote?: string;                                        // 加密期权 / 实盘提醒
}
```

## ➕ 新增与维护策略

1. 在对应分类目录新建文件：`src/strategies/<category>/<id>.ts`，导出一个 `Strategy` 对象。
2. 在该分类的 `index.ts` 中 `import` 并追加到导出数组（`constants.ts` 与顶层 `index.ts` 会自动聚合，无需改动）。
3. 保持 `id` 唯一且为 kebab-case；`name` 使用 `中文名 (English Name)` 半角括号格式。
4. `legs` 的 `strikeOffset` 与 `premiumRatio` 取合理值，并**确保 `explanation` 中的数值案例与 `legs` 推算出的盈亏曲线自洽**。
5. `detailedAnalysis.explanation` 遵循统一**七章节** HTML 模板：
   1. 策略核心思想 · 2. 策略构造 · 3. 损益分析 · 4. 实战案例（含具体计算）·
   5. 使用场景（✓/✗）· 6. 风险提示（含希腊字母）· 7. 专业建议
6. 可选填充 `plainSummary / analogy / pitfalls / quickJudge / greeks / cryptoNote` 提升小白友好度。
7. 本地预览，抽查桌面与移动端的图表、文案与样式。

> 更详细的写作规范与配色模板见仓库内 `CLAUDE.md`。

## 🌐 部署

- 托管于 **Cloudflare Pages**，主域名 **[option.red](https://option.red)**。
- 推送到 `main` 分支即触发 GitHub Actions 自动部署：`npm ci → npm run build → wrangler 部署到 Cloudflare Pages`（工作流见 `.github/workflows/deploy.yml`）。
- 旧域名 `option.riba2534.cn` 已 **301 重定向**至 `option.red`。

## ⚠️ 免责声明

- 本项目**仅用于教育与信息展示**，不构成任何投资、财务或交易建议。
- 站内盈亏曲线为**简化的到期模型**（USD 线性近似，未计入手续费、滑点、保证金、IV 变化等），与真实交易结果存在差异，仅供理解策略形态之用。
- 加密资产与期权交易具有**高风险**，可能导致本金全部损失。请在充分了解风险并独立判断后谨慎决策。

## 🤝 参与贡献

欢迎通过 [Issues](https://github.com/riba2534/btc_options/issues) 反馈问题，或提交 [Pull Request](https://github.com/riba2534/btc_options/pulls) 贡献新策略与改进。提交前请确保 `npm run typecheck`、`npm run lint`、`npm run build` 均通过。

## 📄 许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。
