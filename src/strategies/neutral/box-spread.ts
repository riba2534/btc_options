import { Strategy, StrategyCategory } from '@/types';

const boxSpread: Strategy = {
  id: 'box-spread',
  name: '盒式组合 (Box Spread)',
  category: StrategyCategory.NEUTRAL,
  description: '理论套利结构：Bull Call Spread + Bear Put Spread 的组合。',
  setup: '买低 Call + 卖高 Call + 卖低 Put + 买高 Put（同价差）',
  riskProfile: '理论上风险与收益均锁定（更多偏套利教育）。',
  idealScenario: '价差与权利金错价可获套利空间。',
  legs: [
    // 设置权利金使净成本 ≈ 价差（$105k−$95k = $10k），到期盈亏 ≈ 0
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.07 }, // 7k
    { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.02 }, // -2k
    { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.02 }, // -2k
    { type: 'Put', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.07 }  // 7k
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Box Spread 用看涨价差与看跌价差组合，理论上锁定价差，偏套利教育用途。实际需严控费用与滑点。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-2">买 $95k Call（付 $7k） + 卖 $105k Call（收 $2k）</p>
        <p class="text-slate-700 mb-2">卖 $95k Put（收 $2k） + 买 $105k Put（付 $7k）</p>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>到期盈亏</strong>：理论上为常数 <em>价差 − 净成本</em>。示例中设置净成本 ≈ 价差（$10k），因此到期盈亏 ≈ $0。</p>
          <p class="text-xs text-slate-500">若实际净成本小于价差，则到期固定获利；反之为固定亏损。现实执行需考虑资金利率、费用与滑点。</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">理论收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">锁定价差</div>
          <p class="text-xs text-slate-600">偏套利结构</p>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div class="text-xs text-amber-600 font-bold mb-1">实际风险</div>
          <div class="text-2xl font-bold text-amber-700 mb-2">费用与滑点</div>
          <p class="text-xs text-slate-600">现实世界中的执行成本</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">关键因素</div>
          <div class="text-lg font-bold text-blue-700 mb-2">流动性/点差</div>
          <p class="text-xs text-slate-600">对成交质量要求极高</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：理论锁定 $10k 价差</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 执行良好</p>
            <p class="text-xs text-green-700 mt-1">净付 $10k 建仓，到期任意价位均收回 $10k 内在值，扣 $120 手续费后净盈亏约 -$120 ≈ 打平（理论锁定）。</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 中性</p>
            <p class="text-xs text-yellow-700 mt-1">净付 $10.3k（含 $300 点差），到期收回 $10k，净亏约 $300。</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 执行不佳</p>
            <p class="text-xs text-red-700 mt-1">净付 $10.8k（滑点 + 费用 $800），到期收回 $10k，净亏约 $800。</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>点差与费用极低的高流动性市场</li>
            <li>对执行质量有把握的专业交易者</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>点差大、费用高的市场</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>现实执行风险</strong>：理论与实际存在差距</li>
          <li><strong>费用与滑点</strong>：可能吞噬掉全部理论收益</li>
          <li><strong>Delta/Gamma/Vega/Theta</strong>：盒式组合方向与波动率敞口近似为零（各希腊字母 ≈ 0），理论上无市场风险，主要风险来自执行成本与美式期权的提前行权（尤其卖出的腿）。</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>严格评估</strong>：仅在极佳成交环境下尝试</li>
          <li><strong>教育用途</strong>：更适合作为教学示例而非实盘常用策略</li>
        </ul>
      </div>
    `,
    pros: [
      '理论上可锁定价差，具备套利教学意义。',
      '方向、波动率与时间价值风险近似中性，适合作为期权定价与无套利原理的教学范例。'
    ],
    cons: [
      '现实世界中费用与滑点可能使策略无利可图。',
      '美式期权存在提前行权风险，且需占用与价差等额的保证金/资金，资金利率会侵蚀理论收益。'
    ]
  },
  plainSummary: '不管 BTC 到期涨成什么样，这个"盒子"到期都固定值一笔钱（本例约 $10k）。你提前花差不多这么多钱把它买下来，正常情况下不赚不亏；只有当四张期权凑出的总价比这笔固定金额便宜时，才能稳赚那一点差价。说白了是道套利练习题，实盘里手续费和点差很容易把这点差价吃光。',
  analogy: {
    emoji: '🎁',
    title: '买一个装着固定现金的密封盒子',
    text: '你花约 $10k 买下一个密封盒子，卖家保证不管外面行情怎么变，到期盒子里一定有 $10k。正常买卖你不赚不亏；只有当某个粗心卖家把盒子标低了价（比如 $9.7k），你买下后才能稳赚那 $300。难点是你得同时在四个柜台谈妥价格成交，稍微被多收点手续费，这点差价立刻就没了。'
  },
  pitfalls: [
    '把它当成"无风险稳赚"：理论价差极小，手续费、点差和资金占用利率几乎一定把它吃光，算下来常常反而是亏的。',
    '手动逐腿挂单建仓：四条腿无法一次成交，快市里容易只成交一半、留下"裸腿"，方向敞口暴露，锁定的盒子当场被打破。',
    '忽略提前行权与资金占用：在美式或链上合约里，卖出的腿可能被提前行权破坏结构；且需占用与价差等额的资金，利率会侵蚀本就微薄的收益。'
  ],
  quickJudge: {
    use: '报价明显错价且点差费用极低时',
    avoid: '想靠它稳赚或手动逐腿建仓'
  },
  greeks: {
    delta: '≈0',
    gamma: '≈0',
    theta: '≈0',
    vega: '≈0'
  },
  cryptoNote: 'Deribit 期权为欧式现金结算，不存在提前行权与 Pin Risk，正好满足 Box 锁定价差的理论前提（美式或链上合约则要防卖出腿被提前行权）。但四条腿来回成交才是最大杀手：每张期权费约为标的 0.03%（权利金 12.5% 封顶）+ 交割费，逐腿叠加极易吃光那点理论价差——务必用组合单/RFQ 一次性按净价成交，切勿手动逐腿挂单（快市留裸腿会破坏锁定结构）。'
};

export default boxSpread;
