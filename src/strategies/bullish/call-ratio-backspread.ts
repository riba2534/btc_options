import { Strategy, StrategyCategory } from '@/types';

const callRatioBackspread: Strategy = {
  id: 'call-ratio-backspread',
  name: '看涨比例反向价差 (Call Ratio Backspread)',
  category: StrategyCategory.BULLISH,
  description: '卖出1份低价Call，买入2份高价Call。',
  setup: '卖出 1x ITM Call + 买入 2x OTM Call',
  riskProfile: '下行风险有限，上行收益无限且加倍。',
  idealScenario: '极度看涨，认为会有史诗级暴涨。',
  legs: [
    { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.06 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">看涨比例反向价差是一种<strong>激进的暴涨策略</strong>。通过卖1买2（或1:3）的不对称比例，用卖出期权的收入购买更多虚值Call，在BTC暴涨时获得加倍收益。但有"死谷"风险，适合极度看涨且愿意承担复杂性的高手。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>比例魔法：1:2 或 1:3</strong></p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 1份 ITM/ATM Call</p>
              <p class="text-sm text-slate-700">行权价较低，权利金较高</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出 $95k Call，收 $6k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 2份 OTM Call</p>
              <p class="text-sm text-slate-700">行权价较高，权利金较低</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 2×$105k Call，付 $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $5k - $6k = <strong>-$1k（净收入！）</strong></p>
            <p class="text-xs text-slate-600">理想情况下，这个策略可以实现零成本甚至净收入建仓。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">暴涨收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">∞ × 2</div>
            <p class="text-xs text-slate-600">双倍Call带来加速上涨收益</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">死谷风险</div>
            <div class="text-lg font-bold text-red-700 mb-2">有限但痛苦</div>
            <p class="text-xs text-slate-600">价格停在买入价时亏损最大</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">下跌保护</div>
            <div class="text-lg font-bold text-blue-700 mb-2">净权利金</div>
            <p class="text-xs text-slate-600">暴跌时反而赚钱（如果净收入）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期要暴涨</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓 1:2 Ratio:</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出 1份 $95k Call，收 $6,000</li>
              <li>买入 2份 $105k Call，付 $2,500 × 2 = $5,000</li>
              <li>净收入 $1,000！</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ BTC暴涨到 $120k</p>
              <p class="text-xs text-green-700 mt-1">卖出腿亏 $25k，买入腿赚 $30k × 2 = $60k。总盈利 $35k + $1k = <strong>$36k</strong>！是单买Call收益的2倍多</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 死谷：BTC涨到 $105k</p>
              <p class="text-xs text-red-700 mt-1">卖出腿亏 $10k，买入腿刚好平值作废。最大亏损 $9k（-$10k + $1k），这就是"Valley of Death"</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ BTC跌到 $90k</p>
              <p class="text-xs text-yellow-700 mt-1">所有Call作废，保留净收入 $1k。暴跌反而赚钱（虽然不多）</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期<strong>史诗级暴涨</strong>（如突破长期压力位，直冲新高）</li>
              <li>重大利好事件前（如ETF批准、减半后的超级牛市启动）</li>
              <li>隐含波动率偏低时建仓（买Call便宜且Vega有利）</li>
              <li>想用低成本甚至零成本博取暴涨收益</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期温和上涨（容易掉入死谷区）</li>
              <li>对比例策略不熟悉的新手（构建和管理复杂）</li>
              <li>临近到期时建仓（Gamma风险极大）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>死谷风险（Valley of Death）</strong>：价格停在买入Call的行权价附近时亏损最大，这是此策略的致命弱点</li>
            <li><strong>比例失衡风险</strong>：如果比例设置不当（如1:1.5），可能导致风险收益比不划算</li>
            <li><strong>Gamma爆炸</strong>：临近到期时，死谷区的Gamma极高，价格微小波动会导致盈亏剧烈变化</li>
            <li><strong>构建复杂度</strong>：需要精确计算两个行权价和比例，一旦出错损失巨大</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>比例选择</strong>：1:2 是最常见比例，平衡收益和风险。1:3 更激进但死谷更大</li>
            <li><strong>行权价间隔</strong>：两个行权价间隔10-15%，太窄死谷区太大，太宽构建成本高</li>
            <li><strong>零成本目标</strong>：尽量构建成净收入或零成本，这样即使暴跌也不亏钱</li>
            <li><strong>死谷监控</strong>：价格接近买入Call行权价时，考虑提前平仓或调整仓位</li>
            <li><strong>暴涨平仓</strong>：一旦暴涨盈利达50-100%，考虑分批止盈，别贪心等涨到天上</li>
            <li><strong>避免临期</strong>：至少选择60天以上到期的合约，避免Gamma风险</li>
          </ul>
        </div>
      `,
    pros: [
      '低成本构建：若构建得当，可实现零成本甚至净权利金收入（Net Credit）。',
      '暴涨收益加倍：持有双倍的多头头寸，上行杠杆效应显著。',
      '下行保护：若市场反向暴跌，仅损失构建成本或保留净权利金收益。'
    ],
    cons: [
      '死谷风险（Valley of Death）：若价格在到期时停留在两个行权价之间，将面临最大亏损。',
      '构建复杂：需要精确计算比例和行权价选择，以优化风险收益比。'
    ]
  }
};

export default callRatioBackspread;
