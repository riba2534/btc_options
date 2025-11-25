import { Strategy, StrategyCategory } from '@/types';

const calendarPut: Strategy = {
  id: 'calendar-put',
  name: '看跌时间价差 (Put Calendar Spread)',
  category: StrategyCategory.NEUTRAL,
  description: '同行权价不同到期的 Put 组合，做多时间与波动率。',
  setup: '买入 远月 ATM Put + 卖出 近月 ATM Put',
  riskProfile: '风险有限（权利金差），收益有限（近月衰减带来的净值提升）。',
  idealScenario: '价格在行权价附近徘徊，近月 Theta 快速衰减，IV 上升。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05, expiryLabel: '远月' },
    { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04, expiryLabel: '近月' }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Put Calendar 结构与 Call Calendar 类似，但更适合下跌风险偏好者在行权价附近做多时间与波动率。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
            <p class="font-bold text-indigo-700 mb-2">📉 买入 远月 ATM Put</p>
            <p class="text-sm text-slate-700">例：买 $100k Put（付 $5k）</p>
          </div>
          <div class="bg-purple-50 p-4 rounded border border-purple-200">
            <p class="font-bold text-purple-700 mb-2">📈 卖出 近月 ATM Put</p>
            <p class="text-sm text-slate-700">例：卖 $100k Put（收 $4k）</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $1k</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">理想收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">近月归零 + 远月保值</div>
          <p class="text-xs text-slate-600">价格≈Strike 时近月作废，远月保留时间与 IV</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-red-700 mb-2">净成本</div>
          <p class="text-xs text-slate-600">价格远离行权价且 IV 下跌</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">关键因素</div>
          <div class="text-lg font-bold text-blue-700 mb-2">Theta / Vega</div>
          <p class="text-xs text-slate-600">近月快衰减（Theta），事件前 IV 上升（Vega）</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，事件前 30 天建仓</p>
        <div class="bg-white/70 rounded p-4 mb-3">
          <p class="text-sm text-slate-700 mb-2"><strong>建仓：</strong>买远月 $100k Put（$5k），卖近月 $100k Put（$4k），净成本 $1k</p>
        </div>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收敛：收于 $100k</p>
            <p class="text-xs text-green-700 mt-1">近月归零，远月价格因 IV↑ 上升，组合盈利 $2k+</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 温和偏离：$110k (+10%) / $90k (-10%)</p>
            <p class="text-xs text-yellow-700 mt-1">近月不归零，利润下降或持平</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 远离 + IV 下降</p>
            <p class="text-xs text-red-700 mt-1">亏损净成本 $1k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>事件前窗口、预期波动上升</li>
            <li>价格预期在 ATM 附近徘徊</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>方向趋势明显（远离行权价）</li>
            <li>IV 可能大幅回落</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>Theta 不对称</strong>：近月腿归零速度与点位密切相关</li>
          <li><strong>Vega 风险</strong>：事件后 IV 下跌（Vega Crush）</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>滚动策略</strong>：近月临期时滚动维持结构</li>
          <li><strong>点位优化</strong>：以 ATM 为主，必要时轻微 ITM/OTM 调整</li>
        </ul>
      </div>
    `,
    pros: [
      '做多时间与波动率，价格在中枢徘徊时胜率高。',
      '净成本低、风险常仅限净投入。'
    ],
    cons: [
      '对点位与 IV 敏感，事件后可能利润回吐。'
    ]
  }
};

export default calendarPut;
