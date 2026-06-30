import { Strategy, StrategyCategory } from '@/types';

const collar: Strategy = {
  id: 'collar',
  name: '领口策略 (Collar)',
  category: StrategyCategory.INCOME,
  description: '持币 + 买Put保险 + 卖Call回血。低成本对冲。',
  setup: '持有现货 + 买入 Put + 卖出 Call',
  riskProfile: '风险有限，收益有限。',
  idealScenario: '担心下跌，但觉得也不会大涨。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-indigo-800 text-sm">领口策略 (Collar) = 持币 + 买 Put 保护 + 卖 Call 回血。以放弃部分上行来换取低成本甚至零成本的下行保护，构建“保底封顶”的安全区间。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 持有现货</p>
              <p class="text-sm text-slate-700">例：持 1 BTC（$100k）</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">🛡️ 买 Put + 📉 卖 Call</p>
              <p class="text-sm text-slate-700">例：买 $90k Put（付 $2k）、卖 $110k Call（收 $2k）</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> ≈ $0（Zero-Cost Collar）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">(现货价 − Put) + 净成本</div>
            <p class="text-xs text-slate-600">例：($100k − $90k) + $0 = <strong>$10k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">(Call − 现货) − 净成本</div>
            <p class="text-xs text-slate-600">例：($110k − $100k) − $0 = <strong>$10k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$100k</div>
            <p class="text-xs text-slate-600">$90k–$110k 内盈亏随现货线性变动，仅 P>$100k 才盈利</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，搭建零成本 Collar</p>
          <div class="space-y-2">
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 区间内随现货线性变动：$95k–$108k</p>
              <p class="text-xs text-blue-700 mt-1">$95k 约 −$5k、$100k 持平、$108k 约 +$8k（盈亏平衡 $100k）</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 上涨至 $120k</p>
              <p class="text-xs text-blue-700 mt-1">被行权于 $110k 卖出，上行收益封顶 $10k</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 下跌至 $80k</p>
              <p class="text-xs text-red-700 mt-1">行使 Put 锁定损失 $10k，避免更深亏损</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>中段行情：担心下跌但不预期暴涨</li>
              <li>希望低成本获得有效保护</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>对上行空间高度依赖的策略</li>
              <li>不愿被上方 Call 封顶</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>错过上行</strong>：价格大涨时超额收益被截断</li>
            <li><strong>执行细节</strong>：到期前滚动影响净成本与区间</li>
            <li><strong>IV 变化</strong>：IV 高低影响 Put 与 Call 的成本与收入</li>
            <li><strong>Delta/Vega</strong>：现货多头被买 Put、卖 Call 部分对冲，组合净 Delta 显著降低、区间内方向性敏感度减弱；买 Put 的正 Vega 与卖 Call 的负 Vega 大致抵消，IV 整体抬升时对组合价值影响有限，但偏斜（skew）变化仍会改变 Put/Call 相对成本。</li>
          </ul>
        </div>

      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>零成本目标</strong>：优先构建净成本≈0 的组合</li>
          <li><strong>区间选择</strong>：Put 下方 8–12%，Call 上方 8–12%</li>
          <li><strong>滚动管理</strong>：价格靠近边界时滚动调整行权价与到期</li>
          <li><strong>到期建议</strong>：中期 30–60 天；根据市场变化，提前滚动维持保护与区间。</li>
        </ul>
      </div>
      `,
    pros: [
      '低成本对冲：以放弃部分潜在上涨收益为代价，获得免费的下行保护。',
      '资产保值：非常适合在不确定性较高的市场环境中保护本金。'
    ],
    cons: [
      '收益封顶：若市场大涨，超额收益将被Call端截断。',
      '机会成本：若行情在 [$90k, $110k] 区间内震荡，组合收益基本等同于单纯持币，卖出的 Call 与买入的 Put 相互抵消，权利金对冲并未带来超额回报。'
    ]
  },
  plainSummary: '你手里有币，怕它跌，就花点小钱买份「跌了能止损」的保险；为了不掏这笔保费，又把「涨太多就卖掉」的权利卖出去换钱、刚好抵掉保费。等于给币价上下都装了护栏：跌不破地板，也涨不过天花板。',
  analogy: {
    emoji: '🏠',
    title: '让别人替你付的房屋保险',
    text: '你有套房（BTC）怕它跌价，想买份「跌了能赔」的保险（买 Put）。保费舍不得自己掏，于是跟人约好「房价涨过 110 万就卖给他」，对方先付你一笔钱（卖 Call），刚好够交保费。结果保险等于白嫖：跌了有人兜，但房价真涨破天花板的那部分赚头就不归你了。',
  },
  pitfalls: [
    '以为「零成本」就是「零代价」——你掏的是上行空间，币真要大涨时只能眼睁睁看着收益被 Call 封死在天花板。',
    'Put 和 Call 行权价设得太窄（贴着现价），区间一夹就上下受限，跟直接拿着币几乎没区别，还白白多付了几道手续费。',
    '临近到期不滚动，价格冲到 Call 边界时被指派、把币卖飞，错过后面的主升浪。',
  ],
  quickJudge: {
    use: '持币怕跌、又不指望暴涨',
    avoid: '坚定看大涨、不愿被封顶',
  },
  greeks: {
    delta: '+',
    gamma: '≈0',
    theta: '≈0',
    vega: '≈0',
  },
  cryptoNote: 'Deribit 期权费≈标的 0.03%/张（且封顶在权利金的 12.5%）+ 交割费，领口三腿（现货+Put+Call）来回成交，手续费会蚕食本就微薄的零成本价差；务必用组合单/RFQ 按净价一次性成交，别手动逐腿挂单——快市里成了一腿没成另一腿，会留下裸 Call/裸 Put 敞口。好在卖出的 Call 由现货覆盖（等同备兑），基本不额外占用保证金。',
};

export default collar;
