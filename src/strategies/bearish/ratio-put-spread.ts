import { Strategy, StrategyCategory } from '@/types';

const ratioPutSpread: Strategy = {
  id: 'ratio-put-spread',
  name: '看跌比例价差 (Ratio Put Spread)',
  category: StrategyCategory.BEARISH,
  description: '买1份高价Put、卖2份低价Put。温和下跌到甜点最赚，暴跌则下行风险放大。',
  setup: '买入 1x ATM Put + 卖出 2x OTM Put',
  riskProfile: '上行风险有限（净成本）；甜点收益丰厚；跌破下盈亏平衡后下行风险放大；Theta 正、Vega 负、净空 1 张 Put。',
  idealScenario: '预期温和下跌至卖出腿行权价附近；IV 偏高更利于卖方腿。',
  legs: [
    { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 },
    { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
  ],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 p-5 rounded-lg mb-6">
          <p class="text-rose-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-rose-800 text-sm">看跌比例价差 (Ratio Put Spread) 用“买 1、卖 2”的不对称比例押注<strong>温和下跌</strong>。买 1 份较高行权价 Put、卖 2 份较低行权价 Put，价格恰好跌到卖出腿行权价时收益最甜。它是 <strong>看跌比例反向价差 (Put Ratio Backspread) 的镜像</strong>：backspread 赌暴动、本策略赌温和并靠净卖方收时间价值——但代价是多卖出的那 1 份 Put 形成净空头，<strong>一旦暴跌击穿下盈亏平衡，下行风险被放大</strong>。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 买入 1× ATM Put（较高行权价）</p>
              <p class="text-sm text-slate-700">例：买入 $100k Put，付 $5k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 卖出 2× OTM Put（较低行权价）</p>
              <p class="text-sm text-slate-700">例：卖出 2× $90k Put，收 $2k × 2 = $4k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $5k − $4k = <strong>$1k</strong>（接近零成本）</p>
            <p class="text-xs text-slate-600">本例为约 $1k 的净借记；若行权价更近或 IV 更高，2 份卖出腿可覆盖买入腿、做成净收权利金（贷记）建仓。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">$9k</div>
            <p class="text-xs text-slate-600">价格恰好收于卖出腿 $90k 时实现：$10k 内在 − $1k 净成本。</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-lg font-bold text-red-700 mb-2">下行放大 / 上行仅 $1k</div>
            <p class="text-xs text-slate-600">上涨（≥$100k）仅亏净成本 $1k；跌破 $81k 后每跌 $1k 多亏 $1k（净空 1 张 Put），理论最坏 ≈ $81k。</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$81k 与 $99k</div>
            <p class="text-xs text-slate-600">盈利区间在 $81k–$99k 之间；$90k 为收益顶点。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期温和下跌到 $90k 一带</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓 1:2 比例：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入 1× $100k Put（付 $5,000）</li>
              <li>卖出 2× $90k Put（收 $2,000 × 2 = $4,000）</li>
              <li>净成本 $1,000</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 最佳：温和跌到 $90k</p>
              <p class="text-xs text-green-700 mt-1">买入腿赚 $10k − $5k = $5k；2 份卖出腿恰好平值作废，保留 $4k 权利金；合计 <strong>+$9k</strong>。（跌到 $95k 仍有 +$4k）</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 不跌/横盘：收于 $100k 及以上</p>
              <p class="text-xs text-yellow-700 mt-1">三条 Put 全部作废，仅亏净成本 <strong>−$1k</strong>。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 最差：暴跌击穿 $81k，例如跌到 $70k</p>
              <p class="text-xs text-red-700 mt-1">买入腿赚 $25k（$30k 内在 − $5k 成本），但 2 份卖出腿各亏 $18k（$2k 权利金 − $20k 内在）合计 −$36k；总计 <strong>−$11k</strong>，且越跌越亏——这正是本策略与普通熊市看跌价差的关键区别。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-lg p-4">
            <p class="font-bold text-rose-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-rose-800 space-y-1 list-disc pl-5">
              <li>预期<strong>温和、有限</strong>的下跌，且有明确目标价位（如下方支撑 $90k）</li>
              <li>IV 偏高，2 份卖出腿能收到更厚的权利金、压低成本甚至做成净贷记</li>
              <li>判断“跌但跌不深”，愿意用甜点高收益换取暴跌时的下行风险</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <p class="font-bold text-emerald-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-emerald-800 space-y-1 list-disc pl-5">
              <li>预期可能暴跌或黑天鹅（应改用 Put Ratio Backspread 或直接买 Put）</li>
              <li>无法承担净空头 Put 的保证金与强平风险</li>
              <li>临近到期才建仓，价格钉在 $90k 附近时 Gamma 风险极大</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>下行风险放大（Delta 反转）</strong>：跌破甜点 $90k 后净空 1 张 Put 主导，Delta 由负转正，价格越跌亏损越大，跌破 $81k 即净亏。</li>
            <li><strong>Theta 正、Vega 负</strong>：作为净卖方，时间衰减总体有利；但 IV 飙升会推高卖出腿价值、产生未实现亏损。</li>
            <li><strong>Gamma 风险</strong>：临近到期且价格在 $90k 附近时盈亏曲线极陡，方向稍偏即剧烈波动。</li>
            <li><strong>执行成本</strong>：三腿开平仓存在点差与滑点，侵蚀本就微薄的净成本。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>比例选择</strong>：1:2 最常见；比例越大（如 1:3）净收权利金越多，但下行裸空风险与保证金占用同步放大。</li>
            <li><strong>行权价间距</strong>：建议 8–12%，把甜点对准下方关键支撑。</li>
            <li><strong>下行止损</strong>：跌破甜点 $90k 后果断减仓，不要恋战净空头 Put。</li>
            <li><strong>与 Backspread 对照</strong>：赌暴跌选 Put Ratio Backspread（买 2 卖 1，崩盘越赚）；赌温和下跌、想收时间价值才选本策略。</li>
          </ul>
        </div>
      `,
    pros: [
      '甜点收益丰厚：价格恰好跌到卖出腿行权价时，单腿做多 Put 的内在价值叠加 2 份卖出腿的权利金，收益显著（本例 $9k）。',
      '成本低廉：2 份卖出腿的权利金几乎覆盖买入腿成本，可构建为接近零成本甚至净贷记建仓。'
    ],
    cons: [
      '下行风险放大：跌破下盈亏平衡（$81k）后，多卖出的 1 张 Put 形成净裸空，价格越跌亏损越大，无实质封顶。',
      '保证金与强平：净空头 Put 需占用保证金，暴跌时可能被增量强平在最差位置，与普通熊市看跌价差“风险有限”的特性截然不同。'
    ]
  },
  plainSummary: '赌 BTC 会温和下跌、最好正好跌到某个价位。跌到那个甜点你赚得最多；要是不跌顶多亏一点点；但要是暴跌跌过了头，反而越跌越亏——因为你多卖了一份看跌权利。',
  analogy: {
    emoji: '🎣',
    title: '在浅滩下了张网',
    text: '你判断鱼群会缓缓游到 $90k 这个水位，就在那撒了两张网（卖 2 份 Put）。鱼正好游到这里收获最大；鱼不来你只亏点网钱；但要是发洪水（暴跌冲过头），你多撒的那张网反被水流拖着走，水越大亏得越多。',
  },
  pitfalls: [
    '以为「看跌就该越跌越赚」——本策略在 $90k 甜点后开始回吐，跌破下盈亏平衡 $81k 就转为净亏，越跌越亏。',
    '忽视多卖出的那 1 份 Put 是裸空暴露，暴跌时亏损没有实质上限，和「风险有限」的普通熊市看跌价差完全不同。',
    '临近到期才建仓：价格钉在 $90k 附近时 Gamma 极高，盈亏瞬间翻脸。',
  ],
  quickJudge: {
    use: '预期温和下跌到 $90k 附近',
    avoid: '可能暴跌或已临近到期',
  },
  greeks: {
    delta: '− → +（跌破 $90k 转正）',
    gamma: '−（净空 1 张）',
    theta: '+（净卖方，时间利好）',
    vega: '−（IV 上升不利）',
  },
  cryptoNote: '🛡️ 保证金与强平：本策略卖 2 买 1、净空 1 张 Put，跌破 $90k 后实质是裸空 Put 暴露。Deribit 等平台按保证金占用，且到期前即可被增量强平（欧式≠不会被平）。注意 Vega 风险——IV 单独飙升、现货没动也会推高空头 Put 的 mark price 触发追保；用 BTC 作保证金时，暴跌会「浮亏 + 抵押品缩水」双杀，且恰好落在本策略下行风险放大的区域。务必预留缓冲、用更小仓位。',
};

export default ratioPutSpread;
