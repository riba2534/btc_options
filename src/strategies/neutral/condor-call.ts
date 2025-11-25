import { Strategy, StrategyCategory } from '@/types';

const condorCall: Strategy = {
  id: 'condor-call',
  name: '买入看涨康多 (Long Call Condor)',
  category: StrategyCategory.NEUTRAL,
  description: '全 Call 的四腿借记价差，博中间区间的精确收敛。',
  setup: '买低 Call + 卖中 Call ×2 + 买高 Call（等距）',
  riskProfile: '风险有限（净成本），收益有限（翼宽 − 成本）。',
  idealScenario: '到期价格精确落在中间区间。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Call Condor 借记结构以低成本博取到期价格对中间行权价的精确收敛，赔率高但胜率不一定高。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-3"><strong>等距四腿（Call）</strong></p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 买 $95k Call + 买 $105k Call</p>
            <p class="text-sm text-slate-700">翼宽 = $5k</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 2× $100k Call</p>
            <p class="text-sm text-slate-700">中间价</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> ≈ $1k</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">翼宽 − 成本</div>
          <p class="text-xs text-slate-600">$5k − $1k = <strong>$4k</strong></p>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div class="text-xs text-amber-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-amber-700 mb-2">$1k</div>
          <p class="text-xs text-slate-600">净成本</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">盈利区间</div>
          <div class="text-lg font-bold text-blue-700 mb-2">窄区间</div>
          <p class="text-xs text-slate-600">围绕中间价的窄区间</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预计回归 $100k</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收于 $100k</p>
            <p class="text-xs text-green-700 mt-1">最大收益 $4k</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 收于 $97k 或 $103k</p>
            <p class="text-xs text-yellow-700 mt-1">仍盈利但少于峰值</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 收于 $95k 以下或 $105k 以上</p>
            <p class="text-xs text-red-700 mt-1">亏损净成本 $1k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>对中心点位有较强信心</li>
            <li>希望以小成本博高赔率</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>极端波动或趋势行情</li>
            <li>对中心点位缺乏判断</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>中心精度</strong>：偏离中间价时收益迅速下降</li>
          <li><strong>Gamma 风险</strong>：靠近中心价的曲率变化导致盈亏敏感</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>翼宽选择</strong>：5–10%，翼越宽峰值越缓但容错更高</li>
          <li><strong>到期规划</strong>：14–30 天，临期峰值更尖锐</li>
        </ul>
      </div>
    `,
    pros: [
      '低成本博取高赔率的中性精确点位。',
      '风险有限且易于估计。'
    ],
    cons: [
      '对中心点位要求高，胜率不一定高。'
    ]
  }
};

export default condorCall;
