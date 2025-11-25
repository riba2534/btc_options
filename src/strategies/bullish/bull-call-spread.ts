import { Strategy, StrategyCategory } from '@/types';

const bullCallSpread: Strategy = {
  id: 'bull-call-spread',
  name: '牛市看涨价差 (Bull Call Spread)',
  category: StrategyCategory.BULLISH,
  description: '买入低价Call，卖出高价Call。牺牲潜在暴利换取更低成本。',
  setup: '买入 Call A + 卖出 Call B (Strike B > A)',
  riskProfile: '风险有限 (净权利金)，收益有限 (价差 - 成本)。',
  idealScenario: 'BTC温和上涨。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">牛市看涨价差通过"买低卖高"降低成本，牺牲上方无限收益换取更高胜率。适合温和看涨行情。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入腿</p>
              <p class="text-sm text-slate-700">买入1份较低行权价Call</p>
              <p class="text-xs text-slate-600 mt-1">例：买入$100k Call，支付$5k</p>
            </div>
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出腿</p>
              <p class="text-sm text-slate-700">卖出1份较高行权价Call</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出$110k Call，收取$2k</p>
            </div>
          </div>
          <p class="text-sm text-slate-600 mt-3"><strong>净成本</strong> = $5k - $2k = $3k（远低于单买Call）</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-lg font-bold text-green-700 mb-2">价差 - 成本</div>
            <p class="text-xs text-slate-600">$110k-$100k-$3k=$7k</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$3k</div>
            <p class="text-xs text-slate-600">净成本（跌破买入价）</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$103k</div>
            <p class="text-xs text-slate-600">买入价+成本</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border border-purple-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期涨到$108k</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 涨到$110k：获得最大收益$7k（233%回报）</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 涨到$105k：赚$2k（67%回报），稳健盈利</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 跌到$95k：损失$3k，但比单买Call少亏</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg p-4">
            <p class="font-bold text-teal-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-teal-800 space-y-1 list-disc pl-5">
              <li>预期温和上涨（涨10-20%），有明确的目标价位</li>
              <li>隐含波动率处于高位，卖出期权能收取较高权利金</li>
              <li>技术分析显示关键阻力位清晰（可作为卖出价）</li>
              <li>新手想体验期权价差策略，降低持仓成本</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期暴涨行情（收益被卖出腿封顶，错失超额利润）</li>
              <li>波动率处于极低位（卖出期权收益太少，性价比不高）</li>
              <li>无明确目标价位（难以设定合理的卖出行权价）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>收益封顶风险</strong>：BTC突破卖出价后，无法享受超额收益，可能痛失大牛市</li>
            <li><strong>双腿流动性</strong>：需同时平仓两个期权，流动性差时可能有滑点损失</li>
            <li><strong>时间衰减不对称</strong>：虽然买卖期权都有Theta损耗，但卖出腿的收益有限，整体仍面临时间压力</li>
            <li><strong>提前行权风险</strong>：美式期权在分红或其他特殊情况下可能被提前行权（加密市场较少，但需注意交易所规则）</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价间隔</strong>：选择5-10%的strike间隔，平衡收益和胜率。间隔太小收益低，太大成本节省不明显</li>
            <li><strong>卖出价设定</strong>：将卖出Call的行权价设在关键阻力位（如前高、整数关口），技术上难以突破时收益最大化</li>
            <li><strong>到期时间选择</strong>：建议选择30-60天到期的合约，Theta decay效率高且时间足够价格上涨</li>
            <li><strong>提前平仓</strong>：当价格接近卖出价且时间价值所剩不多时，考虑提前平仓，避免被行权的麻烦</li>
            <li><strong>滚动策略</strong>：盈利后可以平仓当前价差，滚动到更高价位的新价差，持续捕捉上涨趋势</li>
            <li><strong>Delta 对冲</strong>：整体Delta为正但小于1，可适当配合现货对冲，构建Delta中性组合</li>
          </ul>
        </div>
      `,
    pros: [
      '成本优势：相比直接买入Call，该策略构建成本更低。',
      '抗波动性：卖出腿对冲了部分Vega风险，受隐含波动率下降的影响较小。',
      '胜率提升：较低的盈亏平衡点意味着价格只需小幅上涨即可获利。'
    ],
    cons: [
      '收益封顶：最大收益受限于两个行权价的差额，无法享受BTC暴涨带来的超额利润。',
      '交易成本：涉及两笔期权交易，手续费相对较高。'
    ]
  }
};

export default bullCallSpread;

