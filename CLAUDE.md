# CLAUDE.md - AI 协作指南

> 本文档为 AI 助手（如 Claude、GitHub Copilot等）在协作开发本项目时提供详细的技术规范和内容标准。

## 目录

- [项目概述](#项目概述)
- [常用命令](#常用命令)
- [项目架构](#项目架构)
- [代码规范](#代码规范)
- [策略内容撰写规范](#策略内容撰写规范)
- [HTML 格式化指南](#html-格式化指南)
- [数据结构规范](#数据结构规范)
- [样式与设计规范](#样式与设计规范)
- [部署信息](#部署信息)
- [最佳实践](#最佳实践)
- [注意事项](#注意事项)

---

## 项目概述

这是一个**BTC期权策略展示网站**，使用 React + TypeScript + Vite 构建。网站主要用于展示和教学各种BTC期权交易策略，包含交互式盈亏图表和策略详解。

**重要提示：这是一个纯前端展示网站，仅用于策略可视化展示和教育目的。**

### 核心特性

- 📊 **交互式盈亏图表**：实时计算和展示不同 BTC 价格下的盈亏情况
- 📚 **20+ 种策略详解**：涵盖看涨、看跌、中性、波动率等多种策略
- 🎨 **响应式设计**：支持桌面端和移动端
- 🔍 **详细的策略分析**：包含构造方法、风险收益、使用场景等

---

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 3000）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 项目架构

### 技术栈

- **React 19.2.0** - UI 框架
- **TypeScript** - 类型安全
- **Vite 6.2.0** - 构建工具
- **Recharts 3.5.0** - 图表库
- **Tailwind CSS** - 样式框架（CDN 引入）

### 目录结构

```
btc_options/
├── components/              # React 组件目录
│   ├── PnLChart.tsx        # 盈亏图表组件（基于 Recharts）
│   └── StrategyDetail.tsx  # 策略详情展示组件
├── constants.ts            # 策略数据常量（核心数据文件）
├── types.ts               # TypeScript 类型定义
├── App.tsx                # 主应用组件（路由和布局）
├── index.tsx              # React 入口文件
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置文件
└── CLAUDE.md             # 本文档
```

### 核心组件说明

#### 1. `App.tsx` - 主应用组件

- 负责整体布局（侧边栏 + 主内容区）
- 管理策略选择状态
- 处理响应式侧边栏显示/隐藏
- 按策略类别分组显示策略列表

**关键特性**：
- 使用 `useState` 管理选中的策略 ID
- 使用 `useEffect` 监听窗口变化以适配移动端
- 侧边栏在移动端默认隐藏，点击遮罩层自动关闭

#### 2. `StrategyDetail.tsx` - 策略详情组件

- 展示单个策略的完整信息
- 计算并展示盈亏图表
- 展示策略构造、风险收益、使用场景
- 特殊处理"期权基础"分类（显示四种基础形态的迷你图表）

**核心功能模块**：
- `calculateTotalPnl()`: 计算特定价格下的总盈亏
- `calculatedLegs`: 根据当前 BTC 价格计算每个期权腿的行权价和权利金
- `pnlData`: 生成盈亏图表数据点（价格范围 ±40%）
- `scenarioPoints`: 生成情景分析表数据（-20% 到 +20%）

**特殊处理**：
- 对于 `covered-call`、`protective-put`、`collar` 策略，需要额外计算现货持仓的盈亏
- 对于"期权基础"分类，使用 `OptionBasicsView` 组件展示四种基础期权形态

#### 3. `PnLChart.tsx` - 盈亏图表组件

- 基于 Recharts 库实现
- 使用渐变色区分盈利区（绿色）和亏损区（红色）
- 显示当前价格参考线
- 响应式设计，适配不同屏幕尺寸

#### 4. `constants.ts` - 策略数据

这是项目的**核心数据文件**，包含所有策略的定义。每个策略对象必须遵循严格的数据结构（见下文）。

#### 5. `types.ts` - 类型定义

定义了所有 TypeScript 接口和枚举：
- `StrategyCategory`: 策略分类枚举
- `OptionLeg`: 期权腿接口
- `Strategy`: 策略接口
- `ChartPoint`: 图表数据点接口

---

## 代码规范

### TypeScript 规范

#### 1. 类型定义

- **强制使用类型注解**：所有函数参数、返回值、变量都应该有明确的类型
- **禁止使用 `any`**：除非绝对必要，避免使用 `any` 类型
- **使用 Interface 而非 Type**：对于对象结构，优先使用 `interface`

```typescript
// ✅ 正确
interface StrategyDetailProps {
  strategy: Strategy;
  btcPrice: number;
}

// ❌ 错误
const StrategyDetail = (props: any) => { ... }
```

#### 2. 函数组件规范

- 使用 `React.FC<Props>` 定义函数组件
- Props 接口单独定义，放在组件上方
- 使用箭头函数定义组件

```typescript
// ✅ 正确
interface MyComponentProps {
  title: string;
  count: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, count }) => {
  return <div>{title}: {count}</div>;
};
```

#### 3. Hooks 使用规范

- **useMemo**: 用于计算密集型操作（如盈亏数据计算）
- **useEffect**: 用于副作用（如监听窗口变化）
- **useState**: 用于组件状态管理

依赖数组必须完整，包含所有使用的外部变量：

```typescript
// ✅ 正确
const pnlData = useMemo(() => {
  // 计算逻辑
}, [calculatedLegs, btcPrice, strategy.id]);

// ❌ 错误 - 缺少依赖
const pnlData = useMemo(() => {
  // 使用了 calculatedLegs 但未列入依赖
}, []);
```

### 代码风格规范

#### 1. 命名规范

- **组件名**：PascalCase（如 `StrategyDetail`）
- **函数名**：camelCase（如 `calculateTotalPnl`）
- **常量名**：UPPER_SNAKE_CASE（如 `DEFAULT_BTC_PRICE`）
- **接口名**：PascalCase，以描述性名词结尾（如 `StrategyDetailProps`）

#### 2. 文件组织

组件文件的标准组织顺序：

```typescript
// 1. 导入语句
import React, { useMemo } from 'react';
import { Strategy } from '../types';

// 2. 接口/类型定义
interface MyComponentProps {
  data: Strategy;
}

// 3. 辅助函数（如果有）
const formatMoney = (val: number) => `$${val.toLocaleString()}`;

// 4. 主组件
const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
  // 4.1 Hooks
  const [state, setState] = useState();
  
  // 4.2 计算逻辑
  const computed = useMemo(() => {}, []);
  
  // 4.3 事件处理函数
  const handleClick = () => {};
  
  // 4.4 渲染
  return <div>...</div>;
};

// 5. 导出
export default MyComponent;
```

#### 3. 注释规范

- **必要时添加注释**：对复杂逻辑、特殊处理进行注释
- **使用单行注释** `//` 或多行注释 `/* */`
- **注释应说明"为什么"而非"做什么"**

```typescript
// ✅ 正确 - 说明特殊逻辑的原因
// Special handling for Spot positions (Covered Call / Protective Put / Collar)
if (['covered-call', 'protective-put', 'collar'].includes(strategy.id)) {
  const spotPnl = price - btcPrice;
  totalPnl += spotPnl;
}

// ❌ 错误 - 仅重复代码含义
// Add spot PnL
const spotPnl = price - btcPrice;
```

---

## 策略内容撰写规范

### 策略数据结构

每个策略必须包含以下字段：

```typescript
{
  id: string;                    // 唯一标识符，使用 kebab-case
  name: string;                  // 中英文名称，格式："中文名 (English Name)"
  category: StrategyCategory;    // 策略分类（枚举值）
  description: string;           // 简短描述（1-2句话）
  setup: string;                 // 构造方法简述
  riskProfile: string;           // 风险收益特征
  idealScenario: string;         // 理想使用场景
  legs: OptionLeg[];            // 期权腿数组
  detailedAnalysis: {           // 详细分析
    explanation: string;         // 详细说明（HTML格式）
    pros: string[];             // 优势列表
    cons: string[];             // 劣势列表
  }
}
```

### 字段填写规范

#### 1. `id` - 唯一标识符

- **格式**：kebab-case（小写字母，单词用连字符分隔）
- **示例**：`long-call`、`bull-call-spread`、`iron-condor`
- **要求**：简洁、直观、与策略英文名对应

#### 2. `name` - 策略名称

- **格式**：`"中文名 (English Name)"`
- **示例**：`"买入看涨期权 (Long Call)"`
- **要求**：
  - 中文名应使用标准的期权术语
  - 英文名使用行业通用术语
  - 中英文之间用空格隔开

#### 3. `category` - 策略分类

使用 `StrategyCategory` 枚举值：

- `StrategyCategory.BASICS` - 期权基础
- `StrategyCategory.BULLISH` - 看涨策略
- `StrategyCategory.BEARISH` - 看跌策略
- `StrategyCategory.NEUTRAL` - 盘整/中性策略
- `StrategyCategory.VOLATILITY` - 高波动策略
- `StrategyCategory.INCOME` - 收益/对冲策略

#### 4. `description` - 简短描述

- **长度**：1-2 句话，不超过 80 个汉字
- **内容**：简明扼要描述策略的核心思想和特点
- **示例**：`"最基础的看涨策略。支付权利金，获得未来低价买入的权利。"`

#### 5. `setup` - 构造方法

- **格式**：简洁的构造步骤说明
- **示例**：`"买入 Call A + 卖出 Call B (Strike B > A)"`
- **要求**：使用标准术语（Buy/Sell、Call/Put、Strike）

#### 6. `riskProfile` - 风险收益特征

- **格式**：描述最大风险和最大收益
- **示例**：
  - `"风险有限 (权利金)，收益无限。"`
  - `"风险有限 (价差 - 成本)，收益有限 (价差)。"`
- **要求**：
  - 明确说明风险是"有限"还是"无限"
  - 说明收益的上限（如果有）
  - 用括号补充具体数值或公式

#### 7. `idealScenario` - 理想使用场景

- **格式**：简短描述适用的市场环境
- **示例**：
  - `"BTC价格大幅上涨。"`
  - `"BTC温和上涨。"`
  - `"横盘震荡，波动率下降。"`
- **要求**：直接、明确，避免模糊表述

#### 8. `legs` - 期权腿数组

每个期权腿包含以下字段：

```typescript
{
  type: 'Call' | 'Put';         // 期权类型
  action: 'Buy' | 'Sell';       // 买入或卖出
  strikeOffset: number;         // 行权价偏移（相对现价的倍数，如 1.05 表示高出5%）
  premiumRatio: number;         // 权利金比例（相对现价的百分比，如 0.03 表示3%）
}
```

**填写要求**：
- `strikeOffset` 应根据策略类型合理设置：
  - ATM（平值）：`1.00`
  - OTM Call（虚值看涨）：`1.05`、`1.10` 等
  - ITM Call（实值看涨）：`0.95`、`0.90` 等
  - OTM Put（虚值看跌）：`0.95`、`0.90` 等
  - ITM Put（实值看跌）：`1.05`、`1.10` 等

- `premiumRatio` 应根据虚实值情况设置：
  - ITM 期权：`0.06` - `0.08`（较贵）
  - ATM 期权：`0.04` - `0.05`（中等）
  - OTM 期权：`0.02` - `0.03`（较便宜）

**示例**：

```typescript
// Bull Call Spread（牛市看涨价差）
legs: [
  { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },  // 买入 ATM Call
  { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }  // 卖出 OTM Call
]
```

#### 9. `detailedAnalysis.explanation` - 详细说明

这是策略内容的**核心部分**，必须使用 **HTML 格式**编写，包含以下章节：

##### 必备章节结构

```html
<!-- 1. 策略核心思想（必备） -->
<div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
  <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
  <p class="text-emerald-800 text-sm">【简明扼要的核心思想描述】</p>
</div>

<!-- 2. 策略构造（必备） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
<div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
  【详细的构造步骤说明】
</div>

<!-- 3. 损益分析（必备） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
<div class="grid md:grid-cols-3 gap-4 mb-6">
  <!-- 最大收益卡片 -->
  <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
    <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
    <div class="text-2xl font-bold text-green-700 mb-2">【数值或公式】</div>
    <p class="text-xs text-slate-600">【说明】</p>
  </div>
  
  <!-- 最大亏损卡片 -->
  <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
    <div class="text-2xl font-bold text-red-700 mb-2">【数值或公式】</div>
    <p class="text-xs text-slate-600">【说明】</p>
  </div>
  
  <!-- 盈亏平衡点卡片 -->
  <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
    <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
    <div class="text-lg font-bold text-blue-700 mb-2">【公式】</div>
    <p class="text-xs text-slate-600">【说明】</p>
  </div>
</div>

<!-- 4. 实战案例（必备） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
  <p class="font-bold text-slate-900 mb-3">案例：【场景设定】</p>
  <div class="bg-white/70 rounded p-4 mb-3">
    <p class="text-sm text-slate-700 mb-2"><strong>买入操作：</strong></p>
    <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
      <li>【操作详情】</li>
    </ul>
  </div>
  <div class="space-y-2">
    <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
      <p class="text-sm font-bold text-green-800">✅ 场景1：【描述】</p>
      <p class="text-xs text-green-700 mt-1">【收益计算】</p>
    </div>
    <!-- 更多场景... -->
  </div>
</div>

<!-- 5. 使用场景（必备） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
<div class="space-y-3 mb-6">
  <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
    <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
    <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
      <li>【场景1】</li>
      <li>【场景2】</li>
    </ul>
  </div>
  <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
    <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
      <li>【场景1】</li>
      <li>【场景2】</li>
    </ul>
  </div>
</div>

<!-- 6. 风险提示（推荐） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
<div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
  <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
    <li><strong>【风险点1】</strong>：【说明】</li>
    <li><strong>【风险点2】</strong>：【说明】</li>
  </ul>
</div>

<!-- 7. 专业建议（推荐） -->
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
  <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
    <li><strong>【建议1】</strong>：【详细说明】</li>
    <li><strong>【建议2】</strong>：【详细说明】</li>
  </ul>
</div>
```

##### 内容撰写要求

1. **专业性**：
   - 使用准确的期权术语
   - 提供具体的数值示例（如 $100,000、$5,000 等）
   - 解释希腊字母的影响（Delta、Theta、Vega、Gamma）

2. **实用性**：
   - 提供真实的市场场景案例
   - 给出具体的进出场建议
   - 说明仓位管理要点

3. **可读性**：
   - 使用 emoji 图标增强可读性（💡、📋、💰、📊、🎯、⚠️、💡）
   - 分段清晰，避免大段文字
   - 使用列表、表格、卡片等结构化展示

4. **完整性**：
   - 必须包含上述所有必备章节
   - 推荐章节根据策略复杂度选择性添加
   - 对于复杂策略，增加更多实战案例和风险说明

#### 10. `detailedAnalysis.pros` - 优势列表

- **格式**：字符串数组，每项为一个完整句子
- **长度**：每项 30-80 个汉字
- **数量**：2-4 项
- **内容要求**：
  - 第一句说明主要优势
  - 使用术语时附带解释
  - 强调量化指标（如"最大化资金利用率"、"风险封顶"）

**示例**：

```typescript
pros: [
  '收益无限：理论上上行空间没有封顶，可充分享受牛市红利。',
  '风险锁定：最大亏损仅限于投入的权利金，不存在爆仓风险。',
  '资金利用率高：利用杠杆效应，以少量资金控制大额BTC名义价值。'
]
```

#### 11. `detailedAnalysis.cons` - 劣势列表

- **格式**：字符串数组，每项为一个完整句子
- **长度**：每项 30-80 个汉字
- **数量**：2-4 项
- **内容要求**：
  - 诚实指出策略的局限性和风险
  - 说明在什么情况下会亏损
  - 提及需要注意的希腊字母风险

**示例**：

```typescript
cons: [
  '时间损耗 (Theta)：期权价值随时间流逝而衰减，若BTC价格上涨缓慢或横盘，仍可能亏损。',
  '胜率压力：不仅需要判断方向正确，还需涨幅足以覆盖权利金成本。'
]
```

---

### 策略详解七章节实战书写规范

基于已完善的策略案例（如牛市看涨价差、合成多头等），以下是每个章节的详细书写规范：

#### 第一章节：💡 策略核心思想

**目的**：用一句话点明策略的精髓，让读者快速理解。

**格式模板**：
```html
<div class="bg-gradient-to-r from-[颜色]-50 to-[颜色]-50 border-l-4 border-[颜色]-500 p-5 rounded-lg mb-6">
  <p class="text-[颜色]-900 font-semibold mb-2">💡 策略核心思想</p>
  <p class="text-[颜色]-800 text-sm">【核心思想，30-60字，突出策略的独特性和适用场景】</p>
</div>
```

**颜色选择规则**：
- 看涨策略：`emerald/green`（绿色系）
- 看跌策略：`rose/red`（红色系）
- 中性策略：`blue/cyan`（蓝色系）
- 波动率策略：`purple/indigo`（紫色系）
- 对冲策略：`indigo/purple`（靛紫色系）

**内容要求**：
- 第一句说明策略的本质（如"信用价差"、"杠杆工具"、"收租策略"）
- 第二句说明核心机制或特点（如"买1卖2的比例"、"Delta≈1"）
- 第三句说明适合谁用（如"适合极度看涨且愿意承担复杂性的高手"）

**实际案例**：
```html
<!-- 牛市看跌价差示例 -->
<p class="text-emerald-800 text-sm">牛市看跌价差 (Bull Put Spread) 是一种<strong>信用价差 (Credit Spread)</strong> 策略。你在建仓时收钱，目标是让期权自然过期作废，从而保留全部权利金。这是一种"收租"式的看涨策略，适合不跌即赚的心态。</p>
```

#### 第二章节：📋 策略构造

**目的**：清晰展示策略的构造步骤和期权腿配置。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
<div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
  <p class="text-slate-700 mb-3"><strong>【策略公式或核心概念】</strong></p>
  <div class="grid md:grid-cols-2 gap-4">
    <!-- 期权腿1 -->
    <div class="bg-[颜色]-50 p-4 rounded border border-[颜色]-200">
      <p class="font-bold text-[颜色]-700 mb-2">📈/📉 【操作描述】</p>
      <p class="text-sm text-slate-700">【行权价说明】</p>
      <p class="text-xs text-slate-600 mt-1">例：【具体数值示例】</p>
    </div>
    <!-- 期权腿2 -->
  </div>
  <div class="bg-slate-50 p-4 rounded mt-3">
    <p class="text-sm text-slate-700 mb-2"><strong>【净成本/收入计算】</strong></p>
    <p class="text-xs text-slate-600">【说明成本与单一策略的对比】</p>
  </div>
</div>
```

**内容要求**：
- 开头简洁说明策略公式（如"Long Call + Short Put = Long Spot"）
- 每个期权腿用独立卡片展示，买入用绿色系，卖出用红色系
- 必须提供具体数值示例（如"买入 $100k Call，付 $5k"）
- 计算并展示净成本或净收入
- 与相关策略对比（如Strap说明比Straddle贵50%）

**实际案例**：
```html
<!-- 合成多头示例 -->
<p class="text-slate-700 mb-3"><strong>神奇的组合公式：</strong> Long Call + Short Put = Long Spot</p>
<div class="grid md:grid-cols-2 gap-4">
  <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
    <p class="font-bold text-emerald-700 mb-2">📈 买入 ATM Call</p>
    <p class="text-sm text-slate-700">行权价 = 当前价格</p>
    <p class="text-xs text-slate-600 mt-1">例：买入 $100k Call，付 $5k</p>
  </div>
  <div class="bg-rose-50 p-4 rounded border border-rose-200">
    <p class="font-bold text-rose-700 mb-2">📉 卖出 ATM Put</p>
    <p class="text-sm text-slate-700">行权价 = 当前价格</p>
    <p class="text-xs text-slate-600 mt-1">例：卖出 $100k Put，收 $5k</p>
  </div>
</div>
```

#### 第三章节：💰 损益分析

**目的**：用三卡片清晰展示最大收益、最大亏损和盈亏平衡点。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
<div class="grid md:grid-cols-3 gap-4 mb-6">
  <!-- 最大收益（绿色） -->
  <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
    <div class="text-xs text-green-600 font-bold mb-1">【收益标题】</div>
    <div class="text-2xl font-bold text-green-700 mb-2">【数值/公式/∞】</div>
    <p class="text-xs text-slate-600">【简短说明】</p>
  </div>
  
  <!-- 最大亏损（红色） -->
  <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <div class="text-xs text-red-600 font-bold mb-1">【风险标题】</div>
    <div class="text-2xl font-bold text-red-700 mb-2">【数值/公式/∞】</div>
    <p class="text-xs text-slate-600">【简短说明】</p>
  </div>
  
  <!-- 盈亏平衡点（蓝色） -->
  <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
    <div class="text-xs text-blue-600 font-bold mb-1">【平衡点标题】</div>
    <div class="text-lg font-bold text-blue-700 mb-2">【公式/数值】</div>
    <p class="text-xs text-slate-600">【简短说明】</p>
  </div>
</div>
```

**内容要求**：
- 必须包含具体数值示例（不能只写"权利金"，要写"$12k"）
- 无限收益/风险用 `∞` 符号
- 公式要清晰（如"Strike + Premium"、"价差 - 成本"）
- 对于复杂策略，可以调整卡片标题（如"暴涨收益"、"死谷风险"、"Delta"）

**实际案例**：
```html
<!-- 牛市看跌价差示例 -->
<div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
  <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
  <div class="text-2xl font-bold text-green-700 mb-2">$2k</div>
  <p class="text-xs text-slate-600">净权利金。BTC ≥ $95k 时全部保留</p>
</div>
```

#### 第四章节：📊 实战案例

**目的**：通过具体数值案例展示策略在不同市场情况下的表现。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
  <p class="font-bold text-slate-900 mb-3">案例：【场景设定，如"BTC $100k，预期暴涨"】</p>
  <div class="bg-white/70 rounded p-4 mb-3">
    <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
    <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
      <li>【操作1：具体数值】</li>
      <li>【操作2：具体数值】</li>
      <li>【总成本/收入：具体数值】</li>
    </ul>
  </div>
  <div class="space-y-2">
    <!-- 场景1：最佳情况（绿色） -->
    <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
      <p class="text-sm font-bold text-green-800">✅ 【场景描述】</p>
      <p class="text-xs text-green-700 mt-1">【详细的盈亏计算，必须有具体数值】</p>
    </div>
    
    <!-- 场景2：中等情况（黄色/蓝色） -->
    <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
      <p class="text-sm font-bold text-yellow-800">⚠️ 【场景描述】</p>
      <p class="text-xs text-yellow-700 mt-1">【计算说明】</p>
    </div>
    
    <!-- 场景3：最差情况（红色） -->
    <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
      <p class="text-sm font-bold text-red-800">❌ 【场景描述】</p>
      <p class="text-xs text-red-700 mt-1">【计算说明】</p>
    </div>
  </div>
</div>
```

**内容要求**：
- **必须有3个场景**：最佳、中等、最差
- 所有数值必须具体且合理（基于BTC $100k的案例）
- 盈亏计算要完整展示过程（如"卖出腿亏 $25k，买入腿赚 $60k，总盈利 $36k"）
- 场景描述要包含价格变化百分比（如"BTC涨到 $120k (+20%)"）
- 可以添加对比说明（如"远超Straddle的$16k"）

**实际案例**：
```html
<!-- Strap策略示例 -->
<div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
  <p class="text-sm font-bold text-green-800">✅ 向上突破：BTC涨到 $120k</p>
  <p class="text-xs text-green-700 mt-1">2份Call各赚 $20k，Put作废。总盈利 $40k - $12k = <strong>$28k</strong>（233%回报），远超Straddle的$16k</p>
</div>
```

#### 第五章节：🎯 使用场景

**目的**：明确告诉读者什么时候适合/不适合使用这个策略。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
<div class="space-y-3 mb-6">
  <!-- 适合使用（蓝绿色） -->
  <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
    <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
    <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
      <li>【场景1：具体描述市场环境】</li>
      <li>【场景2：技术指标或形态】</li>
      <li>【场景3：用户类型或目的】</li>
      <li>【场景4：其他条件】</li>
    </ul>
  </div>
  
  <!-- 不适合使用（粉红色） -->
  <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
    <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
    <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
      <li>【场景1：避免的市场环境】</li>
      <li>【场景2：不利条件】</li>
      <li>【场景3：风险提示】</li>
    </ul>
  </div>
</div>
```

**内容要求**：
- "适合使用"部分：3-5条，具体说明市场环境、技术形态、波动率条件等
- "不适合使用"部分：2-4条，说明应避免的情况
- 使用加粗突出关键词（如`<strong>史诗级暴涨</strong>`）
- 场景描述要具体可操作（不要写"看涨时"，要写"预期涨10-20%且有明确目标价位"）

**实际案例**：
```html
<!-- 看涨比例反向价差示例 -->
<ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
  <li>预期<strong>史诗级暴涨</strong>（如突破长期压力位，直冲新高）</li>
  <li>重大利好事件前（如ETF批准、减半后的超级牛市启动）</li>
  <li>隐含波动率偏低时建仓（买Call便宜且Vega有利）</li>
  <li>想用低成本甚至零成本博取暴涨收益</li>
</ul>
```

#### 第六章节：⚠️ 风险提示

**目的**：诚实告知策略的主要风险点和注意事项。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
<div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
  <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
    <li><strong>【风险名称】</strong>：【详细说明风险的原理和影响】</li>
    <li><strong>【风险名称】</strong>：【说明】</li>
    <li><strong>【风险名称】</strong>：【说明】</li>
    <li><strong>【风险名称】</strong>：【说明】</li>
  </ul>
</div>
```

**内容要求**：
- 列出3-5个主要风险点
- 每个风险必须加粗命名（如`<strong>死谷风险（Valley of Death）</strong>`）
- 说明风险的原理和实际影响
- 必须提及相关希腊字母（Theta、Gamma、Vega等）
- 诚实指出策略的致命弱点

**实际案例**：
```html
<!-- 看涨比例反向价差示例 -->
<li><strong>死谷风险（Valley of Death）</strong>：价格停在买入Call的行权价附近时亏损最大，这是此策略的致命弱点</li>
<li><strong>Gamma爆炸</strong>：临近到期时，死谷区的Gamma极高，价格微小波动会导致盈亏剧烈变化</li>
```

#### 第七章节：💡 专业建议

**目的**：提供实用的操作建议和交易技巧。

**格式模板**：
```html
<h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
  <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
    <li><strong>【建议类别】</strong>：【具体建议内容】</li>
  </ul>
</div>
```

**内容要求**：
- 提供4-6条实用建议
- 建议类别可以包括：
  - 行权价选择/间隔
  - 到期时间选择
  - 仓位管理
  - 止损/止盈策略
  - 滚动操作/平仓时机
  - Delta对冲/监控建议
  - 与其他策略对比
- 建议要具体可操作（给出具体百分比、天数等）
- 必须加粗建议类别名称

**实际案例**：
```html
<!-- 合成多头示例 -->
<li><strong>仓位控制</strong>：合成多头的名义价值不要超过总资金的3-5倍，给自己足够的安全垫</li>
<li><strong>保证金储备</strong>：至少预留50%以上的初始保证金作为储备，应对不利波动</li>
<li><strong>止损纪律</strong>：设定明确的止损线（如亏损10-15%），严格执行</li>
```

---

### 策略内容质量检查清单

在完成一个策略的详解内容后，请按以下清单验证：

**结构完整性**：
- [ ] 包含所有7个章节（核心思想、构造、损益、案例、场景、风险、建议）
- [ ] 每个章节都使用正确的emoji图标
- [ ] HTML标签正确闭合，无语法错误

**内容质量**：
- [ ] 所有数值示例具体且合理（不写"权利金"，要写"$5k"）
- [ ] 实战案例包含3个场景（最佳、中等、最差）
- [ ] 盈亏计算完整展示过程
- [ ] 提及至少2个希腊字母及其影响
- [ ] 使用场景具体可操作，不模糊
- [ ] 风险提示诚实全面
- [ ] 专业建议包含具体数值或百分比

**格式规范**：
- [ ] 颜色系统符合策略分类（看涨用绿色、看跌用红色等）
- [ ] 所有卡片使用grid布局且响应式
- [ ] 文本大小使用响应式类名（如`text-sm md:text-base`）
- [ ] 使用`space-y-*`控制列表间距
- [ ] 关键词使用`<strong>`加粗

**可读性**：
- [ ] 核心思想30-60字，简洁有力
- [ ] 实战案例场景描述清晰，包含百分比
- [ ] 使用场景分点列出，每点一句话
- [ ] 风险提示每项都有标题和说明
- [ ] 专业建议每条都有分类标签

---


## HTML 格式化指南

### Tailwind CSS 类名使用规范

#### 1. 颜色系统

本项目使用 Tailwind CSS 内置颜色，主要颜色规范：

- **蓝色系**：用于主题、链接、信息提示
  - `bg-blue-50/100` - 浅蓝背景
  - `text-blue-700/800/900` - 蓝色文字
  - `border-blue-200` - 蓝色边框

- **绿色系**：用于盈利、成功、积极信息
  - `bg-emerald-50/green-50` - 浅绿背景
  - `text-emerald-600/green-700` - 绿色文字
  - `border-emerald-200` - 绿色边框

- **红色系**：用于亏损、警告、风险提示
  - `bg-rose-50/red-50` - 浅红背景
  - `text-rose-600/red-700` - 红色文字
  - `border-rose-200` - 红色边框

- **灰色系**：用于常规文本、边框、背景
  - `bg-slate-50/100` - 浅灰背景
  - `text-slate-600/700/900` - 灰色文字
  - `border-slate-200` - 灰色边框

- **琥珀色系**：用于警告、注意事项
  - `bg-amber-50` - 浅琥珀色背景
  - `text-amber-800/900` - 琥珀色文字
  - `border-amber-200/300` - 琥珀色边框

#### 2. 渐变背景

使用 `bg-gradient-to-*` 创建渐变效果：

```html
<!-- 绿色渐变（盈利、看涨） -->
<div class="bg-gradient-to-r from-emerald-50 to-green-50">

<!-- 蓝色渐变（信息、中性） -->
<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">

<!-- 红色渐变（亏损、看跌） -->
<div class="bg-gradient-to-r from-red-50 to-rose-50">

<!-- 琥珀色渐变（警告） -->
<div class="bg-gradient-to-r from-amber-50 to-orange-50">
```

#### 3. 间距系统

遵循 Tailwind 的间距标准：

- `mb-2` / `mt-2` - 小间距（0.5rem）
- `mb-3` / `mt-3` - 中等间距（0.75rem）
- `mb-4` / `mt-4` - 标准间距（1rem）
- `mb-6` / `mt-6` - 大间距（1.5rem）
- `p-4` / `p-5` - 内边距

**响应式间距**：

```html
<div class="mb-4 md:mb-6">   <!-- 移动端 1rem，桌面端 1.5rem -->
<div class="p-4 md:p-8">     <!-- 移动端 1rem，桌面端 2rem -->
```

#### 4. 文本样式

- **标题**：
  ```html
  <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">
  ```

- **正文**：
  ```html
  <p class="text-slate-700 text-sm">
  ```

- **小字**：
  ```html
  <p class="text-xs text-slate-600">
  ```

- **强调**：
  ```html
  <strong>强调文本</strong>
  <span class="font-bold text-emerald-700">重要数据</span>
  ```

#### 5. 卡片样式

标准卡片结构：

```html
<div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
  <!-- 卡片内容 -->
</div>
```

带左边框的提示卡片：

```html
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
  <!-- 提示内容 -->
</div>
```

### HTML 结构规范

#### 1. 标题层级

- `<h4>` - 主要章节标题
- `<h5>` - 次级章节标题
- 不使用 `<h1>`、`<h2>`、`<h3>`（已被组件外层使用）

#### 2. 列表

无序列表：

```html
<ul class="list-disc pl-5 space-y-2 mb-4">
  <li>列表项1</li>
  <li>列表项2</li>
</ul>
```

带样式的列表：

```html
<ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
  <li>列表项1</li>
  <li>列表项2</li>
</ul>
```

#### 3. 表格（如需要）

```html
<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead class="bg-slate-50 border-b border-slate-200">
      <tr>
        <th class="px-4 py-3 text-left">列1</th>
        <th class="px-4 py-3 text-left">列2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="px-4 py-3">数据1</td>
        <td class="px-4 py-3">数据2</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 4. 响应式设计

所有内容必须考虑移动端适配：

```html
<!-- 网格布局响应式 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- 移动端单列，桌面端双列 -->
</div>

<!-- 文本大小响应式 -->
<p class="text-sm md:text-base">
  <!-- 移动端小字，桌面端标准字 -->
</p>
```

### 禁止事项

❌ **禁止使用以下内容**：

1. **内联样式**：
   ```html
   <!-- ❌ 错误 -->
   <div style="color: red;">
   
   <!-- ✅ 正确 -->
   <div class="text-red-600">
   ```

2. **自定义 CSS 类**（除非在 index.html 中定义）：
   ```html
   <!-- ❌ 错误 -->
   <div class="my-custom-class">
   
   <!-- ✅ 正确 -->
   <div class="bg-blue-50 p-4 rounded">
   ```

3. **未闭合的 HTML 标签**

4. **JavaScript 代码**（所有逻辑应在 TypeScript 中）

---

## 数据结构规范

### OptionLeg 接口

```typescript
export interface OptionLeg {
  type: 'Call' | 'Put';         // 期权类型（严格枚举）
  action: 'Buy' | 'Sell';       // 买卖方向（严格枚举）
  strikeOffset: number;         // 行权价偏移倍数（如 1.05 表示高出现价 5%）
  premiumRatio: number;         // 权利金占现价比例（如 0.03 表示 3%）
}
```

**取值范围**：
- `strikeOffset`: 0.80 - 1.20（通常在 ±20% 范围内）
- `premiumRatio`: 0.01 - 0.10（通常在 1%-10% 范围内）

### Strategy 接口

```typescript
export interface Strategy {
  id: string;                    // kebab-case 唯一标识
  name: string;                  // "中文名 (English Name)" 格式
  category: StrategyCategory;    // 枚举值
  description: string;           // 1-2句简短描述
  setup: string;                 // 构造步骤简述
  legs: OptionLeg[];            // 期权腿数组（可为空数组，如"期权基础"）
  riskProfile: string;           // 风险收益描述
  idealScenario: string;         // 适用场景
  detailedAnalysis: {
    explanation: string;         // HTML 格式的详细说明
    pros: string[];             // 优势列表（2-4项）
    cons: string[];             // 劣势列表（2-4项）
  };
}
```

### StrategyCategory 枚举

```typescript
export enum StrategyCategory {
  BASICS = '期权基础 (Option Basics)',
  BULLISH = '看涨策略 (Bullish)',
  BEARISH = '看跌策略 (Bearish)',
  NEUTRAL = '盘整/中性策略 (Neutral)',
  VOLATILITY = '高波动策略 (Volatility)',
  INCOME = '收益/对冲策略 (Income/Hedge)'
}
```

### 新增策略的完整流程

1. **确定策略分类**：选择合适的 `StrategyCategory`

2. **设计期权腿**：
   - 确定需要几个期权（1-4个常见）
   - 为每个期权设置 `type`、`action`、`strikeOffset`、`premiumRatio`
   - 确保 `strikeOffset` 和 `premiumRatio` 的组合合理

3. **撰写基本信息**：
   - `id`、`name`、`description`
   - `setup`、`riskProfile`、`idealScenario`

4. **撰写详细分析**：
   - 按照上述 HTML 模板编写 `explanation`
   - 列出 2-4 条 `pros`
   - 列出 2-4 条 `cons`

5. **在 `constants.ts` 中添加**：
   - 按分类添加到对应位置
   - 确保数据结构完整
   - 运行 `npm run dev` 测试

6. **测试验证**：
   - 检查图表是否正常显示
   - 检查策略构造详情是否正确
   - 检查盈亏情景表是否合理
   - 检查移动端显示效果

---

## 样式与设计规范

### 颜色语义

| 颜色 | 用途 | 示例类名 |
|------|------|----------|
| 蓝色 | 主题色、链接、信息 | `bg-blue-50`, `text-blue-700` |
| 绿色 | 盈利、成功、看涨 | `bg-emerald-50`, `text-green-700` |
| 红色 | 亏损、风险、看跌 | `bg-rose-50`, `text-red-700` |
| 灰色 | 中性、边框、禁用 | `bg-slate-50`, `text-slate-600` |
| 琥珀色 | 警告、注意 | `bg-amber-50`, `text-amber-800` |
| 紫色 | 高级信息、Gamma | `bg-purple-50`, `text-purple-700` |
| 靛蓝色 | Delta、专业建议 | `bg-indigo-50`, `text-indigo-700` |

### 排版规范

#### 字体大小

- **大标题**：`text-4xl` (2.25rem)
- **次标题**：`text-2xl` - `text-xl` (1.5rem - 1.25rem)
- **章节标题**：`text-lg` (1.125rem)
- **正文**：`text-base` (1rem)
- **小字**：`text-sm` (0.875rem)
- **超小字**：`text-xs` (0.75rem)

#### 字重

- **粗体**：`font-bold` (700)
- **半粗**：`font-semibold` (600)
- **中等**：`font-medium` (500)
- **常规**：`font-normal` (400)

#### 行高

- 标题：`leading-tight` (1.25)
- 正文：`leading-relaxed` (1.625) 或 `leading-loose` (2)

### 圆角规范

- **小圆角**：`rounded` (0.25rem)
- **中圆角**：`rounded-lg` (0.5rem)
- **大圆角**：`rounded-xl` (0.75rem)
- **超大圆角**：`rounded-2xl` (1rem)
- **圆形**：`rounded-full`

### 阴影规范

- **细微阴影**：`shadow-sm`
- **标准阴影**：`shadow`
- **中等阴影**：`shadow-md`
- **移动端侧边栏**：`shadow-2xl`

### 边框规范

- **标准边框**：`border border-slate-200`
- **左边框强调**：`border-l-4 border-blue-500`
- **无边框**：`border-0`

---

## 部署信息

### GitHub Pages 自动部署

- **工作流文件**：`.github/workflows/deploy.yml`
- **触发条件**：推送代码到 `main` 分支
- **自定义域名**：`option.riba2534.cn`
- **构建输出目录**：`/dist`

### 部署配置

1. 进入仓库 Settings > Pages
2. Source 选择 "GitHub Actions"
3. （可选）配置自定义域名，在 `CNAME` 文件中设置

### 本地构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建产物将输出到 `dist/` 目录。

---

## 最佳实践

### 添加新策略的检查清单

- [ ] 策略 ID 唯一且遵循 kebab-case
- [ ] 名称格式正确："中文名 (English Name)"
- [ ] 分类选择正确
- [ ] 期权腿数据合理（strikeOffset 和 premiumRatio）
- [ ] `explanation` 使用规范的 HTML 格式
- [ ] 包含所有必备章节（核心思想、构造、损益、案例、场景）
- [ ] `pros` 和 `cons` 各 2-4 条
- [ ] 在浏览器中测试显示效果
- [ ] 检查移动端响应式效果
- [ ] 验证盈亏图表数据正确性

### 修改现有策略的注意事项

1. **不要破坏数据结构**：确保所有必需字段都存在
2. **保持命名一致**：不要随意更改 `id`，会导致链接失效
3. **测试影响范围**：修改后检查相关组件是否正常工作
4. **保持风格统一**：遵循现有策略的格式和用词风格

### 性能优化建议

1. **useMemo 的使用**：
   - 对计算密集型操作（如盈亏数据）使用 `useMemo`
   - 正确设置依赖数组，避免不必要的重新计算

2. **避免过度渲染**：
   - 使用 `React.memo` 包装子组件（如需要）
   - 避免在渲染函数中创建新对象或函数

3. **图表性能**：
   - 控制图表数据点数量（当前为 100 个点）
   - 过多数据点会影响渲染性能

### 代码审查要点

提交代码前检查：

- [ ] TypeScript 类型正确，无 `any` 类型
- [ ] 无 ESLint 警告
- [ ] 代码格式符合项目规范
- [ ] 注释清晰，说明复杂逻辑
- [ ] 响应式设计正常工作
- [ ] 无 console.log 等调试代码

### 内容质量标准

策略内容应达到以下标准：

1. **准确性**：
   - 期权术语使用正确
   - 损益计算公式准确
   - 风险描述真实

2. **完整性**：
   - 涵盖所有必要信息
   - 提供足够的案例说明
   - 优劣势分析全面

3. **可读性**：
   - 语言通俗易懂
   - 结构清晰
   - 使用图标和格式增强可读性

4. **实用性**：
   - 提供可操作的建议
   - 说明实际应用场景
   - 指出常见错误

---

## 注意事项

### ⚠️ 重要提醒

1. **这是一个纯前端静态网站**
   - 所有数据在浏览器端计算和展示
   - 不涉及后端 API 或数据库
   - 策略数据完全存储在 `constants.ts` 中

2. **教育用途**
   - 盈亏图表计算结果仅供参考
   - **不构成投资建议**
   - 用户需理解期权交易风险

3. **依赖管理**
   - Tailwind CSS 通过 CDN 引入
   - Recharts 通过 npm 安装
   - 不要添加不必要的依赖

4. **浏览器兼容性**
   - 目标浏览器：现代浏览器（Chrome、Firefox、Safari、Edge）
   - 不支持 IE 11 及以下版本

### 常见问题

#### Q1: 修改策略后图表不更新？

**A**: 检查以下几点：
- `legs` 数组数据是否正确
- `strikeOffset` 和 `premiumRatio` 是否合理
- 浏览器缓存是否清除（Ctrl+Shift+R 强制刷新）

#### Q2: 如何调试盈亏计算逻辑？

**A**: 在 `StrategyDetail.tsx` 的 `calculateTotalPnl` 函数中添加 `console.log`：

```typescript
const calculateTotalPnl = (price: number) => {
  let totalPnl = 0;
  calculatedLegs.forEach(leg => {
    // 添加调试信息
    console.log('Leg:', leg, 'Price:', price, 'PnL:', legPnl);
  });
  return totalPnl;
};
```

#### Q3: 如何添加新的策略分类？

**A**: 
1. 在 `types.ts` 的 `StrategyCategory` 枚举中添加新类别
2. 重新编译项目
3. 在 `constants.ts` 中添加该类别的策略
4. 测试侧边栏分类显示

#### Q4: 移动端样式异常怎么办？

**A**: 
- 检查是否使用了响应式类名（如 `md:text-lg`）
- 在开发模式下使用浏览器开发者工具的移动端模拟器
- 确保没有固定宽度，使用 `w-full` 或百分比宽度

### 调试技巧

1. **React DevTools**：安装浏览器扩展，查看组件状态和 Props

2. **Vite HMR**：开发模式下修改文件会自动热更新，无需刷新页面

3. **TypeScript 错误**：
   - 运行 `npm run dev` 会在终端显示类型错误
   - 使用 VSCode 等 IDE 可实时看到类型提示

4. **样式调试**：
   - 使用浏览器开发者工具检查元素
   - Tailwind CSS 的类名会直接显示在 HTML 中
   - 可以临时修改类名测试效果

---

## 更新日志

### 版本历史

- **v3.0** (2025-11-25)
  - 大幅扩展文档内容
  - 添加详细的代码规范章节
  - 添加策略内容撰写规范
  - 添加 HTML 格式化指南
  - 添加数据结构规范
  - 添加样式与设计规范
  - 添加最佳实践和调试技巧

- **v2.0** (2025-11-20)
  - 添加策略详细分析内容规范
  - 优化项目架构说明

- **v1.0** (2025-11-15)
  - 初始版本
  - 基本项目概述和架构说明

---

## 联系方式

- **项目仓库**: https://github.com/riba2534/btc_options
- **在线演示**: https://option.riba2534.cn
- **问题反馈**: 通过 GitHub Issues 提交

---

**文档维护者**: 在修改本文档时，请确保保持结构清晰、内容准确、格式统一。
