import { Strategy, StrategyCategory } from '@/types';

const strap: Strategy = {
  id: 'strap',
  name: '多头条式组合 (Strap)',
  category: StrategyCategory.BULLISH,
  description: '买入1份Put，买入2份Call。看多波动率但更看涨。',
  setup: '买入 1x Put + 买入 2x Call (同Strike)',
  riskProfile: '风险有限，收益无限 (上涨赚双倍)。',
  idealScenario: '变盘在即，且向上突破概率大。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">多头条式组合 (Strap) 是Straddle的<strong>看涨增强版</strong>。通过2份Call + 1份Put的配置，在做多波动率的同时表达强烈的看涨偏好。适合变盘在即且预期向上突破概率更大的场景。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>2:1 看涨配比</strong></p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 2份 ATM Call</p>
              <p class="text-sm text-slate-700">双倍看涨头寸</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 2×$100k Call，付 $8k</p>
            </div>
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
              <p class="font-bold text-blue-700 mb-2">📉 买入 1份 ATM Put</p>
              <p class="text-sm text-slate-700">下跌保护</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 1×$100k Put，付 $4k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总成本</strong> = $12k（比Straddle贵50%）</p>
            <p class="text-xs text-slate-600">vs Straddle（1Call+1Put=$8k），Strap多花$4k换取向上突破时的双倍收益。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">上涨收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">∞ × 2</div>
            <p class="text-xs text-slate-600">2份Call带来加倍收益</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">下跌收益</div>
            <div class="text-2xl font-bold text-blue-700 mb-2">∞ × 1</div>
            <p class="text-xs text-slate-600">1份Put提供下跌保护</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$12k</div>
            <p class="text-xs text-slate-600">横盘时损失全部权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，三角形末端，大概率向上突破</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入 2份 $100k Call，付 $4k × 2 = $8k</li>
              <li>买入 1份 $100k Put，付 $4k</li>
              <li>总成本 $12k</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 向上突破：BTC涨到 $120k</p>
              <p class="text-xs text-green-700 mt-1">2份Call各赚 $20k，Put作废。总盈利 $40k - $12k = <strong>$28k</strong>（233%回报），远超Straddle的$16k</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 向下破位：BTC跌到 $80k</p>
              <p class="text-xs text-blue-700 mt-1">Put赚 $20k，Call作废。盈利 $20k - $12k = $8k（67%回报），低于向上突破但仍盈利</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 横盘整理：BTC停在 $102k</p>
              <p class="text-xs text-red-700 mt-1">所有期权几乎作废，亏损全部 $12k。这是Strap的最大风险</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li><strong>变盘节点</strong>（三角形整理末端、长期横盘后即将突破）</li>
              <li>技术分析显示向上突破概率 >60-70%</li>
              <li>重大事件前，预期利好概率大但不确定（留Put做保险）</li>
              <li>隐含波动率偏低，期权便宜时建仓</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>方向不明确，涨跌概率50:50（用Straddle更合适）</li>
              <li>预期长期横盘（Theta损耗会很惨）</li>
              <li>隐含波动率极高时（权利金太贵，成本过高）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>高成本压力</strong>：比Straddle贵50%，需要更大的价格波动才能盈利，盈亏平衡点更远</li>
            <li><strong>Theta加速衰减</strong>：3份期权同时损失时间价值，横盘时每天亏损巨大</li>
            <li><strong>判断方向错误</strong>：如果向下破位，收益远低于向上突破，不如直接买Put</li>
            <li><strong>Vega Crush</strong>：重大事件后波动率暴跌，即使方向猜对也可能亏钱</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>向上突破概率 ≥65%</strong>：只有当你对向上突破有较高把握时才用Strap，否则用Straddle</li>
            <li><strong>事件前1-2周建仓</strong>：太早Theta损耗大，太晚IV已经飙升成本高</li>
            <li><strong>盈亏平衡点计算</strong>：向上平衡点 = Strike + 总成本/2，向下平衡点 = Strike - 总成本。确保技术上可达</li>
            <li><strong>分批止盈</strong>：一旦突破盈利30-50%，考虑先平仓一半锁定利润</li>
            <li><strong>横盘止损</strong>：价格持续横盘且权利金亏损50%时，考虑止损，避免Theta归零</li>
            <li><strong>与Strip对比</strong>：如果看跌概率更大，用Strip（1Call+2Put）而非Strap</li>
          </ul>
        </div>
      `,
    pros: [
      '方向与波动双重押注：既受益于波动率上升，又侧重于看涨方向。',
      '上行爆发力：相比普通跨式，上涨时的收益率更高。'
    ],
    cons: [
      '构建成本高昂：需购买三份期权，权利金支出较大，盈亏平衡点较远。',
      '横盘风险：若市场波动不足，时间价值的快速衰减将导致严重亏损。'
    ]
  }
};

export default strap;
