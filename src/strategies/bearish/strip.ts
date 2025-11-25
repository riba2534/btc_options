import { Strategy, StrategyCategory } from '@/types';

const strip: Strategy = {
  id: 'strip',
  name: '空头条式组合 (Strip)',
  category: StrategyCategory.BEARISH,
  description: '买入1份Call，买入2份Put。看多波动率但更看跌。',
  setup: '买入 1x Call + 买入 2x Put (同Strike)',
  riskProfile: '风险有限，收益无限 (下跌赚双倍)。',
  idealScenario: '变盘在即，且向下破位概率大。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">空头条式组合 (Strip) 是跨式组合的看跌增强版。用 2 份 Put + 1 份 Call，在做多波动率的同时表达强烈看跌偏好：下跌赚双倍，上涨仅小赚或不赚。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 买入 2× ATM Put</p>
              <p class="text-sm text-slate-700">例：买 2× $100k Put，付 $4k × 2 = $8k</p>
            </div>
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 买入 1× ATM Call</p>
              <p class="text-sm text-slate-700">例：买 1× $100k Call，付 $4k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总成本</strong> = $12k（比 Straddle 贵 50%，向下收益增强）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">下跌收益</div>
            <div class="text-2xl font-bold text-red-700 mb-2">∞ × 2</div>
            <p class="text-xs text-slate-600">双倍 Put 带来双倍速度的下跌盈利</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">上涨收益</div>
            <div class="text-2xl font-bold text-blue-700 mb-2">∞ × 1</div>
            <p class="text-xs text-slate-600">Call 端贡献上涨收益，但较慢</p>
          </div>
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
            <div class="text-xs text-amber-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-amber-700 mb-2">$12k</div>
            <p class="text-xs text-slate-600">横盘时损失全部权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，关键支撑摇摇欲坠</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 向下破位：跌到 $80k</p>
              <p class="text-xs text-green-700 mt-1">Put 收益 ≈ $20k × 2 = $40k；总盈利 ≈ $28k（233%）</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 向上假摔拉回：涨到 $120k</p>
              <p class="text-xs text-blue-700 mt-1">Call 赚 ≈ $20k；净利 ≈ $8k（67%），低于向下破位</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 横盘：收于 $102k</p>
              <p class="text-xs text-red-700 mt-1">三份期权几乎作废，亏损 $12k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>变盘节点、支撑破位概率显著提升</li>
              <li>IV 较低，有利于买入端性价比</li>
              <li>需表达强烈看跌偏好，又不完全排除向上可能</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>方向不明确且波动率极高（成本过高）</li>
              <li>长期横盘环境（Theta 损耗显著）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>成本压力</strong>：总权利金较高，需更大波动覆盖成本</li>
            <li><strong>死谷风险</strong>：买入行权价附近的结算点位是最差</li>
            <li><strong>Vega Crush</strong>：事件后 IV 暴跌，方向正确但价格不够也可能亏</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>事件前建仓</strong>：尽量在 1–2 周前进场，避免临期 Gamma 风险</li>
            <li><strong>分批止盈</strong>：暴跌时分批落袋，避免反弹回吐</li>
            <li><strong>比例与间距</strong>：控制比例与行权价间距，兼顾净收入与死谷宽度</li>
          </ul>
        </div>
      `,
    pros: [
      '极佳的做空爆发力：在市场暴跌时提供双倍杠杆收益。',
      '对冲反向风险：若判断失误市场暴涨，持有的Call能挽回部分损失甚至盈利。'
    ],
    cons: [
      '成本高昂：构建该组合需要支付三份权利金。',
      '横盘风险：若市场进入低波动震荡，时间价值的损耗将导致严重亏损。'
    ]
  }
};

export default strip;
