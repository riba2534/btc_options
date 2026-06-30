import { Strategy, StrategyCategory } from '@/types';

const riskReversal: Strategy = {
  id: 'risk-reversal',
  name: '风险逆转 (Risk Reversal)',
  category: StrategyCategory.BULLISH,
  description: '买高位 Call、卖低位 Put；近零成本复制看涨敞口，代价是下行像持币。',
  setup: '买入 OTM Call + 卖出 OTM Put（同到期日）',
  riskProfile: '下行风险大（类持币，BTC 归零最大亏约 $90k）；上行收益无限；近零成本建仓。Delta 强正，Gamma/Theta/Vega 近中性。',
  idealScenario: '坚定看涨且愿在更低位接货；想吃下行 skew、又不愿付权利金。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  plainSummary: '几乎不花钱赌 BTC 要涨：用"卖出下跌保险"收来的钱去买"上涨彩票"。大涨像满仓持币一样赚，横在中间不赚不亏，真大跌了得照单全收、跟持币一样亏。',
  analogy: {
    emoji: '🎟️',
    title: '用卖保险的钱买彩票',
    text: '你把"别人怕 BTC 跌"愿意付的保险费收过来（卖出下行保护），转手用这笔钱买一张"赌大涨"的彩票（买入看涨）。不花自己的钱就赌涨——代价是万一真跌穿了，你就成了那个赔保险的人，亏得和直接持币一样多。'
  },
  pitfalls: [
    '以为"零成本"="零风险"——下破 $90k 后亏损和持有现货一样大，极端归零最多亏约 $90k，绝不是只亏权利金。',
    '把它当 Long Call 来买：Long Call 跌了最多亏权利金，Risk Reversal 跌了要像持币一样真金白银地亏下去。',
    '忽略保证金：卖出的那条 Put 会占用保证金，暴跌时可能被追保甚至强平。'
  ],
  quickJudge: {
    use: '坚定看涨、愿更低位接货',
    avoid: '怕暴跌或保证金不足'
  },
  greeks: {
    delta: '+(强)',
    gamma: '≈0',
    theta: '≈0',
    vega: '≈0'
  },
  cryptoNote: '含一条裸卖 Put（$90k），下破后像满仓持币、并占用保证金。在 Deribit 等平台：① IV 单独飙升（现货没怎么动）也会推高空头 Put 的 mark price，触发追保；② 欧式≠不会被平——到期前即可被增量强平，周末/插针的薄流动性下尤其危险；③ 用 BTC 作保证金时暴跌会"浮亏 + 抵押品缩水"双杀。另外本站为简化把两腿 IV 取相等→净成本≈$0；真实加密市场的看跌 skew 通常让 OTM Put 更贵，卖 Put 能多收一点、建仓常为净收入——这正是"吃 skew"的收益来源。',
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">风险逆转 (Risk Reversal) 用<strong>卖出 OTM Put 收到的权利金</strong>去<strong>买入 OTM Call</strong>，做到近乎零成本表达看涨。上破像随涨的多头、下破像满仓持币——这是加密机构最常用的"不愿付权利金又要做多 + 顺手吃下行 skew"的方向工具。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>一收一付，互相抵消：</strong>卖 Put 的钱 ≈ 买 Call 的钱</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 OTM Call</p>
              <p class="text-sm text-slate-700">行权价高于现价（+10%）</p>
              <p class="text-xs text-slate-600 mt-1">例：买 $110k Call，付 $2k</p>
            </div>
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 OTM Put</p>
              <p class="text-sm text-slate-700">行权价低于现价（−10%）</p>
              <p class="text-xs text-slate-600 mt-1">例：卖 $90k Put，收 $2k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本 ≈ $0</strong>（付 $2k − 收 $2k）；只需缴纳卖 Put 的保证金。</p>
            <p class="text-xs text-slate-600 mt-1">真实加密市场看跌 skew 较陡，OTM Put 往往更贵，常能做成<strong>净收入</strong>建仓——这部分净收入就是吃 skew 的来源。两腿须用同一到期日。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">∞</div>
            <p class="text-xs text-slate-600">突破上腿后随币价线性上涨，上不封顶</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">≈ $90k</div>
            <p class="text-xs text-slate-600">跌破 $90k 后像持币，BTC 归零时亏约 $90k</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">死区（不赚不亏）</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$90k – $110k</div>
            <p class="text-xs text-slate-600">两腿都作废，盈亏 ≈ $0</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，坚定看涨且愿在 $90k 接货</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入 1 份 $110k Call，支付 $2,000</li>
              <li>卖出 1 份 $90k Put，收取 $2,000</li>
              <li>净成本 ≈ $0，仅占用卖 Put 的保证金</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 最佳：BTC 涨到 $130k</p>
              <p class="text-xs text-green-700 mt-1">Call 内在 $20k − 权利金 $2k = +$18k；Put 作废留下 $2k → 合计 <strong>+$20k</strong>，价格越高赚越多（上不封顶）。</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 中等：BTC 横在 $100k（死区内）</p>
              <p class="text-xs text-yellow-700 mt-1">Call 作废亏权利金 $2k，Put 作废留权利金 $2k，两者抵消 → 盈亏 ≈ <strong>$0</strong>。$90k–$110k 之间几乎都是这个结果。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 最差：BTC 跌到 $80k</p>
              <p class="text-xs text-red-700 mt-1">Put 被现金结算（经济效果≈在 $90k 接货后又跌）：Put 端 $2k − $10k = −$8k，Call 亏权利金 $2k → 合计 <strong>−$10k</strong>。跌得越多亏越多，归零约亏 $90k——和持币完全一样。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>坚定看涨，但不愿为 Long Call 持续付出权利金（怕横盘被 Theta 磨光）</li>
              <li>本来就愿意在更低位（如 $90k）接货抄底，卖 Put 等于"挂低价买单还顺手收钱"</li>
              <li>看跌 skew 偏陡、OTM Put 偏贵时建仓，能做成净收入、吃下行 skew</li>
              <li>保证金充裕、能承受像持币一样的下行风险</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>担心暴跌、想要"亏损封顶"的下行保护（这里下行几乎无保护）</li>
              <li>保证金不充裕的账户（暴跌时卖 Put 可能被追保/强平）</li>
              <li>只是想小赌一把、亏损控制在一笔小钱内（那应该用 Long Call）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📐 何时选 Risk Reversal，而非 Synthetic Long / Long Call？</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
            <li><strong>vs 买入看涨 (Long Call)</strong>：Long Call 下跌只亏权利金、有亏损封顶，但要持续付权利金、横盘被 Theta 磨。Risk Reversal 近零成本、横盘不亏，<strong>代价是放弃了下行保护</strong>——把"封顶亏损"换成了"持币式风险"。看涨且能承受下跌 → 选 Risk Reversal；只想小赌、要兜底 → 选 Long Call。</li>
            <li><strong>vs 合成多头 (Synthetic Long)</strong>：合成多头用<strong>同一行权价</strong>（ATM Call + ATM Put），Delta≈1、几乎完全复制现货、没有死区。Risk Reversal 用<strong>不同 OTM 行权价</strong>，中间多出 $90k–$110k 的"死区"、成本更低，并主动做空下行 skew。想精确复制现货敞口 → 合成多头；想更便宜、愿意更低位接货、还想吃 skew → Risk Reversal。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Delta（强正）</strong>：组合 Delta 接近持有 1 BTC，下跌时与现货同步亏损，"零成本"绝不等于"零风险"。</li>
            <li><strong>Vega（近中性）</strong>：买 Call 的正 Vega 与卖 Put 的负 Vega 大致抵消，但两腿 IV 常不一致（skew），实盘会留下净 Vega/skew 敞口。</li>
            <li><strong>保证金与强平</strong>：卖出的 Put 占用保证金，IV 飙升或币价急跌都可能触发追保，欧式期权到期前同样会被增量强平。</li>
            <li><strong>执行成本</strong>：两腿都在 OTM，点差与滑点会侵蚀本就接近零的净成本，建议用组合单按净价一次性成交。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：卖 Put 的行权价就是你"愿意接货的价位"，别只为多收权利金而往上挪，否则下行风险骤增。</li>
            <li><strong>吃 skew</strong>：在看跌恐慌、Put 溢价偏高时建仓，更容易做成净收入；牛市 Call skew 偏贵时则相对吃亏。</li>
            <li><strong>到期时间</strong>：建议 30–60 天，给上涨留足空间，又不至于让卖 Put 的尾部风险敞口拖太久。</li>
            <li><strong>仓位与缓冲</strong>：按"等同持有多少 BTC 现货"来核算仓位，预留充足保证金缓冲应对暴跌追保。</li>
            <li><strong>主动管理</strong>：若跌势确立，及时买回 Put 止损或下滚行权价；若已大幅获利，可平掉 Call 锁定利润、单独保留卖 Put。</li>
          </ul>
        </div>
      `,
    pros: [
      '近零成本：用卖 Put 的权利金补贴买 Call，无需净支出即可建立看涨敞口，资金效率高。',
      '横盘不被磨：死区内两腿权利金互相抵消，不像单买 Call 那样每天损耗 Theta。',
      '可吃 skew：加密看跌 skew 较陡时，卖出的 OTM Put 更贵，常能做成净收入建仓。'
    ],
    cons: [
      '下行风险大：跌破下腿后亏损与持有现货一致，没有亏损封顶，极端情况下亏损巨大。',
      '保证金占用：卖出的 Put 需缴纳并维持保证金，暴跌或 IV 飙升时可能被追保甚至强平。'
    ]
  }
};

export default riskReversal;
