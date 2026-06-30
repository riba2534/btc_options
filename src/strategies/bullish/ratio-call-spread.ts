import { Strategy, StrategyCategory } from '@/types';

const ratioCallSpread: Strategy = {
  id: 'ratio-call-spread',
  name: '看涨比例价差 (Ratio Call Spread)',
  category: StrategyCategory.BULLISH,
  description: '买 1 张 ATM Call、卖 2 张 OTM Call；赌温和上涨到上腿最甜，越过盈亏平衡后上行风险无限。',
  setup: '买入 1x ATM Call + 卖出 2x OTM Call（同到期日）',
  riskProfile: '下行最多亏净成本（约 $1k）；最大收益 $9k（在 $110k）；上行风险无限（越过 $119k 越涨亏越多）。净空头：Gamma−、Theta+、Vega−，上行 Delta 转负。',
  idealScenario: '温和看涨、有明确目标价位（约 $110k）；预计不会暴涨、想顺手收点权利金。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
  ],
  plainSummary: '赌 BTC "温和上涨、但别涨过头"。涨到目标价（约 $110k）最爽、稳稳赚一笔；可一旦涨疯了冲过 $119k，反而开始倒亏，而且越涨亏越多、没有底。',
  analogy: {
    emoji: '🎯',
    title: '赌"小胜"的狙击手',
    text: '就像押注球队"小胜一点"：刚好赢一点你拿满奖金；但要是赢得太夸张（暴涨），反而触发了你额外卖出的那份合约，奖金被反噬、甚至倒贴。所以这是"赌涨、但赌它别涨疯"。',
  },
  pitfalls: [
    '只看到"$110k 赚 $9k"就忽略上行无限风险——BTC 暴涨冲过 $119k 后亏损没有上限，这是致命弱点。',
    '误以为是稳健看涨策略：它卖出的 Call 比买入的多 1 张，本质带一条裸卖腿，牛市启动会被反噬。',
    '临近到期还死扛：$110k 附近 Gamma 极高，价格小幅波动盈亏剧烈跳动，该止盈/平仓时别犹豫。'
  ],
  quickJudge: {
    use: '看温和上涨、有目标价',
    avoid: '可能暴涨或临近到期'
  },
  greeks: {
    delta: '+(弱)→−(上行转负)',
    gamma: '−',
    theta: '+',
    vega: '−'
  },
  cryptoNote: '这是净空头结构（卖出比买入多 1 张 Call），$110k 之上等于挂着一条裸卖 Call，上行风险无限。在 Deribit 等平台：① 卖方占用保证金，且 IV 单独飙升（现货没大动）也会推高空头 mark price 触发追保；② 欧式≠不会被平——到期前即可被增量强平，而 BTC 单日 +15% 屡见不鲜，牛市启动时这条裸腿是账户杀手；③ 用 BTC 作保证金会"浮亏 + 抵押品缩水"双杀。务必给上行留缓冲（到价提前买回卖腿或上滚），用组合单/RFQ 一次性按净价成交避免裸腿，仓位要小。',
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">看涨比例价差是一种<strong>"赌温和上涨 + 顺手收租"</strong>的策略：买 1 张 ATM Call 做多，再卖 2 张更高的 OTM Call 来补贴成本。价格不温不火地漂到上腿（$110k）时最甜；但因为卖出的 Call 比买入的多 1 张，<strong>一旦暴涨越过上盈亏平衡点，上行风险无限</strong>——这是它和"赌暴涨"的反向比例价差（Backspread）正好相反的地方。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>比例 1:2 —— 卖得比买得多</strong></p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 1 张 ATM Call</p>
              <p class="text-sm text-slate-700">行权价 = 现价</p>
              <p class="text-xs text-slate-600 mt-1">例：买 1× $100k Call，付 $5k</p>
            </div>
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 2 张 OTM Call</p>
              <p class="text-sm text-slate-700">行权价较高（+10%）</p>
              <p class="text-xs text-slate-600 mt-1">例：卖 2× $110k Call，共收 $4k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = 付 $5k − 收 $4k = <strong>净借记约 $1k</strong>（接近零成本）。</p>
            <p class="text-xs text-slate-600 mt-1">若卖腿更靠近现价、或看涨 skew 让 OTM Call 更贵，可把它做成<strong>净收入</strong>建仓——届时即便价格不涨，也能留下这笔权利金。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">$9k</div>
            <p class="text-xs text-slate-600">价格正好落在上腿 $110k 时（最甜点）</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">∞（上行）</div>
            <p class="text-xs text-slate-600">越过 $119k 后越涨亏越多，无上限；下行最多只亏净成本 $1k</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$101k / $119k</div>
            <p class="text-xs text-slate-600">只在 $101k–$119k 之间赚钱</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期温和上涨到 $110k 附近</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓 1:2 比例：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入 1 张 $100k Call，支付 $5,000</li>
              <li>卖出 2 张 $110k Call，共收 $2,000 × 2 = $4,000</li>
              <li>净成本（借记）≈ $1,000</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 最佳：BTC 涨到 $110k（最甜点）</p>
              <p class="text-xs text-green-700 mt-1">买腿内在 $10k − 权利金 $5k = +$5k；两张卖腿刚好平值作废、留权利金 $4k → 合计 <strong>+$9k</strong>。这是收益顶点。</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 中等：BTC 没涨、横在 $95k</p>
              <p class="text-xs text-yellow-700 mt-1">三张 Call 全部作废，只亏建仓的净成本 → <strong>−$1k</strong>。这就是下行的"地板"（最多亏净成本）。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 最差：BTC 暴涨到 $130k</p>
              <p class="text-xs text-red-700 mt-1">买腿内在 $30k − $5k = +$25k；两张卖腿各亏 $20k 内在、加回权利金 → 2×（$2k − $20k）= −$36k；合计 <strong>−$11k</strong>。价格越高亏越多、<strong>没有上限</strong>——多卖的那张 Call 是裸的。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期<strong>温和上涨</strong>、有明确目标价位（如认为大概率到 $110k 附近止步）</li>
              <li>认为<strong>几乎不可能暴涨</strong>（有明确技术阻力，或市场缺乏催化剂）</li>
              <li>隐含波动率偏高、想顺势卖出贵 Call 收一点权利金来补贴成本</li>
              <li>能持续盯盘、暴涨时愿意主动买回卖腿止损</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期可能暴涨（哪怕只是小概率——上行无限亏损会要命）</li>
              <li>无法盯盘、不能在突破上腿时及时处理裸卖腿</li>
              <li>对比例策略不熟悉的新手（多腿、带裸卖，管理复杂）</li>
              <li>临近到期才建仓（上腿附近 Gamma 极大，盈亏剧烈跳动）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📐 与 Call Ratio Backspread 互为镜像</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
            <li><strong>反向比例价差 (Backspread)</strong>：买多卖少（卖 1 买 2），<strong>赌暴动</strong>——暴涨时收益无限，中间有"死谷"亏损区，本质是净多波动率。</li>
            <li><strong>本策略（正向/Front Ratio）</strong>：卖多买少（买 1 卖 2），<strong>赌温和 + 收租</strong>——温和涨到上腿最甜，暴涨时上行风险无限，本质是净空波动率。</li>
            <li>两者盈亏曲线几乎<strong>上下颠倒</strong>：Backspread 怕"不动"、本策略怕"涨疯"。你对未来是赌"大动"还是赌"温和"，决定了选哪一个。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>上行风险无限（核心风险）</strong>：多卖的那张 Call 没有买腿保护，价格越过上盈亏平衡点（$119k）后，越涨亏越多、没有上限——加密暴涨行情里这是真实的爆仓来源。</li>
            <li><strong>Delta 上行转负</strong>：起初接近中性/微正，价格涨向上腿后，2 张空 Call 的负 Delta 压过 1 张多 Call，组合 Delta 转负，涨得越多越像在做空。</li>
            <li><strong>Gamma（净负）</strong>：临近到期、价格在上腿附近时 Gamma 极大，盈亏对小幅波动异常敏感。</li>
            <li><strong>Vega（净负）/ 保证金</strong>：IV 飙升会同时推高空头价值、扩大浮亏并推高保证金要求，可能触发追保甚至到期前强平。</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>把上腿设在强阻力位</strong>：让"最甜点"落在你认为价格难以突破的位置，降低被暴涨反噬的概率。</li>
            <li><strong>设上行止损线</strong>：价格逼近上盈亏平衡点（$119k）时，果断买回多卖的那张 Call，把无限风险变回有限。</li>
            <li><strong>争取净收入建仓</strong>：调近卖腿或利用 skew 做成净贷记，这样即便不涨也能留下权利金、下行不亏。</li>
            <li><strong>到期时间</strong>：建议 30–45 天，给温和上涨留空间，又避免长期暴露裸卖腿的尾部风险。</li>
            <li><strong>仓位要小</strong>：因上行无限风险，名义暴露务必控制在小仓位，并预留充足保证金缓冲。</li>
          </ul>
        </div>
      `,
    pros: [
      '低成本看涨：用 2 张卖腿补贴买腿，接近零成本，甚至可做成净收入建仓。',
      '温和上涨收益佳：价格落在上腿附近时收益达到顶点（本例 +$9k），比单买 Call 更高效。',
      '下行风险有限：若价格不涨，最多只亏建仓净成本（净收入时甚至不亏）。'
    ],
    cons: [
      '上行风险无限：多卖一张裸 Call，暴涨越过上盈亏平衡点后亏损没有上限，是最致命的弱点。',
      '管理复杂且占保证金：多腿带裸卖、需持续盯盘并维持保证金，IV 飙升或暴涨都可能触发追保。'
    ]
  }
};

export default ratioCallSpread;
