import { Strategy, StrategyCategory } from '@/types';

const brokenWingCall: Strategy = {
  id: 'broken-wing-butterfly-call',
  name: '断翼看涨蝶式 (Broken-Wing Butterfly – Call)',
  category: StrategyCategory.NEUTRAL,
  description: '不对称翼宽的蝶式，可实现更低成本甚至净收权利金。',
  setup: '买低 Call + 卖 2× 中 Call + 买更高 Call（不等距）',
  riskProfile: '风险有限，收益有限，死谷更宽。',
  idealScenario: '到期价格收敛在中间价附近但略向上。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.08, premiumRatio: 0.015 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">断翼蝶式通过不对称的翼宽减少成本或实现净收权利金，代价是中间死谷区域更宽，需主动管理。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-3"><strong>不对称翼宽（Call）</strong></p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 买 $95k Call + 买 $108k Call</p>
            <p class="text-sm text-slate-700">翼宽不等</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 2× $100k Call</p>
            <p class="text-sm text-slate-700">中心死谷更宽</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> ≈ 低廉（甚至净收入）</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">低翼宽 − 成本</div>
          <p class="text-xs text-slate-600">上翼更远，收益峰值略降</p>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div class="text-xs text-amber-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-amber-700 mb-2">有限</div>
          <p class="text-xs text-slate-600">风险封顶</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">死谷区域</div>
          <div class="text-lg font-bold text-blue-700 mb-2">更宽</div>
          <p class="text-xs text-slate-600">价格停在中心附近时亏损更集中</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，轻微看涨的中性博弈</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收于 $102k–$104k</p>
            <p class="text-xs text-green-700 mt-1">峰值附近盈利（低成本优势）</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 收于 $100k</p>
            <p class="text-xs text-yellow-700 mt-1">死谷较宽，亏损集中</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 大幅偏离：$95k 或 $110k+</p>
            <p class="text-xs text-red-700 mt-1">风险有限，亏损受控</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>轻微看涨的中性环境</li>
            <li>希望降低成本或实现净收权利金</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>中心点位不明确</li>
            <li>临期 Gamma 爆炸区难管理</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>死谷风险</strong>：中心附近亏损最大</li>
          <li><strong>Gamma 风险</strong>：临期曲率高，盈亏变化快</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>翼距优化</strong>：上翼更远以降低成本</li>
          <li><strong>止盈逻辑</strong>：接近峰值时分批落袋</li>
        </ul>
      </div>
    `,
    pros: [
      '成本更低甚至净收入，赔率仍可观。',
      '风险有限，易于管理上限。'
    ],
    cons: [
      '死谷更宽，对中心点位要求更高。'
    ]
  }
};

export default brokenWingCall;
