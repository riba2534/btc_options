import { Strategy, StrategyCategory } from '@/types';

const reverseIronCondor: Strategy = {
  id: 'reverse-iron-condor',
  name: '反向铁鹰 (Reverse Iron Condor)',
  category: StrategyCategory.VOLATILITY,
  description: '买入内层宽跨 + 卖出外层翼。有限风险做多波动率，盈利封顶、最大亏损=净借记。',
  setup: '买入 OTM Put/Call（内层）+ 卖出更远 OTM Put/Call（外层）',
  riskProfile: '风险有限（净借记）；收益有限（翼宽 − 净借记）；Vega 正、Theta 负、Gamma 正、Delta≈0。',
  idealScenario: '事件驱动预期大波动、但担心 IV crush；预算有限、可接受封顶盈利。',
  legs: [
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.015 },
    { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.03 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.015 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-5 rounded-lg mb-6">
          <p class="text-purple-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-purple-800 text-sm">反向铁鹰 (Reverse Iron Condor) 是<strong>有限风险版的做多波动率</strong>策略：买入靠内的宽跨式（$95k Put + $105k Call），再卖出更远的外翼（$90k Put + $110k Call）来补贴成本。无论 BTC 大涨还是大跌都能盈利，但<strong>盈利被外翼封顶、最大亏损锁定为净借记</strong>。它是铁鹰 (Iron Condor) 的镜像——铁鹰赌不动收租，反向铁鹰赌大动付租。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-purple-50 p-4 rounded border border-purple-200">
              <p class="font-bold text-purple-700 mb-2">📉 下方：买 $95k Put / 卖 $90k Put</p>
              <p class="text-sm text-slate-700">净付 ≈ $1.5k（$3k − $1.5k）</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">📈 上方：买 $105k Call / 卖 $110k Call</p>
              <p class="text-sm text-slate-700">净付 ≈ $1.5k（$3k − $1.5k）</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>总净借记</strong> ≈ $3k；<strong>翼宽</strong> = $5k（每侧）</p>
            <p class="text-xs text-slate-600">卖出外翼把裸买宽跨的成本压低，代价是盈利封顶。风险与收益均已锁定。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$2k</div>
            <p class="text-xs text-slate-600">翼宽 $5k − 净借记 $3k；价格跌破 $90k 或涨破 $110k 时封顶实现。</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$3k</div>
            <p class="text-xs text-slate-600">价格停在 $95k–$105k 之间时，四条腿全部作废，损失全部净借记。</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$92k 与 $108k</div>
            <p class="text-xs text-slate-600">下：$95k − $3k；上：$105k + $3k。需走出此区间才盈利。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，ETF 决议/CPI 前预期大波动但方向不明</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓四腿：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖 $90k Put 收 $1.5k、买 $95k Put 付 $3k（下方借记价差）</li>
              <li>买 $105k Call 付 $3k、卖 $110k Call 收 $1.5k（上方借记价差）</li>
              <li>净借记 $3,000</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴动：涨破 $110k 或跌破 $90k</p>
              <p class="text-xs text-green-700 mt-1">内层腿价差打满 $5k − 净借记 $3k = <strong>+$2k</strong>（封顶）。例如涨到 $115k：$105k Call 赚 $10k − $5k 给被卖出的 $110k Call = 价差 $5k，扣成本得 +$2k。</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 中等：涨到 $107k / 跌到 $93k</p>
              <p class="text-xs text-yellow-700 mt-1">走出一点但没穿越盈亏平衡，约亏 <strong>−$1k</strong>（如 $107k：内层 Call 价差值 $2k − 净借记 $3k）。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 最差：横盘收于 $95k–$105k</p>
              <p class="text-xs text-red-700 mt-1">四条腿全部作废，损失全部净借记 <strong>−$3k</strong>（亏损封顶，不会更多）。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>事件驱动（ETF 决议、减半、CPI/FOMC）预期大波动，但方向不明</li>
              <li>想做多波动率却<strong>担心利好出尽后 IV crush</strong>——卖出外翼降低净 Vega，部分对冲波动率崩塌</li>
              <li>预算有限、希望最大亏损<strong>提前锁定</strong>，可接受盈利封顶</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期横盘或波动率收敛（应反向用 Iron Condor 收租）</li>
              <li>预期开放式、爆炸性的单边行情、想要无封顶收益（应用 Long Strangle）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚖️ 何时选反向铁鹰，而非 Long Strangle？</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-sm text-slate-700 mb-3">两者都是做多波动率，区别在于「封顶 + 成本 + IV crush 抵抗力」三点：</p>
          <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
            <li><strong>选反向铁鹰</strong>：预算有限、想要确定的小额最大亏损；预期<strong>中等幅度</strong>波动（够穿越较近的盈亏平衡 $92k/$108k 即可，无需爆炸）；<strong>最担心 IV crush</strong>——卖出的外翼降低净 Vega，事件后 IV 暴跌时损失更可控。</li>
            <li><strong>选 Long Strangle</strong>：预期真正<strong>爆炸性、开放式</strong>的单边行情，需要无封顶收益；IV 处于低位（买方便宜、不怕 crush），愿意承担更大的纯多 Vega 暴露。</li>
          </ul>
          <p class="text-xs text-slate-500 mt-3">一句话：反向铁鹰 = 「封顶 + 抗 IV crush」版的 Long Strangle，用盈利上限换确定性与更低的波动率风险。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>Theta 负（时间损耗）</strong>：作为净买方，横盘每天都在流血，价格不动到期即亏满 $3k。</li>
            <li><strong>Vega 正但被外翼削弱</strong>：IV 上升有利；卖出外翼虽降低了净 Vega（抗 IV crush），但也削弱了 IV 暴涨时的获利弹性。</li>
            <li><strong>Gamma 正、需要足够幅度</strong>：盈亏平衡 $92k/$108k 比裸跨式更近，但仍需明确的方向突破，磨蹭式波动不奏效。</li>
            <li><strong>四腿执行成本</strong>：开平共 8 笔，点差与手续费会侵蚀仅 $2k 的封顶收益。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>到期选择</strong>：覆盖事件日，7–30 天为宜；事件落地后及时了结，不要硬扛 Theta。</li>
            <li><strong>内外层间距</strong>：内层离现价越近越易触发盈利但成本越高；外翼决定盈利封顶与降本幅度，常用 5% 翼宽。</li>
            <li><strong>事件兑现即走</strong>：方向一旦明确、价格突破内层腿，分批落袋；别等回归区间把利润还回去。</li>
            <li><strong>组合成交</strong>：四腿务必用组合单/RFQ 一次性按净价成交，避免逐腿 legging 滑点。</li>
          </ul>
        </div>
      `,
    pros: [
      '风险严格受控：最大亏损锁定为净借记（本例 $3k），是 Long Strangle 的有限风险替代。',
      '抗 IV crush：卖出外翼降低净 Vega，事件利好出尽、波动率崩塌时损失比裸买宽跨更可控。'
    ],
    cons: [
      '盈利封顶：外翼锁死收益上限（本例 $2k），无法享受爆炸性单边行情的无限收益。',
      '四腿成本：开平共 8 笔点差与手续费，对仅 $2k 的封顶收益侵蚀显著。'
    ]
  },
  plainSummary: '赌 BTC 马上要出大事、要么大涨要么大跌，但你不知道往哪边。猜对方向、行情真暴动你就赚（赚多少有上限）；要是风平浪静没动，你最多亏掉买入这套组合花的钱，不会更多。',
  analogy: {
    emoji: '🎟️',
    title: '买一张「会出大事」的彩票（带止损）',
    text: '花一笔固定的钱买张彩票，赌「这周会有大新闻」。涨疯了或跌穿了都能中奖，但奖金封顶；要是风平浪静，你顶多亏掉这张彩票钱。比裸买宽跨式便宜、也更扛得住消息落地后的「热度退潮」，代价是中奖金额有上限。',
  },
  pitfalls: [
    '以为「做多波动就稳赚」——只要 BTC 横在 $95k–$105k 不动，到期就亏光净借记 $3k。',
    '盈利封顶在 $2k，别期待像 Long Strangle 那样的无限收益；要无封顶就别用这个结构。',
    '事件兑现后 IV 暴跌（IV crush）仍会拖累四条腿，可能在价格还没走够时浮亏——只是卖出的外翼已部分对冲了这块。',
  ],
  quickJudge: {
    use: '预期大波动但怕 IV 暴跌',
    avoid: '预期横盘或要无封顶收益',
  },
  greeks: {
    delta: '≈0（方向中性）',
    gamma: '+（做多波动）',
    theta: '−（时间损耗）',
    vega: '+（IV 上升有利）',
  },
  cryptoNote: '💸 真实成本：四腿结构，Deribit 期权手续费约为标的的 0.03%/张（封顶权利金 12.5%）+ 交割费，开 + 平来回最多 8 笔，对「最大收益仅 $2k」的封顶结构侵蚀显著。外翼（$90k Put / $110k Call）更深虚值、流动性差、点差更宽。务必用组合单 / RFQ（Deribit combo book、Paradigm RFQ）一次性按净价成交，不要手动逐腿挂单——快市里 legging 会留下裸腿。',
};

export default reverseIronCondor;
