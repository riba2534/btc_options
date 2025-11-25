# BTC 期权策略展示网站

一个专注于BTC期权策略展示的教学网站，提供交互式盈亏图表和详细策略解析。

**在线访问**: https://option.riba2534.cn

## ✨ 核心功能

### 📊 交互式盈亏图表
- 实时计算和展示不同 BTC 价格下的盈亏情况
- 动态图表展示策略的盈亏平衡点
- 价格范围覆盖 40,000 - 140,000

### 📚 策略详解
- 20+ 种期权策略完整解析
- 中英文名称对照
- 策略构成和希腊字母值
- 风险收益特征分析
- 适用市场情景说明

### 🎨 直观的界面
- 策略分类展示（看涨/看跌/中性/波动率策略）
- 响应式设计，支持移动端
- 清晰的风险等级标识
- 简洁的交互体验

## 🛠️ 技术实现

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Recharts** - 图表渲染
- **Tailwind CSS** - 样式框架

## 🚀 快速开始

### 环境要求
- Node.js 20+
- npm

### 本地运行

```bash
# 克隆项目
git clone https://github.com/riba2534/btc_options.git
cd btc_options

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览
npm run preview
```

## 📁 项目结构

```
btc_options/
├── components/          # React 组件
│   ├── PnLChart.tsx    # 盈亏图表组件
│   └── StrategyDetail.tsx # 策略详情展示


├── constants.ts        # 策略数据常量
├── types.ts           # TypeScript 类型定义
├── App.tsx            # 主应用组件
├── index.tsx          # React 入口
└── vite.config.ts     # Vite 配置
```

## 📖 支持的策略类型

### 看张策略
- 买入看涨期权 (Long Call)
- 卖出看跌期权 (Short Put)
- 牛市价差 (Bull Call Spread)
- 合成多头 (Synthetic Long)

### 看跌策略
- 买入看跌期权 (Long Put)
- 卖出看涨期权 (Short Call)
- 熊市价差 (Bear Put Spread)
- 合成空头 (Synthetic Short)

### 中性策略
- 跨式组合 (Long Straddle)
- 宽跨式组合 (Long Strangle)
- 铁鹰价差 (Iron Condor)
- 蝶式价差 (Butterfly Spread)

### 波动率策略
- 日历价差 (Calendar Spread)
- 对角价差 (Diagonal Spread)
- 比率价差 (Ratio Spread)

## 🎯 使用说明

1. 打开网站，选择策略类型（看涨/看跌/中性/波动率）
2. 从侧边栏选择具体策略
3. 查看策略详解、构成、希腊字母值和盈亏图表
4. 通过图表了解不同价格下的盈亏情况
5. 查看策略适用场景和优缺点

## 🚀 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

**配置步骤**：

1. 进入仓库 Settings > Pages
2. 选择 "GitHub Actions" 作为部署源
3. 可选：配置自定义域名

每次推送到 main 分支将自动触发部署。

## ⚠️ 免责声明

- 本项目仅用于教学和信息展示目的
- 盈亏计算结果仅供参考，不构成投资建议
- 加密货币交易存在高风险，请谨慎决策
- 使用前请确保你理解期权交易的风险

## 📄 许可证

MIT License

## 🤝 参与贡献

欢迎提交 Issues 和 Pull Requests！

---

**项目地址**: https://github.com/riba2534/btc_options
