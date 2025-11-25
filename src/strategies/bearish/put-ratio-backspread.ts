import { Strategy, StrategyCategory } from '@/types';

const putRatioBackspread: Strategy = {
  id: 'put-ratio-backspread',
  name: '看跌比例反向价差 (Put Ratio Backspread)',
  category: StrategyCategory.BEARISH,
  description: '卖出1份高价Put，买入2份低价Put。',
  setup: '卖出 1x ITM Put + 买入 2x OTM Put',
  riskProfile: '上行风险有限，下行收益巨大。',
  idealScenario: '极度看跌，防范崩盘。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.06 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">看跌比例反向价差 (Put Ratio Backspread) 以“卖 1、买 2”的不对称比例布局下行加速收益。用卖出贵的 Put 的收入，购买更多份数的便宜 Put，在崩盘时获得倍增收益，同时上行风险有限。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 1× ITM/ATM Put</p>
              <p class="text-sm text-slate-700">例：卖出 $105k Put，收 $6k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 2× OTM Put</p>
              <p class="text-sm text-slate-700">例：买入 2× $95k Put，付 $2.5k × 2 = $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入</strong> = $6k − $5k = <strong>$1k</strong>（理想情况可实现零成本甚至净收入建仓）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">崩盘收益</div>
            <div class="text-lg font-bold text-red-700 mb-2">加速 × 2</div>
            <p class="text-xs text-slate-600">价格越跌越赚，双倍 Put 叠加</p>
          </div>
          <div class="bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200 rounded-lg p-4">
            <div class="text-xs text-amber-600 font-bold mb-1">死谷风险</div>
            <div class="text-lg font-bold text-amber-700 mb-2">有限但集中</div>
            <p class="text-xs text-slate-600">价格停在买入 Put 行权价附近时亏损最大</p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">上行保护</div>
            <div class="text-lg font-bold text-emerald-700 mb-2">净权利金</div>
            <p class="text-xs text-slate-600">若上涨，整体亏损有限，甚至保留净收入</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，担心骤然崩盘</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓 1:2 Ratio：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出 1× $105k Put（收 $6,000）</li>
              <li>买入 2× $95k Put（付 $5,000）</li>
              <li>净收入 $1,000</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴跌到 $80k</p>
              <p class="text-xs text-green-700 mt-1">卖出腿亏 ≈ $25k，买入腿赚 ≈ $30k × 2 = $60k；合计 ≈ $35k + $1k = <strong>$36k</strong></p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 死谷：收于 $95k</p>
              <p class="text-xs text-red-700 mt-1">卖出腿亏 ≈ $10k；买入腿刚好平值；净亏 ≈ $9k（-$10k + $1k）</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 上涨到 $110k</p>
              <p class="text-xs text-yellow-700 mt-1">所有 Put 作废，保留净收入 $1k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>预期可能出现史诗级崩盘</li>
              <li>重大利空事件前后（黑天鹅风险）</li>
              <li>IV 较低时建仓，买入腿更划算</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>仅温和下跌预期（死谷风险较高）</li>
              <li>临近到期才建仓（Gamma 风险极大）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>死谷风险</strong>：价格收在买入 Put 行权价附近时亏损集中</li>
            <li><strong>Gamma 爆炸</strong>：临期曲率极高，盈亏变化剧烈</li>
            <li><strong>比例设置</strong>：1:2 常见，比例过大提高死谷风险</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>比例选择</strong>：优先 1:2，兼顾收益与风险</li>
            <li><strong>行权价间距</strong>：建议 8–12%，避免死谷过宽</li>
            <li><strong>净成本目标</strong>：尽量构建为零成本或净收入</li>
            <li><strong>风控监控</strong>：接近死谷价位时考虑提前调整或平仓</li>
          </ul>
        </div>
      `,
    pros: [
      '黑天鹅利器：在市场发生剧烈崩盘时，双倍的Put头寸将产生巨额收益。',
      '上行保护：若市场反而大幅上涨，策略可能仅损失微小成本或保留净权利金。'
    ],
    cons: [
      '死谷风险：若价格在到期时停留在两个行权价之间，将面临最大亏损。'
    ]
  }
};

export default putRatioBackspread;
