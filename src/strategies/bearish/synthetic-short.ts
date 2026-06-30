import { Strategy, StrategyCategory } from '@/types';

const syntheticShort: Strategy = {
  id: 'synthetic-short',
  name: '合成空头 (Synthetic Short)',
  category: StrategyCategory.BEARISH,
  description: '卖出 Call + 买入 Put（同价），复制做空现货的损益。',
  setup: '卖出 ATM Call + 买入 ATM Put',
  riskProfile: '风险收益近似于做空 1 BTC（Delta ≈ -1）。',
  idealScenario: '极度看跌且希望用较低资金表达方向性。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
        <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-rose-800 text-sm">合成空头通过 卖 Call + 买 Put（同价）复制做空现货的损益，Delta ≈ -1。<strong>必须使用同一到期日、同一行权价（通常 ATM）</strong>，否则不能精确复制现货的空头曲线。以较低资金表达强烈看跌观点。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-rose-50 p-4 rounded border border-rose-200">
            <p class="font-bold text-rose-700 mb-2">📉 卖 ATM Call</p>
            <p class="text-sm text-slate-700">例：卖 $100k Call，收 $5k</p>
          </div>
          <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
            <p class="font-bold text-emerald-700 mb-2">📈 买 ATM Put</p>
            <p class="text-sm text-slate-700">例：买 $100k Put，付 $5k</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本 ≈ $0</strong>(卖 Call 权利金抵消买 Put 成本,仅需占用保证金)</p>
          <p class="text-xs text-slate-600 mt-1">到期约定：<strong>两腿使用同一到期日</strong>；若需续持，建议在到期前 15–30 天滚动。</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">≈ $100k 上限</div>
          <p class="text-xs text-slate-600">价格归零时收益最大(受价格下限 0 约束)</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-red-700 mb-2">近似无限</div>
          <p class="text-xs text-slate-600">价格上涨越多,亏损越大(需保证金)</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">Delta</div>
          <div class="text-2xl font-bold text-blue-700 mb-2">≈ -1.0</div>
          <p class="text-xs text-slate-600">与做空 1 BTC 接近</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，强烈看跌</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 跌到 $80k (-20%)</p>
            <p class="text-xs text-green-700 mt-1">收益 ≈ $20k（复制做空现货的收益）</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 横盘 $100k</p>
            <p class="text-xs text-yellow-700 mt-1">盈亏≈0（时间价值对冲）</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 涨到 $120k (+20%)</p>
            <p class="text-xs text-red-700 mt-1">亏损 ≈ $20k，需保证金管理</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>极度看跌且希望用较低资金建立空头敞口</li>
            <li>具备保证金与风险控制能力</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>无法承受上涨风险的账户</li>
            <li>预期价格企稳或反弹时(方向判断错误则上涨端亏损无限);或现货融券/资金费率成本更低、可直接做空时。</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>保证金风险</strong>：上涨需追加保证金，可能被动平仓</li>
          <li><strong>方向性风险</strong>:组合近似 Delta ≈ -1 的现货空头,净 Vega ≈ 0(卖 Call 与买 Put 的 Vega 相互抵消),主要风险来自标的上涨而非 IV 变动。</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>仓位控制</strong>：名义价值不超过总资金的 3–5 倍</li>
          <li><strong>止损纪律</strong>：上涨到关键阻力位时主动对冲或平仓</li>
          <li><strong>替代方案比较</strong>:若现货/永续可直接做空且资金费率更低,优先用现货空头,合成空头主要用于无法直接做空的场景。</li>
        </ul>
      </div>
    `,
    pros: [
      '以较低资金复制做空现货的损益（Delta ≈ -1）。',
      '横盘时时间价值大致对冲，盈亏趋近于零。'
    ],
    cons: [
      '上涨风险近似无限，需保证金与严格风控。',
      '净 Vega/Theta 接近 0，无法像价差类策略那样从 IV 下降或时间衰减中获利。'
    ]
  },
  plainSummary: '用两张期权拼出一个"等于卖空 1 个 BTC"的仓位：币跌你就赚、币涨你就亏，而且涨越多亏越多、上不封顶，只是占用的本金比直接借币做空少一些。',
  analogy: {
    emoji: '📉',
    title: '借朋友的手办先卖掉，等降价再买回',
    text: '就像你看准某款手办要降价，先按现价"借来卖掉"，等它真跌了再低价买回还给人，差价就归你。合成空头用一卖一买两张期权拼出同样的效果——不用真去借币，也能押 BTC 下跌：跌了赚、涨了亏。'
  },
  pitfalls: [
    '以为"成本几乎为零"就很安全——其实上涨端亏损近乎无限，BTC 涨 20% 就亏约 $20k，凶险程度和真做空一模一样。',
    '忽视保证金：卖出的 Call 腿要占用保证金，价格上涨或 IV 飙升时会被追保甚至强平，不是建好仓放着不管就行。',
    '两腿没对齐——必须同一行权价、同一到期日才能精确复制做空曲线；选错行权价或到期日会变成对角/价差，损益完全不同。'
  ],
  quickJudge: {
    use: '极度看跌、想用低本金建空头',
    avoid: '横盘或预期反弹、扛不住上涨亏损'
  },
  greeks: {
    delta: '− (强)',
    gamma: '≈0',
    theta: '≈0',
    vega: '≈0'
  },
  cryptoNote: '卖出的 Call 腿在 Deribit 会占用保证金，到期前就可能被增量强平；即便现货没动，IV 单独飙升也会推高空头 mark price 触发追保。币本位计价时暴跌还会"浮亏 + 抵押品缩水"双杀。仓位务必放小、留足保证金缓冲。'
};

export default syntheticShort;
