import { Strategy, StrategyCategory } from '@/types';

const diagonalCall: Strategy = {
  id: 'diagonal-call',
  name: '看涨对角价差 (Long Diagonal Call)',
  category: StrategyCategory.BULLISH,
  description: '不同到期与不同行权价的 Call 组合，方向 + 时间双因素。',
  setup: '买入 远月 ITM Call + 卖出 近月 OTM Call',
  riskProfile: '风险有限（净成本），收益有限（近月价差 + 远月保值）。',
  idealScenario: '温和上涨、近月 Theta 快衰减，IV 上升。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06, expiryLabel: '远月' },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02, expiryLabel: '近月' }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
        <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-emerald-800 text-sm">Long Diagonal Call 将方向与时间优势结合：远月 ITM Call 捕捉上涨，近月 OTM Call 收权利金抵成本并加速 Theta 收益。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
            <p class="font-bold text-emerald-700 mb-2">📈 买 远月 ITM Call</p>
            <p class="text-sm text-slate-700">例：买 $95k Call（付 $6k）</p>
          </div>
          <div class="bg-rose-50 p-4 rounded border border-rose-200">
            <p class="font-bold text-rose-700 mb-2">📉 卖 近月 OTM Call</p>
            <p class="text-sm text-slate-700">例：卖 $110k Call（收 $2k）</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $4k</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div class="text-xs text-green-600 font-bold mb-1">理想收益</div>
          <div class="text-2xl font-bold text-green-700 mb-2">近月归零 + 远月升值</div>
          <p class="text-xs text-slate-600">温和上涨、近月作废，远月 ITM 保值增值</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-red-700 mb-2">净成本</div>
          <p class="text-xs text-slate-600">若不涨或大跌</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">关键因素</div>
          <div class="text-lg font-bold text-blue-700 mb-2">Theta / Vega</div>
          <p class="text-xs text-slate-600">近月 Theta 利好、事件前 Vega 上升利好</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，温和看涨</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 涨到 $110k (+10%)</p>
            <p class="text-xs text-green-700 mt-1">近月归零，远月 ITM 增值；组合盈利 $3k+</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 横盘 $100k (0%)</p>
            <p class="text-xs text-yellow-700 mt-1">近月部分归零，远月持平；盈利有限</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 下跌到 $90k (-10%)</p>
            <p class="text-xs text-red-700 mt-1">亏损接近净成本 $4k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>温和上涨，目标价明确</li>
            <li>IV 有上升预期、近月 Theta 快</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>剧烈上涨（近月被行权收益受限）</li>
            <li>IV 高位且预计回落</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>Theta 不对称</strong>：近月腿衰减，需及时滚动</li>
          <li><strong>Vega 风险</strong>：事件后 IV 回落压制远月</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>滚动管理</strong>：近月接近行权价或临期时滚动至更高行权价或下一期</li>
          <li><strong>到期搭配</strong>：远月 60–90 天，近月 14–30 天</li>
        </ul>
      </div>
    `,
    pros: [
      '方向 + 时间双因素：做多上涨与近月 Theta 收益。',
      '成本较低：近月收权利金抵消部分远月成本。'
    ],
    cons: [
      '上涨过快时近月被行权导致收益受限。',
      '事件后 IV 回落可能压制远月价值。'
    ]
  }
};

export default diagonalCall;
