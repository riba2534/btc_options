import { Strategy, StrategyCategory } from '@/types';

const longStraddle: Strategy = {
  id: 'long-straddle',
  name: '买入跨式 (Long Straddle)',
  category: StrategyCategory.VOLATILITY,
  description: '买入ATM Call和Put。赌大变盘，方向不限。',
  setup: '买入 Call + 买入 Put (同Strike)',
  riskProfile: '风险有限 (权利金)，收益无限。',
  idealScenario: 'BTC发生剧烈暴涨或暴跌。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-5 rounded-lg mb-6">
          <p class="text-purple-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-purple-800 text-sm">跨式组合 (Long Straddle) 做多波动率且方向中性：同时买入 ATM Call + ATM Put。无论暴涨或暴跌，总有一边大赚；唯一敌人是横盘与 IV 下跌。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">📈 买入 ATM Call</p>
              <p class="text-sm text-slate-700">例：买 $100k Call，付 $5k</p>
            </div>
            <div class="bg-purple-50 p-4 rounded border border-purple-200">
              <p class="font-bold text-purple-700 mb-2">📉 买入 ATM Put</p>
              <p class="text-sm text-slate-700">例：买 $100k Put，付 $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总成本</strong> = $10k（做多波动率）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">单边极端行情收益巨大</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$10k</div>
            <p class="text-xs text-slate-600">横盘到期时两腿作废</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">两点：Strike ± 总成本</div>
            <p class="text-xs text-slate-600">$100k ± $10k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：重大事件前夜（不确定方向）</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴涨：涨到 $120k</p>
              <p class="text-xs text-green-700 mt-1">Call 赚 ≈ $20k；总盈利 ≈ $10k（100%）</p>
            </div>
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴跌：跌到 $80k</p>
              <p class="text-xs text-green-700 mt-1">Put 赚 ≈ $20k；总盈利 ≈ $10k（100%）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 横盘：收于 $102k</p>
              <p class="text-xs text-red-700 mt-1">两腿几乎作废，亏损 ≈ $10k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>重大事件（利率、监管、ETF、减半）</li>
              <li>方向不确定但预期大幅波动</li>
              <li>IV 较低、买入端性价比更好</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>长期横盘环境（Theta 损耗巨大）</li>
              <li>IV 高位（买入成本过高）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Theta 损耗</strong>：双腿每天损失时间价值</li>
            <li><strong>Vega Crush</strong>：事件后 IV 暴跌可能压制价格</li>
            <li><strong>点差与流动性</strong>：注意两腿开平仓成本与滑点</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>到期选择</strong>：事件前 7–30 天，避免过早被 Theta 吃掉</li>
            <li><strong>分批管理</strong>：单边走强时分批止盈，另一边作废</li>
            <li><strong>IV 评估</strong>：IV 处于历史低位更适合建仓</li>
          </ul>
        </div>
      `,
    pros: [
      '方向中性：无需预测涨跌方向，只需确认会有大行情。',
      '收益无限：若出现单边极端行情，收益潜力巨大。'
    ],
    cons: [
      '高昂成本：购买两份ATM期权，权利金支出很高。',
      'Theta损耗：时间价值每天双倍流逝，若行情震荡，亏损速度极快。'
    ]
  }
};

export default longStraddle;
