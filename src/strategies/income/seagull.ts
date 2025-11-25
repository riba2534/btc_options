import { Strategy, StrategyCategory } from '@/types';

const seagull: Strategy = {
  id: 'seagull',
  name: '海鸥组合 (Seagull)',
  category: StrategyCategory.INCOME,
  description: '低成本方向表达：买 Call + 卖更高 Call + 卖 Put。',
  setup: '买 ATM Call + 卖 OTM Call + 卖 OTM Put',
  riskProfile: '下方风险较大，上方收益封顶；成本低或净收。',
  idealScenario: '轻微看涨、价格留在安全区间。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.03 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
        <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-indigo-800 text-sm">Seagull 用卖 Put 与卖更高 Call 抵消买 Call 成本，实现低成本或净收的方向表达，适合轻微看涨的区间。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 买 $100k Call（付 $5k）</p>
            <p class="text-sm text-slate-700">方向表达</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 $110k Call（收 $2k）+ 卖 $95k Put（收 $3k）</p>
            <p class="text-sm text-slate-700">抵成本，低成本或净收</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> ≈ $0</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">上方收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">封顶</div>
          <p class="text-xs text-slate-600">被 $110k Call 限制</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">下方风险</div>
          <div class="text-2xl font-bold text-red-700 mb-2">较大</div>
          <p class="text-xs text-slate-600">被 $95k Put 行权时接盘</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">净成本</div>
          <div class="text-lg font-bold text-blue-700 mb-2">低或净收</div>
          <p class="text-xs text-slate-600">抵消买 Call 成本</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，轻微看涨</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收于 $105k–$109k</p>
            <p class="text-xs text-green-700 mt-1">方向实现，净成本≈0，收益可观</p>
          </div>
          <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p class="text-sm font-bold text-blue-800">ℹ️ 收于 $100k</p>
            <p class="text-xs text-blue-700 mt-1">两端部分作废，成本已抵消</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 暴跌：收于 $90k</p>
            <p class="text-xs text-red-700 mt-1">被行权接盘，存在浮亏</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
            <li>轻微看涨，预算有限，倾向低成本表达</li>
            <li>价格预计在安全区间内</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>可能出现暴跌（下方风险较大）</li>
            <li>不愿潜在接盘</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>下方风险</strong>：被行权接盘，暴跌时浮亏</li>
          <li><strong>Vega 风险</strong>：IV 下降时权利金性价比下降</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>区间设计</strong>：Put 设在支撑位下 5–10%，Call 设在阻力位上 5–10%</li>
          <li><strong>权利金目标</strong>：以抵消买 Call 为目标，尽量净收</li>
        </ul>
      </div>
    `,
    pros: [
      '低成本或净收的方向表达，适合轻微看涨。',
      '结构简单，易于上手。'
    ],
    cons: [
      '下方风险较大，可能被行权接盘。'
    ]
  }
};

export default seagull;
