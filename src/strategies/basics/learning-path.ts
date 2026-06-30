import { Strategy, StrategyCategory } from '@/types';

const learningPath: Strategy = {
  id: 'learning-path',
  name: '新手学习路径 (Learning Path)',
  category: StrategyCategory.BASICS,
  description: '不知道先学什么？跟着这条路循序渐进。',
  setup: '',
  riskProfile: '',
  idealScenario: '',
  legs: [],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="font-bold text-indigo-900 mb-3">🧭 新手怎么学？跟着这条路走</p>
          <ol class="text-sm text-indigo-800 space-y-2 list-decimal pl-5">
            <li><strong>先打地基</strong>：读完「期权基础」，搞懂 Call/Put、行权价、权利金，以及怎么看盈亏图。</li>
            <li><strong>最简单的两招</strong>：Long Call（赌涨）、Long Put（赌跌）——风险有限、最好理解。</li>
            <li><strong>结合手里的币</strong>：Covered Call（收租）、Protective Put（买保险），把期权和现货连起来。</li>
            <li><strong>学会降成本</strong>：Bull Call Spread 等「价差」策略，用卖出腿补贴买入腿。</li>
            <li><strong>进阶玩法</strong>：中性收租（Iron Condor）→ 做多波动（Long Straddle）→ 裸卖/合成（高风险，最后碰）。</li>
          </ol>
          <p class="text-xs text-indigo-700 mt-3">⚠️ 别一上来就点四条腿的复杂策略，先把前两步吃透。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📚 难度梯度一览</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="space-y-2 text-sm">
            <div class="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded p-3">
              <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded shrink-0">入门</span>
              <span class="text-slate-700">期权基础 → Long Call / Long Put（单腿买方，风险=权利金，最直观）。</span>
            </div>
            <div class="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded p-3">
              <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded shrink-0">基础</span>
              <span class="text-slate-700">Covered Call / Protective Put（与现货结合）→ Bull Call Spread / Bear Put Spread（两腿价差，降成本）。</span>
            </div>
            <div class="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded p-3">
              <span class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-bold rounded shrink-0">进阶</span>
              <span class="text-slate-700">Iron Condor（区间收租）→ Long Straddle / Strangle（做多波动率）。</span>
            </div>
            <div class="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded p-3">
              <span class="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded shrink-0">高风险</span>
              <span class="text-slate-700">裸卖（Naked Call）、合成（Synthetic）、比例价差——风险大、保证金复杂，最后再碰。</span>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 我该用哪个策略？</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="space-y-2 text-sm">
            <div class="flex gap-3 items-start bg-emerald-50 border border-emerald-200 rounded p-3">
              <span class="font-bold text-emerald-700 shrink-0">📈 我觉得要涨</span>
              <span class="text-slate-700">小涨用 <b>牛市看涨价差</b>（省成本）；坚定大涨用 <b>买入看涨</b>（收益无限）。</span>
            </div>
            <div class="flex gap-3 items-start bg-rose-50 border border-rose-200 rounded p-3">
              <span class="font-bold text-rose-700 shrink-0">📉 我觉得要跌</span>
              <span class="text-slate-700">直接 <b>买入看跌</b>；想省成本用 <b>熊市看跌价差</b>。</span>
            </div>
            <div class="flex gap-3 items-start bg-blue-50 border border-blue-200 rounded p-3">
              <span class="font-bold text-blue-700 shrink-0">😐 我觉得会震荡</span>
              <span class="text-slate-700">区间收租用 <b>铁鹰式</b> / <b>卖出宽跨式</b>（注意尾部风险）。</span>
            </div>
            <div class="flex gap-3 items-start bg-violet-50 border border-violet-200 rounded p-3">
              <span class="font-bold text-violet-700 shrink-0">⚡ 要出大事但不知涨跌</span>
              <span class="text-slate-700">用 <b>买入跨式 / 宽跨式</b> 做多波动率。</span>
            </div>
            <div class="flex gap-3 items-start bg-indigo-50 border border-indigo-200 rounded p-3">
              <span class="font-bold text-indigo-700 shrink-0">💰 我有币想收租</span>
              <span class="text-slate-700">持币卖 <b>备兑看涨</b>；想低价接币用 <b>现金担保看跌</b>；长期循环用 <b>轮子策略</b>。</span>
            </div>
            <div class="flex gap-3 items-start bg-cyan-50 border border-cyan-200 rounded p-3">
              <span class="font-bold text-cyan-700 shrink-0">🛡️ 我怕暴跌想保本</span>
              <span class="text-slate-700">给现货买 <b>保护性看跌</b>；想省保费用 <b>领口策略</b>。</span>
            </div>
          </div>
          <p class="text-xs text-slate-500 mt-3">💡 心里先有一个「涨 / 跌 / 震荡 / 大波动 / 收租 / 保本」的判断，再回到左侧目录点开对应策略细看。</p>
        </div>
      `,
    pros: [],
    cons: []
  }
};

export default learningPath;
