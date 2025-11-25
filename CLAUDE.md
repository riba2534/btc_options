# AI 维护指南（最新完善版）

这是一份面向后续 AI 助手的维护指南，基于当前项目最新状态进行了补充完善。它说明：项目结构、策略新增流程、名称规范、UI 行为约定、内容风格模板，以及验证与排错清单。

## 最新更新概览（2025-11-25）

- 策略模块化重构完成：`src/strategies/**` 分类目录下新增多策略，统一由 `constants.ts` 聚合导出。
- 新增策略类型（示例）：
  - 时间价差：`Call/Put Calendar`
  - 对角价差：`Long Diagonal Call/Put`
  - 合成空头：`Synthetic Short`
  - 高波动：`Long Guts`
  - 借记康多：`Long Call Condor`
  - 断翼蝶式（看涨）：`Broken-Wing Butterfly – Call`
  - 收益/对冲：`Jade Lizard`、`Seagull`、`Wheel`、`Covered Strangle`
  - 中性精确：`Long Put Butterfly`、`Box Spread`
- 名称规范统一：采用“中文名 (English Name)”半角括号格式；英文使用行业通用名称。
- 侧边栏目录显示更新：中文在上、英文在下两行展示；点击策略时详情页自动滚到顶部。

## 项目速览

- 类型：纯前端静态网站（教学展示 BTC 期权策略）
- 技术栈：React + TypeScript + Vite + Recharts（图表）+ Tailwind（CDN）
- 计算：所有盈亏计算在浏览器端进行（无后端）
- 入口：`index.tsx`，主组件：`App.tsx`
- 数据：策略数据模块化存放于 `src/strategies/**`
- 对外导出：`constants.ts` 统一暴露 `DEFAULT_BTC_PRICE` 与 `STRATEGIES`

## 快速开发

```bash
npm install
npm run dev    # 本地开发（http://localhost:3000）
npm run build  # 生产构建（输出到 dist/）
npm run preview
```

## 文件结构（重点关注）

- `types.ts` 类型定义：
  - `StrategyCategory`（分类枚举）
  - `OptionLeg`（期权腿：`type`、`action`、`strikeOffset`、`premiumRatio`）
  - `Strategy`（策略数据结构）
- `src/strategies/**` 分类与策略文件：
  - `src/strategies/<category>/<id>.ts` 单策略文件，导出 `Strategy`
  - `src/strategies/<category>/index.ts` 分类聚合（`Strategy[]`）
  - `src/strategies/index.ts` 全量聚合为 `ALL_STRATEGIES`
- `constants.ts` 对外暴露：
  - `DEFAULT_BTC_PRICE = 100000`
  - `STRATEGIES: Strategy[] = ALL_STRATEGIES`
- `components/StrategyDetail.tsx` 展示策略详情并计算盈亏曲线（图表数据）
- `components/PnLChart.tsx` 渲染盈亏图（Recharts）

## 策略数据模型（必须遵守）

```ts
export interface OptionLeg {
  type: 'Call' | 'Put';
  action: 'Buy' | 'Sell';
  strikeOffset: number;  // 行权价相对现价的倍数，例如 1.10 表示高出现价 10%
  premiumRatio: number;  // 权利金相对现价的比例，例如 0.03 表示 3%
}

export interface Strategy {
  id: string;             // kebab-case 唯一 ID，例如 'bull-call-spread'
  name: string;           // 中文名 (English Name) —— 半角括号
  category: StrategyCategory;
  description: string;    // 简短一句话概述
  setup: string;          // 构造方法一句话
  riskProfile: string;    // 风险收益特征（例如：风险有限、收益无限）
  idealScenario: string;  // 理想使用场景
  legs: OptionLeg[];      // 期权腿（可空数组，如 Wheel 流程型策略）
  detailedAnalysis: {
    explanation: string;  // HTML（遵循下方风格模板）
    pros: string[];       // 优势（2–4条，完整句）
    cons: string[];       // 劣势（2–4条，完整句）
  };
}
```

## 名称规范（必须统一）

