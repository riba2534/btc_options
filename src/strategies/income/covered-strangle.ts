import { Strategy, StrategyCategory } from '@/types';

const coveredStrangle: Strategy = {
  id: 'covered-strangle',
  name: '备兑宽跨式 (Covered Strangle)',
  category: StrategyCategory.INCOME,
  description: '持币 + 卖 OTM Call + 卖 OTM Put，扩大收租区间。',
  setup: '持有现货 + 卖 OTM Call + 卖 OTM Put',
  riskProfile: '下方风险同持币，上方收益封顶；收权利金更高。',
  idealScenario: '宽区间震荡，偏中性。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
        <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-indigo-800 text-sm">Covered Strangle 将 Covered Call 扩展为双端收租（再卖 Put），在宽区间内提升现金流，但下方风险更大。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 持有 1 BTC 现货</p>
            <p class="text-sm text-slate-700">例：$100k</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 $110k Call（收 $2k）+ 卖 $90k Put（收 $2k）</p>
            <p class="text-sm text-slate-700">宽区间收租</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>总净收入</strong> ≈ $4k</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">$4k + 现货上涨</div>
          <p class="text-xs text-slate-600">上方被 $110k 封顶</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">最大风险</div>
          <div class="text-2xl font-bold text-red-700 mb-2">同持币 + 被 Put 行权接盘</div>
          <p class="text-xs text-slate-600">暴跌时风险更大</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">盈利区间</div>
          <div class="text-lg font-bold text-blue-700 mb-2">$90k–$110k</div>
          <p class="text-xs text-slate-600">宽区间震荡最优</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，宽区间震荡</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收敛于 $95k–$105k</p>
            <p class="text-xs text-green-700 mt-1">两端作废，保留 $4k + 现货上涨收益</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 接近边界：$90k 或 $110k</p>
            <p class="text-xs text-yellow-700 mt-1">波动加剧，留意滚动与对冲</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 突破边界：$85k 或 $115k+</p>
            <p class="text-xs text-red-700 mt-1">下方接盘或上方卖飞</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
            <li>长期持币者，偏中性震荡行情</li>
            <li>希望更高现金流</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>预期暴跌或强趋势上涨</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>下方风险</strong>：被行权接盘，暴跌时浮亏更大</li>
          <li><strong>执行复杂度</strong>：双端同时管理与滚动</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>行权价选择</strong>：上下各 8–12%，对齐支撑与阻力</li>
          <li><strong>滚动节奏</strong>：接近边界时及时滚动，保持安全区</li>
        </ul>
      </div>
    `,
    pros: [
      '现金流更高，扩大收租区间。',
      '适合长期持币的中性策略。'
    ],
    cons: [
      '下方风险增加，执行管理更复杂。'
    ]
  }
};

export default coveredStrangle;
