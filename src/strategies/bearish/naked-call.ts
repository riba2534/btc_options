import { Strategy, StrategyCategory } from '@/types';

const nakedCall: Strategy = {
  id: 'naked-call',
  name: '裸卖看涨 (Naked Call)',
  category: StrategyCategory.BEARISH,
  description: '直接卖出Call。风险极高。',
  setup: '卖出 Call',
  riskProfile: '收益有限，风险无限。',
  idealScenario: '坚决看跌或横盘。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">裸卖看涨 (Naked Call) 在无现货保护的情况下直接卖出 Call，建仓即收取权利金。若价格暴涨突破行权价，潜在亏损理论上无限，是极度危险的净卖方策略。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="bg-rose-50 p-4 rounded border border-rose-200">
            <p class="font-bold text-rose-700 mb-2">📉 卖出 OTM Call</p>
            <p class="text-sm text-slate-700">例：卖出 $110k Call，收 $2k</p>
          </div>
          <div class="bg-amber-50 p-4 rounded mt-3 border border-amber-200">
            <p class="text-sm text-amber-900 mb-2"><strong>⚠️ 保证金与风控</strong></p>
            <p class="text-xs text-amber-800">需较高保证金；若价格逼近行权价，保证金要求可能显著上升。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">权利金</div>
            <p class="text-xs text-slate-600">价格 ≤ 行权价时全部保留</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">价格可无限上涨，亏损无上限</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">Strike + Premium</div>
            <p class="text-xs text-slate-600">行权价 + 权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，看不涨</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 收敛或下跌：收于 $100k</p>
              <p class="text-xs text-green-700 mt-1">Call 作废，保留 $2k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 小幅上涨：涨至 $112k</p>
              <p class="text-xs text-yellow-700 mt-1">亏损 ≈ ($112k − $110k) − $2k = $0，接近平衡</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 暴涨：涨到 $130k</p>
              <p class="text-xs text-red-700 mt-1">亏损 ≈ $20k − $2k = <strong>$18k</strong>，风险巨大</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>明确看不涨、顶部压力强</li>
              <li>短期波动率高，权利金充足</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>任何可能剧烈上涨的环境（风险无法承受）</li>
              <li>保证金不足、风控能力有限</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>无限风险</strong>：理论上亏损无上限，需极度谨慎</li>
            <li><strong>Gamma 风险</strong>：临近到期，价格接近行权价时盈亏剧烈</li>
            <li><strong>保证金风险</strong>：上涨时保证金占用激增，可能被动平仓</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>优先 Covered Call</strong>：有现货时用备兑看涨替代裸卖</li>
            <li><strong>行权价远离</strong>：选择更远 OTM（如 +15%），降低被行权概率</li>
            <li><strong>严格止损</strong>：突破关键阻力位后及时平仓或滚动</li>
          </ul>
        </div>
      `,
    pros: [
      '高胜率：在大概率的横盘或下跌行情中均可获利。'
    ],
    cons: [
      '毁灭性风险：一次极端的暴涨行情可能导致账户穿仓甚至破产。',
      '高保证金要求：交易所通常要求极高的维持保证金，资金利用率低。'
    ]
  }
};

export default nakedCall;
