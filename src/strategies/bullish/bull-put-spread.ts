import { Strategy, StrategyCategory } from '@/types';

const bullPutSpread: Strategy = {
  id: 'bull-put-spread',
  name: '牛市看跌价差 (Bull Put Spread)',
  category: StrategyCategory.BULLISH,
  description: '卖出高价Put，买入低价Put保护。一种“收租”式的看涨策略。',
  setup: '卖出 Put A + 买入 Put B (Strike A > B)',
  riskProfile: '风险有限 (价差 - 权利金)，收益有限 (净权利金)。',
  idealScenario: 'BTC上涨或横盘 (不跌破卖出价)。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.03 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">牛市看跌价差 (Bull Put Spread) 是一种<strong>信用价差 (Credit Spread)</strong> 策略。你在建仓时收钱，目标是让期权自然过期作废，从而保留全部权利金。这是一种"收租"式的看涨策略，适合不跌即赚的心态。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出腿（主力）</p>
              <p class="text-sm text-slate-700">卖出1份较高行权价的 Put</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出 $95k Put，收取 $3k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入腿（保护）</p>
              <p class="text-sm text-slate-700">买入1份较低行权价的 Put</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 $85k Put，支付 $1k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入（Net Credit）</strong> = $3k - $1k = $2k</p>
            <p class="text-xs text-slate-600">这是你立即收到的现金，也是策略的最大潜在收益。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">$2k</div>
            <p class="text-xs text-slate-600">净权利金。BTC ≥ $95k 时全部保留</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$8k</div>
            <p class="text-xs text-slate-600">($95k-$85k)-$2k。BTC ≤ $85k 时触发</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$93k</div>
            <p class="text-xs text-slate-600">卖出价 - 净权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC现价 $100k，看不跌</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出1份 $95k Put（OTM 虚值），收 $3,000</li>
              <li>买入1份 $85k Put（更虚值），付 $1,000</li>
              <li>净收入 $2,000，立即到账</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景1：BTC涨到或维持在 $100k+</p>
              <p class="text-xs text-green-700 mt-1">两个Put都作废，保留全部 $2,000 权利金（100%收益率）。期权不用行权，省心省事。</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 场景2：BTC微跌到 $98k</p>
              <p class="text-xs text-yellow-700 mt-1">Put仍未实值，继续保留 $2,000。只要不跌破 $95k 都安全。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 场景3：BTC暴跌到 $88k</p>
              <p class="text-xs text-red-700 mt-1">卖出的Put被行权，但买入的Put提供保护。最大亏损 $8,000。若没有买入保护，亏损会更大。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期<strong>看不跌</strong>（包括上涨、横盘、微跌），不需要大涨也能盈利</li>
              <li>隐含波动率偏高时卖出，能收取更高权利金</li>
              <li>有明确的支撑位，可作为卖出Put的行权价</li>
              <li>想做"期权房东"，通过卖期权收租金</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期BTC可能大幅下跌（盈亏比不划算，小赚大亏）</li>
              <li>市场恐慌情绪严重，支撑位不明确</li>
              <li>波动率处于极低位（权利金太少，风险收益比差）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>盈亏比不对称</strong>：最大盈利$2k vs 最大亏损$8k，需要维持高胜率（通常需要70%+）才能长期盈利</li>
            <li><strong>Theta Decay是双刃剑</strong>：时间流逝对你有利，但最后几天若价格在卖出价附近，Gamma爆炸会导致剧烈波动</li>
            <li><strong>黑天鹅风险</strong>：突发事件导致暴跌时，即使有买入保护，仍会面临最大亏损</li>
            <li><strong>保证金占用</strong>：卖出期权需要缴纳保证金，资金利用率不如纯买入策略</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：卖出Put设在关键支撑位下方5-10%，给自己足够的安全边际</li>
            <li><strong>价差宽度</strong>：常用5-10%的价差，平衡收益和风险。价差越宽，收的钱越多但风险也越大</li>
            <li><strong>到期时间</strong>：建议选30-45天到期合约，Theta decay效率最高且时间足够</li>
            <li><strong>仓位管理</strong>：单个价差的最大亏损不要超过总资金的2-3%，允许多次试错</li>
            <li><strong>提前平仓</strong>：当赚到权利金的50-70%时，考虑提前平仓锁定利润，降低尾部风险</li>
            <li><strong>滚动收租</strong>：到期获利后，立即开新仓，持续收租。月均收益目标可设为3-5%</li>
          </ul>
        </div>
      `,
    pros: [
      '高胜率策略：只要BTC不出现大幅下跌（包括上涨、横盘、微跌），均可获利。',
      '风险可控：买入的低价Put锁定了极端行情下的最大亏损。',
      '时间价值受益：作为净卖方，时间流逝（Theta Decay）对策略有利。'
    ],
    cons: [
      '盈亏比限制：最大亏损通常大于最大盈利，需要维持高胜率以保证长期期望值为正。',
      '上行无关：BTC的大幅上涨不会增加策略收益，仅能赚取固定的权利金。'
    ]
  }
};

export default bullPutSpread;