- 格式：`中文名 (English Name)`，使用半角括号 `()`。
- 英文名：采用行业通用称谓（如 Long Call、Bull Put Spread、Iron Condor、Long Straddle）。
- 变体说明：
  - 合成类：`Synthetic Long / Synthetic Short`
  - 对角价差：`Long Diagonal Call / Long Diagonal Put`
  - 时间价差：`Call Calendar Spread / Put Calendar Spread`
  - 断翼蝶式：`Broken-Wing Butterfly – Call`（保持 “– Call/Put” 区分）
- 目录显示：侧边栏中文在上、英文在下两行展示；不含括号文字（由程序解析括号内英文）。

## 新增/修改策略的步骤

1) 在对应分类目录新增文件：`src/strategies/<category>/<id>.ts`，输出 `const <camelCase>: Strategy = {...}; export default <camelCase>;`
2) 在该分类的 `index.ts` 中 `import` 并追加到导出数组（`Strategy[]`）。
3) 不需要修改 `constants.ts` 或 `src/strategies/index.ts`（它们已聚合分类导出）。
4) 保持 `id` 唯一且使用 kebab-case；`name` 使用“中文名 (English Name)”半角括号格式。
5) `legs` 的 `strikeOffset` 与 `premiumRatio` 用合理示例值（参考同类策略取值范围）。
6) `detailedAnalysis.explanation` 必须按统一 HTML 模板（见下文），并包含具体数值案例与希腊字母风险说明。
7) 本地预览多个策略页面，检查展示一致、图表和文案正确。

## 统一的 HTML 风格模板（复制即可用）

为保证可读性与一致性，`explanation` 必须包含七个章节。不同类别使用对应配色：看涨（绿色系）、看跌（红色系）、中性（蓝/青）、波动率（紫/靛）、收益/对冲（靛/紫）。

```html
<!-- 1. 策略核心思想（按类别用对应配色） -->
<div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
  <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
  <p class="text-emerald-800 text-sm">用 30–60 字说明策略本质、机制与适用者。</p>
</div>

<!-- 2. 策略构造（两列卡片 + 净成本/净收入小结） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
<div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
  <div class="grid md:grid-cols-2 gap-4">
    <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
      <p class="font-bold text-emerald-700 mb-2">📈 买入 ATM Call</p>
      <p class="text-sm text-slate-700">例：买 $100k Call，付 $5k</p>
    </div>
    <div class="bg-rose-50 p-4 rounded border border-rose-200">
      <p class="font-bold text-rose-700 mb-2">📉 卖出 OTM Put</p>
      <p class="text-sm text-slate-700">例：卖 $95k Put，收 $3k</p>
    </div>
  </div>
  <div class="bg-slate-50 p-4 rounded mt-3">
    <p class="text-sm text-slate-700 mb-2"><strong>净成本/净收入</strong>：给出明确数字（如 $1k、$5k）。</p>
  </div>
</div>

<!-- 3. 损益分析（三卡片：最大收益/最大亏损/盈亏平衡或关键因素） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
<div class="grid md:grid-cols-3 gap-4 mb-6">
  <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
    <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
    <div class="text-2xl font-bold text-emerald-700 mb-2">【数值/公式/∞】</div>
    <p class="text-xs text-slate-600">说明一句。</p>
  </div>
  <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
    <div class="text-2xl font-bold text-red-700 mb-2">【数值/公式/∞】</div>
    <p class="text-xs text-slate-600">说明一句。</p>
  </div>
  <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
    <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点/关键因素</div>
    <div class="text-lg font-bold text-blue-700 mb-2">【公式/因素（Theta/Vega/Gamma/Delta）】</div>
    <p class="text-xs text-slate-600">说明一句。</p>
  </div>
</div>

<!-- 4. 实战案例（三场景：最佳/中等/最差；必须有具体数值） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
  <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，【简述场景】</p>
  <div class="bg-white/70 rounded p-4 mb-3">
    <p class="text-sm text-slate-700 mb-2"><strong>建仓：</strong>列出操作与净成本/收入。</p>
  </div>
  <div class="space-y-2">
    <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
      <p class="text-sm font-bold text-green-800">✅ 【最佳】：例如 涨到 $120k / 跌到 $80k</p>
      <p class="text-xs text-green-700 mt-1">给出完整计算过程与具体结果。</p>
    </div>
    <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
      <p class="text-sm font-bold text-yellow-800">⚠️ 【中等】</p>
      <p class="text-xs text-yellow-700 mt-1">简述盈利/亏损与原因。</p>
    </div>
    <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
      <p class="text-sm font-bold text-red-800">❌ 【最差】</p>
      <p class="text-xs text-red-700 mt-1">简述具体亏损与风险来源。</p>
    </div>
  </div>
</div>

<!-- 5. 使用场景（✓/✗ 各 2–4 条） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
<div class="space-y-3 mb-6">
  <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
    <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
    <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
      <li>给出具体、可操作的环境与条件（例如“预计温和上涨 5–10%”）。</li>
    </ul>
  </div>
  <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
    <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
      <li>指出不利环境与风险原因（避免笼统描述）。</li>
    </ul>
  </div>
</div>

<!-- 6. 风险提示（至少 2 项，必须涉及希腊字母） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
<div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
  <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
    <li><strong>Theta/Gamma/Vega/Delta</strong>：解释其影响与场景。</li>
    <li><strong>执行成本</strong>：点差、滑点与费用可能影响收益。</li>
  </ul>
</div>

<!-- 7. 专业建议（3–6 条） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
  <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
    <li><strong>行权价间距</strong>：按 8–12% 设定更稳妥。</li>
    <li><strong>到期时间</strong>：如 14–30 天、30–60 天，根据策略选择。</li>
    <li><strong>滚动与止盈</strong>：明确条件与节奏，避免尾部风险。</li>
  </ul>
</div>
```

