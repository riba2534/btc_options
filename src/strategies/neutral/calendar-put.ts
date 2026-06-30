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
            <p class="text-xs text-green-700 mt-1">近月归零，远月价格因 IV↑ 上升，组合盈利约 $1.5k</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 温和偏离：$110k (+10%) / $90k (-10%)</p>
            <p class="text-xs text-yellow-700 mt-1">价格偏离行权价后远月时间价值衰减，组合利润明显回落（约 +$0.1k，接近盈亏平衡）</p>
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
          <li><strong>到期选择</strong>：近月 14-30 天、远月 45-60 天，拉开 Theta 差以放大近月衰减收益。</li>
        </ul>
      </div>
    `,
    pros: [
      '做多时间与波动率，价格在中枢徘徊时胜率高。',
      '净成本低、风险常仅限净投入。'
    ],
    cons: [
      '对点位与 IV 敏感，事件后可能利润回吐。',
      '事件后 Vega Crush 与近月被指派/点差滑点可能侵蚀已有利润。'
    ]
  },
  plainSummary: '赌 BTC 会在某个价位附近原地磨蹭。你卖掉一张快到期的看跌合约（它掉价快、被你赚走），同时买一张晚到期的同价位看跌垫底。只要价格别大涨大跌，时间走着走着你就净赚一点。',
  analogy: {
    emoji: '🏠',
    title: '长租转短租，吃时间差',
    text: '你手里有一张"晚到期"的长合约打底，同时把一张"早到期"的短合约卖给别人。短合约的时间价值掉得快，等它作废，这部分钱就净落你口袋；只要 BTC 在这个价位附近磨蹭别乱窜，你就能反复赚这个时间差。',
  },
  pitfalls: [
    '以为"方向无所谓"——恰恰相反，它最怕大涨大跌；价格一旦远离行权价，远月时间价值跟着缩水，净成本可能全亏光。',
    '只盯着"赚时间损耗"，忘了它同时在做多波动率：事件兑现后 IV 骤降（Vega Crush），就算价格没怎么动也可能亏钱。',
    '近月到期当天不管它——近月作废/被指派后只剩裸的远月单腿，方向敞口骤然放大，等于换了个完全不同的仓位。',
  ],
  quickJudge: {
    use: '预期价格在行权价附近横盘、IV 偏低待升',
    avoid: '预判要单边大涨大跌或 IV 已在高位',
  },
  greeks: {
    delta: '≈0',
    gamma: '−',
    theta: '+',
    vega: '+',
  },
  cryptoNote: 'Deribit 期权为欧式现金交割：近月到期不会被提前指派，但按结算价了结后只剩远月裸腿，须提前滚动续上近月。成本上两腿手续费各约标的 0.03%/张（封顶权利金 12.5%）+ 交割费叠加，本就微薄的时间差收益经不起来回折腾——务必用组合单/RFQ 按净价一次成交，别手动逐腿挂单（快市易留裸腿）。',
};

export default calendarPut;
