import { Strategy, StrategyCategory } from '@/types';

const boxSpread: Strategy = {
  id: 'box-spread',
  name: '盒式组合 (Box Spread)',
  category: StrategyCategory.NEUTRAL,
  description: '理论套利结构：Bull Call Spread + Bear Put Spread 的组合。',
  setup: '买低 Call + 卖高 Call + 卖低 Put + 买高 Put（同价差）',
  riskProfile: '理论上风险与收益均锁定（更多偏套利教育）。',
  idealScenario: '价差与权利金错价可获套利空间。',
  legs: [
    // 设置权利金使净成本 ≈ 价差（$105k−$95k = $10k），到期盈亏 ≈ 0
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06 }, // 6k
    { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.02 }, // -2k
    { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.06 }, // -6k
    { type: 'Put', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.02 }  // 2k
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Box Spread 用看涨价差与看跌价差组合，理论上锁定价差，偏套利教育用途。实际需严控费用与滑点。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-2">买 $95k Call（付 $6k） + 卖 $105k Call（收 $2k）</p>
        <p class="text-slate-700 mb-2">卖 $95k Put（收 $6k） + 买 $105k Put（付 $2k）</p>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>到期盈亏</strong>：理论上为常数 <em>价差 − 净成本</em>。示例中设置净成本 ≈ 价差（$10k），因此到期盈亏 ≈ $0。</p>
          <p class="text-xs text-slate-500">若实际净成本小于价差，则到期固定获利；反之为固定亏损。现实执行需考虑资金利率、费用与滑点。</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">理论收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">锁定价差</div>
          <p class="text-xs text-slate-600">偏套利结构</p>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div class="text-xs text-amber-600 font-bold mb-1">实际风险</div>
          <div class="text-2xl font-bold text-amber-700 mb-2">费用与滑点</div>
          <p class="text-xs text-slate-600">现实世界中的执行成本</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">关键因素</div>
          <div class="text-lg font-bold text-blue-700 mb-2">流动性/点差</div>
          <p class="text-xs text-slate-600">对成交质量要求极高</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：理论锁定 $10k 价差</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 执行良好</p>
            <p class="text-xs text-green-700 mt-1">成交接近理论价格，锁定价差</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 中性</p>
            <p class="text-xs text-yellow-700 mt-1">点差/费用抵消部分收益</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 执行不佳</p>
            <p class="text-xs text-red-700 mt-1">滑点/费用过高导致无利可图</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>点差与费用极低的高流动性市场</li>
            <li>对执行质量有把握的专业交易者</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>点差大、费用高的市场</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>现实执行风险</strong>：理论与实际存在差距</li>
          <li><strong>费用与滑点</strong>：可能吞噬掉全部理论收益</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>严格评估</strong>：仅在极佳成交环境下尝试</li>
          <li><strong>教育用途</strong>：更适合作为教学示例而非实盘常用策略</li>
        </ul>
      </div>
    `,
    pros: [
      '理论上可锁定价差，具备套利教学意义。'
    ],
    cons: [
      '现实世界中费用与滑点可能使策略无利可图。'
    ]
  }
};

export default boxSpread;
