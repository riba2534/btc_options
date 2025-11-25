import { Strategy, StrategyCategory } from '@/types';

const shortGuts: Strategy = {
  id: 'short-guts',
  name: '卖出内陷宽跨式 (Short Guts)',
  category: StrategyCategory.NEUTRAL,
  description: '卖出ITM Call和ITM Put。极度激进的做空波动率。',
  setup: '卖出 ITM Call + 卖出 ITM Put',
  riskProfile: '收益巨大，风险无限。',
  idealScenario: 'BTC价格回归到两行权价中间。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.08 },
    { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.08 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">卖出内陷宽跨式 (Short Guts) 同时卖出深实值的 Call 与 Put，最大化权利金收入，赌价格回归两行权价之间。做空波动率强烈，风险与管理难度极高。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 卖 ITM Call</p>
              <p class="text-sm text-slate-700">例：卖 $95k Call，收 $8k</p>
            </div>
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <p class="font-bold text-cyan-700 mb-2">📉 卖 ITM Put</p>
              <p class="text-sm text-slate-700">例：卖 $105k Put，收 $8k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总净收入</strong> ≈ $16k</p>
            <p class="text-xs text-slate-600">回归中心区间即可获利，但尾部风险巨大。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$16k</div>
            <p class="text-xs text-slate-600">价格落在两行权价之间</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">任意一侧趋势突破均可能无限亏损</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡区</div>
            <div class="text-lg font-bold text-blue-700 mb-2">靠近两行权价的窄区</div>
            <p class="text-xs text-slate-600">偏离增大即快速亏损</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，押注中间回归</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 收敛：$97k–$103k</p>
              <p class="text-xs text-green-700 mt-1">两腿作废，保留 $16k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 接近边界：$95k / $105k</p>
              <p class="text-xs text-yellow-700 mt-1">临期盈亏变化更敏感，注意对冲</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 趋势突破：$110k 或 $90k</p>
              <p class="text-xs text-red-700 mt-1">风险单边放大，需快速止损或对冲</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>极低波动率、价格回归中枢概率高</li>
              <li>具备强动态对冲与风控能力</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>趋势或事件驱动的行情</li>
              <li>无法承受无限风险的账户</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Gamma 风险</strong>：临期两侧曲率极高，盈亏剧烈</li>
            <li><strong>Vega 风险</strong>：IV 上升时净卖方不利</li>
            <li><strong>提前行权</strong>：实值腿可能面临提前行权（视规则）</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>避免临期</strong>：优先 14–30 天，降低 Gamma 爆炸</li>
            <li><strong>动态对冲</strong>：用期货/现货快速对冲偏离的 Delta</li>
            <li><strong>分批落袋</strong>：收敛时分批平仓，避免尾部反扑</li>
          </ul>
        </div>
      `,
    pros: [
      '巨额权利金：收取的权利金远高于其他中性策略。'
    ],
    cons: [
      '流动性风险：深实值期权通常流动性较差，点差较大。',
      '极高风险：任何大幅波动都可能导致巨额亏损，且提前被行权的风险较高。'
    ]
  }
};

export default shortGuts;
