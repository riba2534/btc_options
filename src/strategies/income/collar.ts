import { Strategy, StrategyCategory } from '@/types';

const collar: Strategy = {
  id: 'collar',
  name: '领口策略 (Collar)',
  category: StrategyCategory.INCOME,
  description: '持币 + 买Put保险 + 卖Call回血。低成本对冲。',
  setup: '持有现货 + 买入 Put + 卖出 Call',
  riskProfile: '风险有限，收益有限。',
  idealScenario: '担心下跌，但觉得也不会大涨。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-indigo-800 text-sm">领口策略 (Collar) = 持币 + 买 Put 保护 + 卖 Call 回血。以放弃部分上行来换取低成本甚至零成本的下行保护，构建“保底封顶”的安全区间。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 持有现货</p>
              <p class="text-sm text-slate-700">例：持 1 BTC（$100k）</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">🛡️ 买 Put + 📉 卖 Call</p>
              <p class="text-sm text-slate-700">例：买 $90k Put（付 $2k）、卖 $110k Call（收 $2k）</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> ≈ $0（Zero-Cost Collar）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">(现货价 − Put) + 净成本</div>
            <p class="text-xs text-slate-600">例：($100k − $90k) + $0 = <strong>$10k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">(Call − 现货) − 净成本</div>
            <p class="text-xs text-slate-600">例：($110k − $100k) − $0 = <strong>$10k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈利区间</div>
            <div class="text-lg font-bold text-blue-700 mb-2">[$90k, $110k]</div>
            <p class="text-xs text-slate-600">区间外由两翼规则接管</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，搭建零成本 Collar</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 区间内：$95k–$108k</p>
              <p class="text-xs text-green-700 mt-1">持币收益与权利金抵扣相互作用，稳健</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 上涨至 $120k</p>
              <p class="text-xs text-blue-700 mt-1">被行权于 $110k 卖出，上行收益封顶 $10k</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 下跌至 $80k</p>
              <p class="text-xs text-red-700 mt-1">行使 Put 锁定损失 $10k，避免更深亏损</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>中段行情：担心下跌但不预期暴涨</li>
              <li>希望低成本获得有效保护</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>对上行空间高度依赖的策略</li>
              <li>不愿被上方 Call 封顶</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>错过上行</strong>：价格大涨时超额收益被截断</li>
            <li><strong>执行细节</strong>：到期前滚动影响净成本与区间</li>
            <li><strong>IV 变化</strong>：IV 高低影响 Put 与 Call 的成本与收入</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>零成本目标</strong>：优先构建净成本≈0 的组合</li>
            <li><strong>区间选择</strong>：Put 下方 8–12%，Call 上方 8–12%</li>
            <li><strong>滚动管理</strong>：价格靠近边界时滚动调整行权价与到期</li>
          </ul>
        </div>
      `,
    pros: [
      '低成本对冲：以放弃部分潜在上涨收益为代价，获得免费的下行保护。',
      '资产保值：非常适合在不确定性较高的市场环境中保护本金。'
    ],
    cons: [
      '收益封顶：若市场大涨，超额收益将被Call端截断。'
    ]
  }
};

export default collar;
