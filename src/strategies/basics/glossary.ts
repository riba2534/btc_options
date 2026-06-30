import { Strategy, StrategyCategory } from '@/types';

const glossary: Strategy = {
  id: 'glossary',
  name: '术语速查 (Glossary)',
  category: StrategyCategory.BASICS,
  description: '看不懂术语？随时回这里查。',
  setup: '',
  riskProfile: '',
  idealScenario: '',
  legs: [],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-1">📖 一分钟术语速查</p>
          <p class="text-blue-800 text-sm">策略页里高频出现的黑话，这里一句话 + 一例讲清。看不懂随时回查。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🧱 基础概念</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6 space-y-3 text-sm text-slate-700">
          <p><span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">权利金 Premium</span> 买期权付的钱 / 卖期权收的钱，就是期权的「价格」。</p>
          <p><span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">行权价 Strike</span> 合约约定的买卖价格，盈亏图上所有拐点都和它有关。</p>
          <p><span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">到期日 Expiry</span> 期权的有效期限。越临近到期，时间价值掉得越快。</p>
          <p><span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">ATM / OTM / ITM</span> 行权价离现价的远近：平值（≈现价）/ 虚值（便宜、无内在价值）/ 实值（贵、有内在价值）。</p>
          <p><span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">内在价值 / 时间价值</span> 权利金 = 内在价值（现在行权能赚多少，虚值为 0）+ 时间价值（对未来波动的预期，越临近到期越小）。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📐 希腊字母</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6 space-y-3 text-sm text-slate-700">
          <p><span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">Delta</span> 币价动 1 块，期权大概动几毛——衡量「跟涨跟跌」的灵敏度（Call 0~1，Put -1~0）。</p>
          <p><span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">Gamma</span> Delta 的变化率：把 Delta 看作期权价格随币价变动的「速度」，Gamma 就是「加速度」。ATM 且临近到期时最大。</p>
          <p><span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">Theta 时间损耗</span> 期权每天会「变质」掉一点价值，越临近到期掉得越快。买方亏、卖方赚。</p>
          <p><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Vega</span> 隐含波动率（IV）每变化 1%，期权价格变化多少。买方做多 Vega、卖方做空 Vega。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 波动率</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6 space-y-3 text-sm text-slate-700">
          <p><span class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-bold rounded">IV / HV</span> IV（隐含波动率）= 市场预期未来波动多大，IV 越高期权越贵；HV（历史波动率）= 过去真实走出来的波动。</p>
          <p><span class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-bold rounded">IV Rank</span> 当前 IV 在过去一年最低~最高区间里的相对位置（0~100）。口诀：&gt;50 偏卖方，&lt;30 偏买方。</p>
          <p><span class="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded">IV Crush</span> 重大事件（减半、ETF 决议）后「利好/利空出尽」，IV 暴跌使期权价格崩盘，即使币价没怎么动。</p>
          <p><span class="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-bold rounded">Skew 偏斜</span> 不同行权价的 IV 不一样：下行恐慌时 Put 更贵、牛市时 Call 更贵，是市场情绪的温度计。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💱 交易与交割</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-2 space-y-3 text-sm text-slate-700">
          <p><span class="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-bold rounded">净借记 / 净贷记</span> 建仓时净付钱叫净借记（Debit，如买入价差）；净收钱叫净贷记（Credit，如卖出价差/铁鹰）。</p>
          <p><span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded">欧式 / 美式</span> 欧式只能到期日行权（加密主流）；美式可在到期前任意时点行权（部分传统期权）。</p>
          <p><span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded">现金交割</span> 到期按交易所 BTC 指数结算现金差额，不交割实物 BTC（Deribit / OKX 等主流平台）。</p>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-500">
          💡 想把这些概念背后的原理（平价公式、Skew、Pin Risk 等）讲透，请看「进阶概念 (Advanced Concepts)」。
        </div>
      `,
    pros: [],
    cons: []
  }
};

export default glossary;
