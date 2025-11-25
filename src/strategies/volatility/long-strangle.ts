import { Strategy, StrategyCategory } from '@/types';

const longStrangle: Strategy = {
  id: 'long-strangle',
  name: '买入宽跨式 (Long Strangle)',
  category: StrategyCategory.VOLATILITY,
  description: '买入OTM Call和Put。成本低，但需要更大波动。',
  setup: '买入 OTM Call + 买入 OTM Put',
  riskProfile: '风险有限，收益无限。',
  idealScenario: 'BTC发生超大幅度波动。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-5 rounded-lg mb-6">
          <p class="text-purple-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-purple-800 text-sm">宽跨式 (Long Strangle) 是低成本的做多波动率策略：买入 OTM Call + OTM Put。比 Straddle 更便宜，但需要更大的波动幅度才能盈利。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">📈 买入 OTM Call</p>
              <p class="text-sm text-slate-700">例：买 $110k Call，付 $2k</p>
            </div>
            <div class="bg-purple-50 p-4 rounded border border-purple-200">
              <p class="font-bold text-purple-700 mb-2">📉 买入 OTM Put</p>
              <p class="text-sm text-slate-700">例：买 $90k Put，付 $2k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总成本</strong> = $4k（低于 Straddle 的 $10k）</p>
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
            <div class="text-2xl font-bold text-red-700 mb-2">$4k</div>
            <p class="text-xs text-slate-600">横盘到期时两腿作废</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">两点</div>
            <p class="text-xs text-slate-600">上：$110k + $4k；下：$90k − $4k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期大波动但方向不明</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴涨：涨到 $120k</p>
              <p class="text-xs text-green-700 mt-1">Call 赚 ≈ $10k；总盈利 ≈ $6k（150%）</p>
            </div>
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴跌：跌到 $80k</p>
              <p class="text-xs text-green-700 mt-1">Put 赚 ≈ $10k；总盈利 ≈ $6k（150%）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 横盘：收于 $100k±</p>
              <p class="text-xs text-red-700 mt-1">亏损总成本 $4k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>预算有限但想博取大波动</li>
              <li>方向不明，做多波动率更合理</li>
              <li>IV 较低的窗口</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>长期横盘或波动率回落趋势</li>
              <li>IV 高位（买入端性价比差）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Theta</strong>：时间价值每天衰减</li>
            <li><strong>Vega</strong>：事件后 IV 暴跌可能压制期权价格</li>
            <li><strong>执行成本</strong>：注意两腿开平仓点差与滑点</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：上下行权价各离 8–12%</li>
            <li><strong>到期时间</strong>：7–30 天，兼顾事件驱动与 Theta</li>
            <li><strong>分批策略</strong>：行情单边发展时分批止盈</li>
          </ul>
        </div>
      `,
    pros: [
      '低成本博弈：适合资金量较小但想博取黑天鹅事件的投资者。'
    ],
    cons: [
      '低胜率：大部分时间内，虚值期权最终会归零。',
      '高波动要求：需要极端的市场波动才能覆盖成本并获利。'
    ]
  }
};

export default longStrangle;
