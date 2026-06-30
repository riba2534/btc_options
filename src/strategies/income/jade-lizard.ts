import { Strategy, StrategyCategory } from '@/types';

const jadeLizard: Strategy = {
  id: 'jade-lizard',
  name: '翡翠蜥蜴 (Jade Lizard)',
  category: StrategyCategory.INCOME,
  description: '卖 Put + 卖 Call 价差（无上方风险），净收权利金。',
  setup: '卖 OTM Put + 卖 OTM Call + 买 更高 OTM Call',
  riskProfile: '下方风险较大（暴跌按 Put 行权价接盘，最大亏损约 $90k），上方无风险，收益为净权利金。',
  idealScenario: '价格不上破上方、且不大幅下破下方。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.03 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.03 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.01 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
        <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-indigo-800 text-sm">Jade Lizard 通过组合使上方无风险（Call 价差封顶），下方风险由卖 Put 承担；建仓收取较高净权利金。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📉 卖 $95k Put（收 $3k）</p>
            <p class="text-sm text-slate-700">下方风险由 Put 承担</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📈 卖 $105k Call（收 $3k）+ 买 $110k Call（付 $1k）</p>
            <p class="text-sm text-slate-700">上方无风险（价差封顶）</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净收入</strong> = $3k + $3k − $1k = <strong>$5k</strong></p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">$5k</div>
          <p class="text-xs text-slate-600">价格在 $95k–$105k 之间</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">下方风险</div>
          <div class="text-2xl font-bold text-red-700 mb-2">较大</div>
          <p class="text-xs text-slate-600">暴跌时按现金差额结算（经济效果≈按 $95k 接盘），存在浮亏</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">上方风险</div>
          <div class="text-lg font-bold text-blue-700 mb-2">无</div>
          <p class="text-xs text-slate-600">Call 价差封顶了上行风险</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，偏中性至轻微看涨</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收敛：$98k–$104k</p>
            <p class="text-xs text-green-700 mt-1">两端作废，保留 $5k</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 下探 $92k</p>
            <p class="text-xs text-yellow-700 mt-1">按现金差额结算（经济效果≈按 $95k 接盘），浮亏但有 $5k 缓冲</p>
          </div>
          <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p class="text-sm font-bold text-blue-800">ℹ️ 上涨 $110k</p>
            <p class="text-xs text-blue-700 mt-1">Call 价差封顶，无上方风险</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
            <li>中性至轻微看涨，不预期强趋势</li>
            <li>希望收较高权利金且上方无风险</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>可能出现暴跌（下方风险较大）</li>
            <li>不愿意潜在接盘</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>下方风险</strong>：暴跌时按现金差额结算（经济效果≈按 Put 行权价接盘），面临浮亏</li>
          <li><strong>Vega 风险</strong>：IV 下降不利于收权利金的性价比</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>权利金目标</strong>：收取权利金 ≥ Call 价差宽度，确保上方无风险</li>
          <li><strong>行权价选择</strong>：Put 设在支撑位下方 5–10%；Call 价差设在阻力位附近</li>
        </ul>
      </div>
    `,
    pros: [
      '上方无风险，净收权利金高。',
      '适合中性至轻微看涨的环境。'
    ],
    cons: [
      '下方风险较大，暴跌时可能被行权接盘。',
      '上方收益已封顶为净权利金 $5k，无法享受趋势上涨。'
    ]
  },
  plainSummary: '一上来先收一笔钱，赌 BTC 不暴跌：只要它不跌破下方，涨再高你都不亏，这笔钱就稳稳到手；但真要暴跌，你得按约定的低价接盘、扛浮亏。',
  analogy: {
    emoji: '🏪',
    title: '收两份押金，只怕跌价',
    text: '好比开店收了两份押金：一份是答应「东西跌到便宜价就照单全收」——这是你唯一真正的风险；另一份是跟人打赌「不会暴涨」，但你顺手给这个赌约上了封顶保险，所以涨多高你都只输固定的那点、还净赚押金。只要价格不暴跌，两份押金都归你。',
  },
  pitfalls: [
    '以为「上方无风险」就等于整体稳赚——下方暴跌时要按 Put 行权价接盘，亏损可以很大，$5k 权利金只是杯水车薪。',
    '收的总权利金没盖过 Call 价差宽度——一旦权利金 < 价差宽度，上方就不再无风险，大涨照样亏，等于丢了本策略的灵魂。',
    'Put 行权价设得离现价太近——接盘概率大增；支撑位还没站稳就建仓，很容易直接被套。',
  ],
  quickJudge: {
    use: '中性偏多、愿低位接币',
    avoid: '预期暴跌、不愿接盘',
  },
  greeks: {
    delta: '+',
    gamma: '−',
    theta: '+',
    vega: '−',
  },
  cryptoNote: 'Deribit/OKX 的 BTC 期权是欧式+现金交割：到期 ITM 只结算现金差额、不会自动帮你接币，所谓「按 $95k 接盘」只是经济效果≈接盘，想真正持币得手动去现货补一笔。同时卖方要占用保证金、到期前就可能被增量强平：即便现货没动，只要 IV 单独飙升也会推高空头 mark price 触发追保；币本位下暴跌还会「浮亏+抵押品缩水」双杀。务必仓位小、保证金留足缓冲。',
};

export default jadeLizard;
