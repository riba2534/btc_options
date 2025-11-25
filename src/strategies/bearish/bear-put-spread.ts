import { Strategy, StrategyCategory } from '@/types';

const bearPutSpread: Strategy = {
  id: 'bear-put-spread',
  name: '熊市看跌价差 (Bear Put Spread)',
  category: StrategyCategory.BEARISH,
  description: '买入高价Put，卖出低价Put。降低做空成本。',
  setup: '买入 Put A + 卖出 Put B (Strike A > B)',
  riskProfile: '风险有限，收益有限。',
  idealScenario: 'BTC温和下跌。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">熊市看跌价差 (Bear Put Spread) 用“买高卖低”的 Put 组合法降低做空成本。你牺牲极端暴跌时的收益上限，换取更低的入场成本与更高的胜率，适合温和下跌行情。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 买入 Put A（较高行权价）</p>
              <p class="text-sm text-slate-700">例：买入 $100k Put，付 $5k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 卖出 Put B（较低行权价）</p>
              <p class="text-sm text-slate-700">例：卖出 $90k Put，收 $2k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $5k − $2k = <strong>$3k</strong></p>
            <p class="text-xs text-slate-600">比单买 Put 更省钱，但收益被封顶于价差。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大收益</div>
            <div class="text-lg font-bold text-red-700 mb-2">(A − B) − 成本</div>
            <p class="text-xs text-slate-600">$100k − $90k − $3k = <strong>$7k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$3k</div>
            <p class="text-xs text-slate-600">若价格未跌破 A（或温和小跌）</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">A − 成本</div>
            <p class="text-xs text-slate-600">$100k − $3k = <strong>$97k</strong></p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期温和下跌</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 跌到 $90k 及以下</p>
              <p class="text-xs text-green-700 mt-1">获得最大收益 $7k（233% 回报）</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 跌到 $95k</p>
              <p class="text-xs text-yellow-700 mt-1">盈亏约 $2k（仍盈利，胜率较高）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 反弹到 $105k</p>
              <p class="text-xs text-red-700 mt-1">损失净成本 $3k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>预期温和下跌，有明确目标区间</li>
              <li>IV 偏高，卖出腿可显著抵消成本</li>
              <li>技术位明确：下方支撑可作为卖出行权价</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>预期暴跌（收益被封顶，欠佳）</li>
              <li>IV 极低（卖出腿权利金太少）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Theta 不对称</strong>：买入与卖出腿的时间损耗节奏不同</li>
            <li><strong>Vega 暴露</strong>：IV 快速下滑会降低买入腿价值</li>
            <li><strong>滑点与流动性</strong>：双腿同时平仓可能带来滑点</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>间距选择</strong>：常用 5–10% 价差，兼顾收益与成本</li>
            <li><strong>到期时间</strong>：30–60 天更利于价格到达目标</li>
            <li><strong>分批止盈</strong>：跌速快时分批落袋，避免回撤</li>
            <li><strong>与单 Put 对比</strong>：若判断极端下跌，考虑直接买 Put</li>
          </ul>
        </div>
      `,
    pros: [
      '成本效益：相比直接买入Put，构建成本显著降低。',
      '目标明确：适合有明确目标价位的技术性做空交易。'
    ],
    cons: [
      '收益封顶：若发生黑天鹅事件导致价格暴跌，策略收益在低行权价处封顶，无法享受后续利润。'
    ]
  }
};

export default bearPutSpread;
