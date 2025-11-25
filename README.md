# BTC 期权策略展示网站

一个面向学习者的期权策略展示网站。通过交互式盈亏图表与结构化的策略详解，帮助你系统理解 BTC 期权的构造、风险、收益与适用场景。本项目为纯前端静态站点，专注教学与可视化演示，不提供交易功能。

- 在线访问：https://option.riba2534.cn
- 教育用途：仅用于学习和演示，不构成任何投资建议

## 特性概览

- 交互式盈亏图表
  - 基于 Recharts 绘制盈亏曲线，覆盖 ±40% 的价格范围
  - 显示当前参考价、盈亏平衡点与不同情景的盈亏
- 策略目录与名称规范
  - 侧边栏按分类展示策略列表，中文在上、英文在下（两行）
  - 统一使用“中文名 (English Name)”的半角括号格式
- 友好交互与可读性
  - 点击侧边栏策略，详情页自动滚动至顶部
  - 每个策略的详解采用统一的“七章节”HTML模板，结构清晰、内容完整
- 模块化数据结构
  - 每个策略独立成文件，按分类聚合，维护与扩展便捷
  - `constants.ts` 统一导出 `STRATEGIES` 与 `DEFAULT_BTC_PRICE`

## 快速开始

### 环境需求
- Node.js 20+
- npm

### 本地开发
```bash
npm install
npm run dev   # http://localhost:3000
```

### 构建与预览
```bash
npm run build
npm run preview
```

## 项目结构

```
btc_options/
├── components/
│   ├── PnLChart.tsx           # 盈亏图表
│   └── StrategyDetail.tsx     # 策略详情与构造展示
├── src/
│   └── strategies/            # 策略模块（按分类拆分）
│       ├── basics/
│       ├── bullish/
│       ├── bearish/
│       ├── neutral/
│       ├── volatility/
│       ├── income/
│       └── index.ts           # 汇总为 ALL_STRATEGIES
├── constants.ts               # 对外导出 STRATEGIES 与 DEFAULT_BTC_PRICE
├── types.ts                   # 类型定义：Strategy/OptionLeg/Category
├── App.tsx                    # 主应用（布局与侧边栏）
├── index.tsx                  # 入口
├── index.html                 # HTML 模板（Tailwind 通过 CDN）
└── vite.config.ts             # Vite 配置
```

## 支持的策略（示例）

- 看涨（Bullish）
  - 买入看涨期权 (Long Call)
  - 牛市看涨价差 (Bull Call Spread)
  - 牛市看跌价差 (Bull Put Spread)
  - 合成多头 (Synthetic Long)
  - 看涨比例反向价差 (Call Ratio Backspread)
  - 多头条式组合 (Strap)
  - 现金担保卖出看跌期权 (Cash-Secured Put)
  - 看涨对角价差 (Long Diagonal Call)
- 看跌（Bearish）
  - 买入看跌期权 (Long Put)
  - 熊市看跌价差 (Bear Put Spread)
  - 熊市看涨价差 (Bear Call Spread)
  - 看跌比例反向价差 (Put Ratio Backspread)
  - 空头条式组合 (Strip)
  - 裸卖看涨 (Naked Call)
  - 看跌对角价差 (Long Diagonal Put)
  - 合成空头 (Synthetic Short)
- 中性（Neutral）
  - 卖出跨式 (Short Straddle)
  - 卖出宽跨式 (Short Strangle)
  - 铁鹰式 (Iron Condor)
  - 铁蝶式 (Iron Butterfly)
  - 买入看涨蝶式 (Long Call Butterfly)
  - 卖出内陷宽跨式 (Short Guts)
  - 看涨时间价差 (Call Calendar Spread)
  - 看跌时间价差 (Put Calendar Spread)
  - 买入看涨康多 (Long Call Condor)
  - 断翼看涨蝶式 (Broken-Wing Butterfly – Call)
  - 买入看跌蝶式 (Long Put Butterfly)
  - 盒式组合 (Box Spread)
- 波动率（Volatility）
  - 买入跨式 (Long Straddle)
  - 买入宽跨式 (Long Strangle)
  - 买入内陷宽跨式 (Long Guts)
- 收益/对冲（Income/Hedge）
  - 备兑看涨 (Covered Call)
  - 保护性看跌 (Protective Put)
  - 领口策略 (Collar)
  - 翡翠蜥蜴 (Jade Lizard)
  - 海鸥组合 (Seagull)
  - 轮子策略 (Wheel)
  - 备兑宽跨式 (Covered Strangle)

> 注：以上为示例清单，实际站点可能持续扩充。

## 策略详解内容规范（七章节模板）

每个策略的 `detailedAnalysis.explanation` 使用统一 HTML 结构，包含：

1. 策略核心思想（按类别配色）
2. 策略构造（两列卡片 + 净成本/净收入小结）
3. 损益分析（三卡片：最大收益/最大亏损/盈亏平衡点或关键因素）
4. 实战案例（最佳/中等/最差三场景，必须给出具体数值计算）
5. 使用场景（✓/✗ 各 2–4 条，指向明确）
6. 风险提示（至少包含 Theta/Gamma/Vega/Delta 的影响）
7. 专业建议（行权价间距、到期时间、滚动/止盈建议等，具体可操作）

同时在 `pros`/`cons` 中分别列出 2–4 条优势与劣势，使用完整句表达。

## 名称与展示约定

- 统一名称格式：`中文名 (English Name)`，使用半角括号 `()`。
- 侧边栏展示：中文在上、英文在下（两行），便于学习与对照。
- 切换策略时，详情页自动滚动至顶部，保证阅读连贯性。

## 新增策略流程

1. 在对应分类目录新增文件：`src/strategies/<category>/<id>.ts`
2. 定义并导出 `Strategy` 对象（保持字段完整与类型正确）
3. 在该分类的 `index.ts` 中 `import` 新策略并追加到导出数组
4. 保持 `id` 唯一采用 kebab-case；`name` 采用“中文名 (English Name)”格式
5. 编写 `explanation` 的七章节 HTML；提供具体数值案例与希腊字母说明
6. 本地预览并抽查多个策略，确认图表、文案与样式正常

## 技术栈

- React 19 + TypeScript + Vite 6
- Recharts（图表）
- Tailwind CSS（通过 CDN 引入）

## 部署

- 使用 GitHub Actions 自动部署到 GitHub Pages
- 推送到 `main` 分支自动触发构建与发布
- 可在仓库 Settings > Pages 配置自定义域名（已使用 `option.riba2534.cn`）

## 免责声明

- 本项目仅用于教学和信息展示目的
- 盈亏计算结果仅供参考，不构成任何投资建议
- 加密资产与期权交易具有高风险，请谨慎决策

## 许可证

MIT License

## 参与贡献

欢迎通过 GitHub Issues 与 Pull Requests 提交建议与改进。
