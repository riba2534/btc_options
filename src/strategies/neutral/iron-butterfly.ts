import { Strategy, StrategyCategory } from '@/types';

const ironButterfly: Strategy = {
  id: 'iron-butterfly',
  name: '铁蝶式 (Iron Butterfly)',
  category: StrategyCategory.NEUTRAL,
  description: '卖出跨式 + 买入保护。追求最大化权利金的有限风险策略。',
  setup: '卖出 ATM Call/Put + 买入 OTM Call/Put',
  riskProfile: '风险有限，收益较高 (相对铁鹰)。',
  idealScenario: 'BTC精准停留在现价。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.01 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.01 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">铁蝶 (Iron Butterfly) 以“中心卖出、两翼保护”最大化中心权利金收入，同时用外侧 OTM 期权限制尾部风险。适合价格准确停留在中心行权价附近的横盘环境。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 卖出 ATM Call + 卖出 ATM Put</p>
              <p class="text-sm text-slate-700">例：卖 $100k Call（收 $4k） + 卖 $100k Put（收 $4k）</p>
            </div>
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <p class="font-bold text-cyan-700 mb-2">🛡️ 买入 OTM Call + 买入 OTM Put</p>
              <p class="text-sm text-slate-700">例：买 $110k Call（付 $1k） + 买 $90k Put（付 $1k）</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入</strong> = $8k − $2k = <strong>$6k</strong></p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$6k</div>
            <p class="text-xs text-slate-600">价格 ≈ $100k 时达到</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$4k</div>
            <p class="text-xs text-slate-600">翼宽 $10k − 净收 $6k = $4k</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">中心两侧各 1 点</div>
            <p class="text-xs text-slate-600">下：$100k − $6k；上：$100k + $6k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预计收敛于中心</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 收敛：收于 $100k</p>
              <p class="text-xs text-green-700 mt-1">获最大收益 $6k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 偏离：收于 $92k / $108k</p>
              <p class="text-xs text-yellow-700 mt-1">接近两侧盈亏平衡点，收益降低</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 突破：收于 $88k / $112k+</p>
              <p class="text-xs text-red-700 mt-1">风险被两翼限制，最大亏损 $4k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>价格预计精确收敛至某中心行权价</li>
              <li>想提高净权利金收入并控制尾部风险</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>方向性突破概率较高</li>
              <li>无法承受中心位置的点位要求</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>中心精度</strong>：需要更精准的中心点位判断</li>
            <li><strong>Gamma 风险</strong>：中心附近临期曲率高，盈亏变化快</li>
            <li><strong>滑点与成本</strong>：四腿结构的滚动与平仓成本较高</li>
          </ul>
        </div>

      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>中心选择</strong>：参考“最大痛点”与密集成交区</li>
          <li><strong>翼宽规划</strong>：翼宽越大越安全，但净收越低，权衡取舍</li>
          <li><strong>提前落袋</strong>：当两个中心腿剩余时间价值不多时，提前平仓锁利</li>
          <li><strong>到期建议</strong>：信用结构建议 30–45 天；临期曲率增大，价格接近中心时提前管理。</li>
        </ul>
      </div>
      `,
    pros: [
      '高收益潜力：核心部位为ATM期权，权利金收入丰厚。',
      '风险受控：两翼的保护腿锁定了极端行情的亏损上限。'
    ],
    cons: [
      '获利难度：需要价格在到期时非常接近中心行权价，对点位要求较高。'
    ]
  }
};

export default ironButterfly;
