import { Strategy, StrategyCategory } from '@/types';

const bearCallSpread: Strategy = {
  id: 'bear-call-spread',
  name: '熊市看涨价差 (Bear Call Spread)',
  category: StrategyCategory.BEARISH,
  description: '收权利金的看不涨策略；卖低Call收租、买高Call限损。',
  setup: '卖出 Call A + 买入 Call B (Strike A < B)',
  riskProfile: '风险有限（价差−净收）；收益有限（净收）；Theta 正、Vega 负；需保证金。',
  idealScenario: '下跌或横盘不破上方阻力；IV 高位更适合收租。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.03 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">熊市看涨价差 (Bear Call Spread) 是净收权利金的信用价差。通过卖出较低行权价的 Call 并买入更高行权价的 Call 做保护，赌价格不会大涨突破上方阻力，获利为净权利金。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 Call A（较低行权价）</p>
              <p class="text-sm text-slate-700">例：卖出 $105k Call，收 $3k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 Call B（较高行权价）</p>
              <p class="text-sm text-slate-700">例：买入 $115k Call，付 $1k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入（Net Credit）</strong> = $3k − $1k = <strong>$2k</strong></p>
            <p class="text-xs text-slate-600">最大收益即为净权利金。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$2k</div>
            <p class="text-xs text-slate-600">价格 ≤ $105k 时全部保留</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$8k</div>
            <p class="text-xs text-slate-600">($115k − $105k) − $2k = $8k</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$107k</div>
            <p class="text-xs text-slate-600">卖出价 + 净权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，看不涨</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 收敛至 $100k 附近</p>
              <p class="text-xs text-green-700 mt-1">两个 Call 作废，保留 $2k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 涨到 $108k</p>
              <p class="text-xs text-yellow-700 mt-1">超出平衡点 1k，亏损 ≈ $1k</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 暴涨到 $120k</p>
              <p class="text-xs text-red-700 mt-1">接近最大亏损 $8k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>上方阻力重重、突破概率低</li>
              <li>IV 偏高，可获得较高权利金</li>
              <li>对冲现货多头顶部风险</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>预期可能暴涨（尾部风险较大）</li>
              <li>IV 极低（权利金收入不足）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Gamma 风险</strong>：临近到期，价格靠近 A 时盈亏变化极快</li>
            <li><strong>提前行权</strong>：极端场景可能遇到提前行权（视交易规则）</li>
            <li><strong>保证金占用</strong>：净卖方策略需准备保证金</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价设定</strong>：卖出价选择关键阻力位；买入价外扩 8–12%</li>
            <li><strong>到期选择</strong>：30–45 天更利于 Theta 收益与风险控制</li>
            <li><strong>盈利落袋</strong>：获利 50–70% 权利金时考虑提前平仓</li>
            <li><strong>风控对冲</strong>：若突破迹象明显，及时滚动或对冲</li>
          </ul>
        </div>
      `,
    pros: [
      '高胜率：只要市场不涨（下跌、横盘、微涨）均可获利。',
      '风险锁定：买入的保护性Call限制了极端上涨行情的亏损上限。'
    ],
    cons: [
      '盈亏比不佳：通常最大亏损高于最大盈利，属于“高胜率、低赔率”策略。'
    ]
  }
};

export default bearCallSpread;
