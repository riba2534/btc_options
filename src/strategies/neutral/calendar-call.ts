import { Strategy, StrategyCategory } from '@/types';

const calendarCall: Strategy = {
  id: 'calendar-call',
  name: '看涨时间价差 (Call Calendar Spread)',
  category: StrategyCategory.NEUTRAL,
  description: '同行权价不同到期的 Call 组合，做多时间与波动率。',
  setup: '买入 远月 ATM Call + 卖出 近月 ATM Call',
  riskProfile: '风险有限（权利金差），收益有限（近月衰减带来的净值提升）。',
  idealScenario: '价格在行权价附近徘徊，近月 Theta 快速衰减，IV 上升。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Call Calendar 通过同行权价不同到期的 Call 组合，利用近月期权更快的 Theta 衰减与事件前的 IV 上升来获利。价格在行权价附近徘徊时最优。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-3"><strong>远月多头 + 近月空头</strong></p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
            <p class="font-bold text-indigo-700 mb-2">📈 买入 远月 ATM Call</p>
            <p class="text-sm text-slate-700">例：买 $100k Call（付 $5k）</p>
          </div>
          <div class="bg-purple-50 p-4 rounded border border-purple-200">
            <p class="font-bold text-purple-700 mb-2">📉 卖出 近月 ATM Call</p>
            <p class="text-sm text-slate-700">例：卖 $100k Call（收 $4k）</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $1k（远月 − 近月）</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">理想收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">近月归零 + 远月保值</div>
          <p class="text-xs text-slate-600">价格≈Strike 时近月作废，远月保留时间价值</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-red-700 mb-2">净成本</div>
          <p class="text-xs text-slate-600">若价格远离行权价并且 IV 下降</p>
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
          <p class="text-sm text-slate-700 mb-2"><strong>建仓：</strong>买远月 $100k Call（$5k），卖近月 $100k Call（$4k），净成本 $1k</p>
        </div>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收敛：到近月到期时收于 $100k</p>
            <p class="text-xs text-green-700 mt-1">近月归零，远月因 IV↑ 价格↑，组合盈利 $2k–$3k</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 温和偏离：收于 $110k / $90k</p>
            <p class="text-xs text-yellow-700 mt-1">近月不归零，组合盈利缩小或持平</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 远离 + IV 下降</p>
            <p class="text-xs text-red-700 mt-1">可能亏损净成本 $1k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>事件前窗口（IV 有望上升）</li>
            <li>预计价格在行权价附近震荡</li>
            <li>想做多时间价值与 Vega</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>趋势行情（远离行权价）</li>
            <li>IV 处于历史高位且预计回落</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>Theta 不对称</strong>：近月衰减快，远月保值；价格偏离时近月可能不归零</li>
          <li><strong>Vega 风险</strong>：事件后 IV 下跌可能压制远月价格（Vega Crush）</li>
          <li><strong>流动性</strong>：滚动近月腿需关注点差与费用</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>到期搭配</strong>：远月 60–90 天 + 近月 14–30 天较常见</li>
          <li><strong>行权价选择</strong>：通常选 ATM，获得最大 Theta/Vega 效果</li>
          <li><strong>滚动策略</strong>：近月到期前滚动至下一期，维持结构</li>
        </ul>
      </div>
    `,
    pros: [
      '做多时间与波动率：近月 Theta 快衰减、事件前 Vega 有利。',
      '成本可控：净成本较低，风险通常仅限净投入。'
    ],
    cons: [
      '对点位敏感：价格远离行权价时近月不归零，利润受限。',
      '事件预期风险：事件落地后 IV 回落可能压制远月期权价格。'
    ]
  }
};

export default calendarCall;
