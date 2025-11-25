import { Strategy, StrategyCategory } from '@/types';

const shortStraddle: Strategy = {
  id: 'short-straddle',
  name: '卖出跨式 (Short Straddle)',
  category: StrategyCategory.NEUTRAL,
  description: '卖出ATM Call和Put。做空波动率，赌价格不动。',
  setup: '卖出 ATM Call + 卖出 ATM Put',
  riskProfile: '收益巨大 (双份权利金)，风险无限。',
  idealScenario: 'BTC价格死死钉在行权价。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">卖出跨式 (Short Straddle) 是最激进的做空波动率策略。卖出 ATM Call + ATM Put，收取双份权利金，赌价格将钉在行权价附近不动。收益高但尾部风险无限。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <p class="font-bold text-cyan-700 mb-2">📉 卖出 ATM Put</p>
              <p class="text-sm text-slate-700">例：卖出 $100k Put，收 $5k</p>
            </div>
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 卖出 ATM Call</p>
              <p class="text-sm text-slate-700">例：卖出 $100k Call，收 $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入</strong> = $10k（双份权利金）</p>
            <p class="text-xs text-slate-600">需要价格保持在中心行权价附近。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$10k</div>
            <p class="text-xs text-slate-600">价格 ≈ $100k 时两腿作废</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">向上或向下突破均可能无限亏损</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">上下两点</div>
            <p class="text-xs text-slate-600">$100k ± $10k（总权利金）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期一段时间内窄幅震荡</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 收敛：收于 $100k</p>
              <p class="text-xs text-green-700 mt-1">两腿作废，保留 $10k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 中等突破：涨至 $112k / 跌至 $88k</p>
              <p class="text-xs text-yellow-700 mt-1">越过平衡点后开始亏损</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 单边强趋势：涨到 $130k 或跌到 $75k</p>
              <p class="text-xs text-red-700 mt-1">风险极高，亏损无上限</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>盈利区间明确、波动率预计回落</li>
              <li>事件后“利好/利空出尽”的横盘期</li>
              <li>可动态对冲管理 Delta/Gamma</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>趋势行情或重大事件前</li>
              <li>无法进行动态对冲的账户</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Gamma 风险</strong>：临近到期，价格靠近中心时盈亏陡峭</li>
            <li><strong>Vega 风险</strong>：IV 上升时净卖方不利</li>
            <li><strong>无限风险</strong>：遇单边极端行情需动态对冲或快速止损</li>
          </ul>
        </div>

      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>选择到期</strong>：7–30 天更利于 Theta 收益</li>
          <li><strong>动态对冲</strong>：用现货/期货对冲偏离的 Delta</li>
          <li><strong>获利平仓</strong>：赚到 50–70% 权利金时提前落袋</li>
          <li><strong>到期建议</strong>：事件驱动 7–14 天；常规 14–30 天。临期 Gamma 较高，靠近中心需提前管理。</li>
        </ul>
      </div>
      `,
    pros: [
      '最大化权利金收入：ATM期权拥有最高的时间价值。',
      'Theta收益：时间衰减速度极快，对卖方非常有利。'
    ],
    cons: [
      '无限风险：一旦市场出现方向性突破（无论涨跌），亏损将迅速扩大且无上限。',
      '管理难度大：需要极强的风控能力和动态对冲技巧。'
    ]
  }
};

export default shortStraddle;
