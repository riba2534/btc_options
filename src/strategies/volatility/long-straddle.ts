import { Strategy, StrategyCategory } from '@/types';

const longStraddle: Strategy = {
  id: 'long-straddle',
  name: '买入跨式 (Long Straddle)',
  category: StrategyCategory.VOLATILITY,
  description: '同时买入 ATM Call/Put 做多波动率；方向中性。',
  setup: '买入 Call + 买入 Put (同Strike)',
  riskProfile: '风险有限（总权利金）；收益无限；Theta 负、Vega 正；对单边大行情与 IV 上升敏感。',
  idealScenario: '临近重大事件、方向不明但预期大幅波动；IV 低位更优。',
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
          <p class="font-bold text-slate-900 mb-3">案例：BTC ETF批准前夜，价格$100k，预期大幅波动</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景1：ETF批准，暴涨至$120k</p>
              <p class="text-xs text-green-700 mt-1">Call价值 ≈ $20k，Put作废；总盈利 ≈ $10k（100%回报）</p>
            </div>
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景2：ETF否决，暴跌至$80k</p>
              <p class="text-xs text-green-700 mt-1">Put价值 ≈ $20k，Call作废；总盈利 ≈ $10k（100%回报）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 场景3：消息平淡，横盘收于$102k</p>
              <p class="text-xs text-red-700 mt-1">Call 仍保留 $2k 内在价值，仅 Put 全损；净亏 ≈ $8k（约 80% 损失，仍处 $90k–$110k 盈亏平衡区间内）</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 场景4：小幅波动至$108k</p>
              <p class="text-xs text-yellow-700 mt-1">Call 内在价值 $8k（扣权利金后净赚 $3k），Put 全损 $5k，净亏 ≈ $2k（仍需涨破 $110k 盈亏平衡点才能盈利）</p>
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
  },
  plainSummary: '赌 BTC 接下来要剧烈波动，但不赌方向——无论它狠狠涨还是狠狠跌，你都能赚；最怕的是它原地不动，那两边买的钱就白花了。',
  analogy: {
    emoji: '🎲',
    title: '押"会出大事，但不知是好是坏"',
    text: '像赌一场比赛会爆冷，但不押哪一队赢。只要最后分差够大，你就赢；要是平淡收场（横盘没行情），你押在两边的钱就都打了水漂。'
  },
  pitfalls: [
    '以为"只要价格动起来就赚"——其实要涨破 $110k 或跌破 $90k、越过盈亏平衡点才真盈利，小打小闹的波动照样亏钱。',
    '等大消息公布后才追进场——那时 IV 已被炒到最高、权利金最贵，事件一落地 IV 暴跌（Vega Crush），方向就算猜对也可能不赚反亏。',
    '买了就死扛到到期——两条腿的时间价值每天双倍流逝，横盘拖得越久亏得越快，单边走出大行情后该止盈就果断止盈。'
  ],
  quickJudge: {
    use: '重大事件前、预期暴动、IV 低位',
    avoid: '长期横盘、IV 高位、临近到期'
  },
  greeks: {
    delta: '≈0',
    gamma: '+(强)',
    theta: '−(强)',
    vega: '+(强)'
  }
};

export default longStraddle;
