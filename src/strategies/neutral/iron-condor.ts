import { Strategy, StrategyCategory } from '@/types';

const ironCondor: Strategy = {
  id: 'iron-condor',
  name: '铁鹰式 (Iron Condor)',
  category: StrategyCategory.NEUTRAL,
  description: '双侧卖出并用远翼保护的宽区间收租；有限风险、有限收益。',
  setup: '卖出 OTM Call/Put + 买入 深OTM Call/Put',
  riskProfile: '风险有限（翼宽−净收）；收益有限（净收）；Theta 正、Vega 负；四腿管理成本。',
  idealScenario: '宽区间震荡、IV 回落；支撑阻力明确。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">铁鹰 (Iron Condor) 通过同时卖出上下两侧的 OTM 期权，并用更远 OTM 期权做保护，构建“有限风险、有限收益”的宽区间收租策略，胜率较高。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
              <p class="font-bold text-cyan-700 mb-2">📉 下方：卖 $90k Put / 买 $85k Put</p>
              <p class="text-sm text-slate-700">净收 ≈ $1k（$2k − $1k）</p>
            </div>
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📈 上方：卖 $110k Call / 买 $115k Call</p>
              <p class="text-sm text-slate-700">净收 ≈ $1k（$2k − $1k）</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总净收入</strong> ≈ $2k；<strong>翼宽</strong> = $5k</p>
            <p class="text-xs text-slate-600">风险与收益均已锁定。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$2k</div>
            <p class="text-xs text-slate-600">价格介于 $90k–$110k 时实现</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$3k</div>
            <p class="text-xs text-slate-600">翼宽 $5k − 净收入 $2k = $3k</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">两侧各 1 点</div>
            <p class="text-xs text-slate-600">下：$90k − $2k；上：$110k + $2k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC 在 $90k–$110k 震荡</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 区间内收敛</p>
              <p class="text-xs text-green-700 mt-1">四腿作废，保留 $2k</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 接近边界：$88k 或 $112k</p>
              <p class="text-xs text-yellow-700 mt-1">可能产生小额亏损或波动，注意风控</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 突破：跌到 $85k / 涨到 $115k+</p>
              <p class="text-xs text-red-700 mt-1">边翼提供保护，最大亏损 $3k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>宽区间震荡、IV 高位回落预期</li>
              <li>希望锁定风险上限的净卖方策略</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>趋势行情或事件驱动的突破期</li>
              <li>不愿承担双侧管理与滚动成本</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Gamma 风险</strong>：接近边界与临期时盈亏曲率变陡</li>
            <li><strong>Vega 风险</strong>：IV 上升时净卖方不利</li>
            <li><strong>滑点成本</strong>：四腿结构，平仓与滚动存在滑点与费用</li>
          </ul>
        </div>

      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>翼宽设置</strong>：常用 5k–10k；翼越宽越安全但净收越低</li>
          <li><strong>到期选择</strong>：14–45 天兼顾 Theta 与管理成本</li>
          <li><strong>分批管理</strong>：价格靠近边界时滚动或对冲</li>
          <li><strong>到期建议</strong>：信用结构建议 30–45 天；临期 Gamma 增大，收益曲线陡峭，提前落袋降低尾部风险。</li>
        </ul>
      </div>
      `,
    pros: [
      '风险严格受控：最大亏损已知且有限，适合稳健型投资者。',
      '方向中性：无需预测市场方向，只需判断波动区间。'
    ],
    cons: [
      '收益折损：买入保护性期权支出了部分权利金，降低了潜在收益。',
      '交易成本：涉及四条腿的交易，佣金成本较高。'
    ]
  }
};

export default ironCondor;
