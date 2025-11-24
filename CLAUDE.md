# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 在与本仓库代码协作时提供指导。

## 项目概述

这是一个**比特币期权策略展示网站**，使用 React + TypeScript + Vite 构建。网站主要用于展示和教学各种比特币期权交易策略，包含交互式盈亏图表和策略详解。

**重要提示：这是一个纯前端展示网站，仅用于策略可视化展示和教育目的。**

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

## 项目架构

### 组件结构
- **App.tsx**: 主应用组件
  - 响应式侧边栏导航
  - 策略分类展示（看涨/看跌/中性/波动率）
  - 移动端和桌面端适配

- **StrategyDetail.tsx**: 策略详情展示组件
  - 盈亏计算和展示
  - 策略构成说明
  - 情景分析表
  - 风险收益特征

- **PnLChart.tsx**: 盈亏图表组件（基于 Recharts）
  - 动态盈亏曲线
  - 颜色区分盈利/亏损区域
  - 响应式设计

### 核心文件
- **constants.ts**: 包含 20+ 种期权策略的完整定义
  - 策略中英文名称
  - 风险档案描述
  - 情景分析数据
  - 策略优劣分析

- **types.ts**: TypeScript 类型定义
  - Strategy（策略）
  - OptionLeg（期权腿）
  - ChartPoint（图表数据点）
  - StrategyCategory（策略类别枚举）

- **vite.config.ts**: Vite 构建配置
  - 开发服务器端口 3000
  - 环境变量注入（GEMINI_API_KEY）

### 技术栈
- React 19.2.0 + TypeScript
- Vite 6.2.0
- Recharts 3.5.0（图表库）
- Tailwind CSS（CDN 引入）

## 环境配置

### 环境变量（可选）
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

该变量用于 AI 功能，如未配置，AI 功能将不可用，但网站其他功能正常使用。

### 本地开发
1. 在项目根目录创建 `.env.local` 文件
2. 添加 `GEMINI_API_KEY`（可选）
3. 运行 `npm run dev` 启动开发服务器

## 部署信息

### GitHub Pages 自动部署
- **工作流**: `.github/workflows/deploy.yml`
- **触发条件**: 推送代码到 main 分支
- **域名**: option.riba2534.cn
- **构建输出**: `/dist` 目录

### 部署配置
- 仓库 Settings > Pages > Source: GitHub Actions
- 需要配置 GitHub Secret: `GEMINI_API_KEY`（可选）

## 开发规范

### 修改策略数据
- 所有策略数据在 `constants.ts` 中定义
- 新增策略需包含：中英文名称、策略说明、风险描述、希腊字母值、情景分析
- 风险等级类型: 'limited' | 'unlimited' | 'high' | 'low' | 'medium'
- 策略类别需匹配 StrategyCategory 枚举值

### 修改盈亏计算
- 盈亏计算逻辑在 `StrategyDetail.tsx` 的 `calculatePnL` 函数中
- 计算范围: BTC 价格 40,000 - 140,000
- 图表数据格式: `ChartPoint { price: number; pnl: number }`

### 样式修改
- 使用 Tailwind CSS 类名
- 主要颜色: 蓝色系（sky-*, blue-*）
- 盈利: 绿色（green-500）
- 亏损: 红色（red-500）

## 注意事项

1. **这是一个纯前端静态网站**，所有数据在浏览器端计算和展示
2. 盈亏图表计算结果仅供参考，不构成投资建议
3. 策略数据存储在前端，不涉及后端数据库
4. 网站使用 CDN 引入 Tailwind CSS 和 Recharts，无需额外配置
5. 构建产物会被推送到 GitHub Pages，无需手动部署
