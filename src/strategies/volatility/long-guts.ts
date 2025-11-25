import { Strategy, StrategyCategory } from '@/types';

const longGuts: Strategy = {
  id: 'long-guts',
  name: '买入内陷宽跨式 (Long Guts)',
  category: StrategyCategory.VOLATILITY,
  description: '买入 ITM Call + 买入 ITM Put，强做多波动率与 Gamma。',
  setup: '买入 ITM Call + 买入 ITM Put',
  riskProfile: '风险有限（双腿权利金），收益无限（双向）。',
  idealScenario: '大幅暴涨或暴跌，临期 Gamma 高。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.08 },
    { type: 'Put', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.08 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-5 rounded-lg mb-6">
        <p class="text-purple-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-purple-800 text-sm">Long Guts 通过买入两边实值期权做多波动率与 Gamma，临近到期对价格变化极其敏感，适合预期剧烈波动的场景。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
            <p class="font-bold text-indigo-700 mb-2">📈 买 ITM Call</p>
            <p class="text-sm text-slate-700">例：买 $95k Call（付 $8k）</p>
          </div>
          <div class="bg-purple-50 p-4 rounded border border-purple-200">
            <p class="font-bold text-purple-700 mb-2">📉 买 ITM Put</p>
            <p class="text-sm text-slate-700">例：买 $105k Put（付 $8k）</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>总成本</strong> = $16k（较 Straddle 更贵）</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">上涨收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">∞</div>
          <p class="text-xs text-slate-600">Call 实值带来更快的上行收益</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">下跌收益</div>
          <div class="text-2xl font-bold text-blue-700 mb-2">∞</div>
          <p class="text-xs text-slate-600">Put 实值带来更快的下行收益</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-red-700 mb-2">$16k</div>
          <p class="text-xs text-slate-600">横盘或小幅波动时亏损全部权利金</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期剧烈波动</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 暴涨：涨到 $120k</p>
            <p class="text-xs text-green-700 mt-1">Call 赚 ≈ $25k；净利 ≈ $9k</p>
          </div>
          <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p class="text-sm font-bold text-blue-800">✅ 暴跌：跌到 $80k</p>
            <p class="text-xs text-blue-700 mt-1">Put 赚 ≈ $25k；净利 ≈ $9k</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 横盘：收于 $102k</p>
            <p class="text-xs text-red-700 mt-1">两腿时间价值损耗，亏损 $16k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
            <li>重大事件前、方向未知但幅度确定</li>
            <li>临期高 Gamma 博取快速变化</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>长期横盘环境（Theta 损耗显著）</li>
            <li>IV 高位（买入成本过高）</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>Theta 损耗</strong>：双腿同时损失时间价值</li>
          <li><strong>Vega 风险</strong>：事件后 IV 回落可能压制价格</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>到期选择</strong>：事件前 7–30 天，避免过早被 Theta 吃掉</li>
          <li><strong>分批管理</strong>：单边走强时分批止盈，另一边作废</li>
        </ul>
      </div>
    `,
    pros: [
      '做多波动率与 Gamma，单边极端行情收益显著。',
      '双向无限收益，方向无关。'
    ],
    cons: [
      '成本高于 Straddle，横盘时亏损更快。'
    ]
  }
};

export default longGuts;
