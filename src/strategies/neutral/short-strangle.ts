import { Strategy, StrategyCategory } from '@/types';

const shortStrangle: Strategy = {
  id: 'short-strangle',
  name: '卖出宽跨式 (Short Strangle)',
  category: StrategyCategory.NEUTRAL,
  description: '卖出OTM Call和Put。比跨式安全一点，容错空间更大。',
  setup: '卖出 OTM Call + 卖出 OTM Put',
  riskProfile: '收益有限，风险无限。',
  idealScenario: 'BTC在一定区间内震荡。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">卖出宽跨式 (Short Strangle) 是 Short Straddle 的稳健版本。卖出 OTM Call + OTM Put，扩大盈利区间，牺牲部分权利金，降低被突破的概率。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <p class="font-bold text-cyan-700 mb-2">📉 卖出 OTM Put</p>
              <p class="text-sm text-slate-700">例：卖 $90k Put，收 $2k</p>
            </div>
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 卖出 OTM Call</p>
              <p class="text-sm text-slate-700">例：卖 $110k Call，收 $2k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入</strong> = $4k（比跨式少，但区间更宽）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$4k</div>
            <p class="text-xs text-slate-600">价格在 $90k–$110k 区间内</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">突破上下界后单边风险无限</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">上下两点</div>
            <p class="text-xs text-slate-600">下：$90k − $4k；上：$110k + $4k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预计区间震荡</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 区间内：$95k–$105k</p>
              <p class="text-xs text-green-700 mt-1">两腿作废，保留 $4k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 接近边界：$90k/$110k</p>
              <p class="text-xs text-yellow-700 mt-1">剩余时间价值与波动率可能带来波动</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 突破区间：涨到 $120k 或跌到 $85k</p>
              <p class="text-xs text-red-700 mt-1">风险单边放大，需及时风控</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>较宽的震荡区间、阻力支撑明确</li>
              <li>IV 高位但预计回落</li>
              <li>具备动态对冲能力</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>可能出现趋势行情或事件驱动的突破</li>
              <li>不愿承担尾部风险</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>尾部风险</strong>：突破区间后亏损无上限</li>
            <li><strong>Gamma 风险</strong>：接近边界与到期前极为敏感</li>
            <li><strong>Vega 风险</strong>：IV 上升时净卖方不利</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>边界设定</strong>：将上下行权价设在关键位外 8–12%</li>
            <li><strong>到期与滚动</strong>：短期更利于 Theta；靠近边界时滚动调整</li>
            <li><strong>提前平仓</strong>：收益达到 50–70% 时锁定利润</li>
          </ul>
        </div>
      `,
    pros: [
      '胜率提升：相比跨式策略，获利区间更宽，容错率更高。',
      '灵活性：可根据对支撑阻力的判断调整行权价。'
    ],
    cons: [
      '黑天鹅风险：若价格突破区间，风险依然是无限的，需严格止损。'
    ]
  }
};

export default shortStrangle;