## 取值参考（常用区间）

- `strikeOffset`：0.80–1.20（±20%）
- `premiumRatio`：0.01–0.10（1%–10%）
- ATM：`1.00`；OTM Call：`1.05/1.10`；ITM Call：`0.95/0.90`；OTM Put：`0.95/0.90`；ITM Put：`1.05/1.10`

## UI 行为与显示约定

- 侧边栏策略名称：中文显示在上方，英文显示在下方小字（括号内英文），两行展示。
- 名称解析：要求 `name` 使用半角括号 `()` 包含英文；程序会提取括号内英文用于下行显示。
- 切换策略滚动：点击侧边栏策略后，详情页自动滚动至顶部（平滑滚动）。
- 特殊基础页：`Option Basics` 使用迷你图表展示四种基础期权形态。
- 现货叠加：`Covered Call`、`Protective Put`、`Collar` 会额外叠加现货盈亏计算。

## 常见维护动作

- 新增策略：创建文件 → 更新分类索引 → 预览验证 → 检查图表与文案 → 提交。
- 修改策略：只改对应文件；避免改 `id`（路由与引用会失效）。
- 校验风格：确保七章节齐全、数值具体、希腊字母有说明、配色正确。
- 预览验证：本地跑起来，抽查多策略页面，查看样式与图表是否一致。

## 验证清单（完成前自检）

- 结构完整：七章节 + pros/cons；HTML 标签闭合。
- 数值充分：至少 1 个净成本/收入数值 + 3 个场景的具体数值。
- 风险透明：包含 Theta/Gamma/Vega/Delta 的影响。
- 样式正确：Tailwind 类名使用英文（如 `bg-white`、`from-red-50`），无拼写错误。
- 名称规范：统一半角括号格式，英文通用名称。
- 体验良好：预览无报错、图表与说明一致、移动端显示正常。

## 失败恢复与排错

- 图表不更新：检查 `legs` 数据、`strikeOffset/premiumRatio` 合理性；强刷缓存。
- 样式异常：检查 Tailwind 类名是否英文、是否有拼写错误。
- 运行失败：确保 Node 版本兼容、依赖安装完整；重新 `npm install`。

---

目标：让后续 AI 可以“快速理解、快速写、快速验证”。遵守数据结构、名称规范与风格模板，即可高效完成新增或维护工作。
