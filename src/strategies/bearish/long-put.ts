import { Strategy, StrategyCategory } from '@/types';

const longPut: Strategy = {
  id: 'long-put',
  name: '买入看跌期权 (Long Put)',
  category: StrategyCategory.BEARISH,
  description: '用固定权利金博取下跌；风险封顶，收益随跌幅扩张。',
  setup: '买入 Put',
  riskProfile: '风险有限（最多亏权利金）；Theta 负、Vega 正；对快速下跌与 IV 上升敏感。',
  idealScenario: '短期显著下跌或破位；IV 低位建仓更优。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">买入看跌期权 (Long Put) 是最直接的做空工具。用一笔固定成本（权利金）博取下跌行情带来的巨大收益，最大亏损仅为所付权利金，适合对下行有明确判断的交易者。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 买入 OTM/ATM Put</p>
              <p class="text-sm text-slate-700">行权价 ≤ 当前价格</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 $95k Put，付 $3k</p>
            </div>
            <div class="bg-slate-50 p-4 rounded border border-slate-200">
              <p class="font-bold text-slate-700 mb-2">🎯 行权价选择</p>
              <ul class="text-sm text-slate-700 space-y-1 list-disc pl-5">
                <li>ITM：成本高、Delta大，类似持有空单</li>
                <li>ATM：性价比居中，流动性好</li>
                <li>OTM：成本低、杠杆高，需更大跌幅</li>
              </ul>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-red-700 mb-2">≈ 直到归零</div>
            <p class="text-xs text-slate-600">价格越跌越赚（理论接近无限）</p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">权利金</div>
            <p class="text-xs text-slate-600">若价格上涨或横盘，损失为固定成本</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">Strike − Premium</div>
            <p class="text-xs text-slate-600">行权价 - 权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，担心下跌</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入 1× $95k Put，付 $3,000</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴跌到 $80k</p>
              <p class="text-xs text-green-700 mt-1">Put价值 ≈ $15k，净赚 $12k（400%回报）</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 小幅下跌至 $94k</p>
              <p class="text-xs text-yellow-700 mt-1">内在价值 $1k，仍亏 $2k（Theta 抵消）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 上涨到 $110k</p>
              <p class="text-xs text-red-700 mt-1">Put作废，亏损权利金 $3k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>预期短期出现显著回撤或破位下跌</li>
              <li>持仓需要保护但不愿卖出现货</li>
              <li>隐含波动率偏低、买入期权较便宜</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <p class="font-bold text-green-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-green-800 space-y-1 list-disc pl-5">
              <li>长时间缓跌或横盘（Theta 损耗较大）</li>
              <li>隐含波动率极高（期权过贵）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Theta（时间损耗）</strong>：若价格不快跌，时间价值会持续流逝</li>
            <li><strong>Vega（波动率风险）</strong>：事件后 IV 回落可能压制期权价格</li>
            <li><strong>流动性与点差</strong>：深度不佳时买入成本与平仓点差偏大</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>到期选择</strong>：优先 30–60 天，兼顾时间与幅度</li>
            <li><strong>行权价选择</strong>：将 Put 设在关键支撑位附近，下破时收益最大化</li>
            <li><strong>分批建仓</strong>：价格接近目标区时分批加仓，降低时点风险</li>
            <li><strong>盈利管理</strong>：跌速快且浮盈较大时，分批止盈避免反弹回吐</li>
            <li><strong>与 Collar 对比</strong>：若不想付费，可用 Collar 以收益封顶换取低成本保护</li>
          </ul>
        </div>
      `,
    pros: [
      '风险封顶：最大损失已锁定为权利金，无爆仓风险。',
      '高杠杆做空：以小资金博取价格下跌带来的高额收益。'
    ],
    cons: [
      '时间损耗：若市场未如期下跌或下跌缓慢，时间价值衰减将侵蚀本金。',
      '长期胜率挑战：鉴于数字资产长期通缩上涨的特性，单纯做空策略面临长期胜率压力。'
    ]
  }
};

export default longPut;
