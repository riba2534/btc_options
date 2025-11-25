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
          <p class="text-sm text-slate-700 mb-2"><strong>净成本 ≈ $0</strong>（仅需 Put 成本与保证金管理）</p>
          <p class="text-xs text-slate-600 mt-1">到期约定：<strong>两腿使用同一到期日</strong>；若需续持，建议在到期前 15–30 天滚动。</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">收益特征</div>
          <div class="text-2xl font-bold text-red-700 mb-2">近似无限</div>
          <p class="text-xs text-slate-600">价格下跌越多，收益越大（复制做空现货）</p>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">风险特征</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">近似无限</div>
          <p class="text-xs text-slate-600">价格上涨越多，亏损越大（需保证金）</p>
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
            <li>IV 极高（买 Put 成本偏贵）</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>保证金风险</strong>：上涨需追加保证金，可能被动平仓</li>
          <li><strong>Vega 风险</strong>：IV 下降不利于买入的 Put</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>仓位控制</strong>：名义价值不超过总资金的 3–5 倍</li>
          <li><strong>止损纪律</strong>：上涨到关键阻力位时主动对冲或平仓</li>
        </ul>
      </div>
    `,
    pros: [
      '以较低资金复制做空现货的损益（Delta ≈ -1）。',
      '横盘时时间价值大致对冲，盈亏趋近于零。'
    ],
    cons: [
      '上涨风险近似无限，需保证金与严格风控。'
    ]
  }
};

export default syntheticShort;
