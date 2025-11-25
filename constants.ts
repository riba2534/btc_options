import { Strategy, StrategyCategory } from './types';

export const DEFAULT_BTC_PRICE = 100000;

export const STRATEGIES: Strategy[] = [
  // ==========================================
  // OPTION BASICS
  // ==========================================
  {
    id: 'option-basics',
    name: '期权基础 (Option Basics)',
    category: StrategyCategory.BASICS,
    description: '理解期权的核心概念、希腊字母以及四种基础交易形态。',
    setup: '基础知识',
    riskProfile: '取决于具体持仓',
    idealScenario: '学习与入门',
    legs: [], // Special handling in component
    detailedAnalysis: {
      explanation: `
        <h4 class="font-bold text-slate-900 mt-4 mb-3 text-xl">什么是期权？</h4>
        <p class="mb-4 leading-relaxed">期权（Options）是一种金融衍生工具，它<strong>赋予持有人在未来特定时间（到期日）以特定价格（行权价）买入或卖出某种资产的权利，但并非义务</strong>。这是期权与期货最本质的区别——期货必须履约，而期权可以选择性行权。</p>
        
        <p class="mb-4 leading-relaxed">简单来说，期权就像一份「可选的合约」：</p>
        <ul class="list-disc pl-6 mb-4 space-y-2 text-slate-700">
          <li><strong>买方</strong>支付一笔费用（权利金），获得「选择权」</li>
          <li><strong>卖方</strong>收取权利金，承担「履约义务」</li>
          <li>到期时，买方可以选择行权或放弃，卖方必须配合</li>
        </ul>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <p class="text-sm text-blue-900"><strong>📌 通俗例子</strong>：假设你看中一套房子，目前100万。你支付5万定金给房东，约定3个月内可以用100万买下这套房。3个月后：</p>
          <ul class="list-disc pl-5 mt-2 text-sm text-blue-800 space-y-1">
            <li>如果房价涨到120万，你选择行权，以100万买入，净赚15万</li>
            <li>如果房价跌到80万，你选择不买，只损失5万定金</li>
          </ul>
          <p class="text-sm text-blue-900 mt-2">这个定金就是<strong>权利金</strong>，100万就是<strong>行权价</strong>，3个月就是<strong>到期日</strong>。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-8 mb-3 text-xl">核心要素详解</h4>
        
        <div class="space-y-5">
          <div class="bg-white border border-slate-200 rounded-lg p-5">
            <h5 class="font-bold text-lg text-slate-900 mb-2">1. Call vs Put（看涨 vs 看跌）</h5>
            <div class="grid md:grid-cols-2 gap-4 mt-3">
              <div class="bg-green-50 p-4 rounded border border-green-200">
                <div class="font-bold text-green-700 mb-2">📈 Call（看涨期权）</div>
                <p class="text-sm text-slate-700 mb-2">赋予买方在未来<strong>以约定价格买入资产</strong>的权利。</p>
                <p class="text-xs text-slate-600"><strong>场景</strong>：你认为BTC会从$100,000涨到$120,000，买入行权价$100,000的Call。若真涨到$120,000，你行权买入后立即卖出，净赚约$20,000（减去权利金）。</p>
              </div>
              <div class="bg-red-50 p-4 rounded border border-red-200">
                <div class="font-bold text-red-700 mb-2">📉 Put（看跌期权）</div>
                <p class="text-sm text-slate-700 mb-2">赋予买方在未来<strong>以约定价格卖出资产</strong>的权利。</p>
                <p class="text-xs text-slate-600"><strong>场景</strong>：你认为BTC会从$100,000跌到$80,000，买入行权价$100,000的Put。若真跌到$80,000，你可以按$100,000卖出，净赚约$20,000（减去权利金）。</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-lg p-5">
            <h5 class="font-bold text-lg text-slate-900 mb-2">2. Strike（行权价）</h5>
            <p class="text-slate-700 mb-3">行权价是期权合约中约定的买卖价格。根据行权价与当前市场价格的关系，期权分为三种状态：</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3">
                <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">ITM</span>
                <div class="flex-1">
                  <strong class="text-slate-900">实值 (In-The-Money)</strong>
                  <p class="text-sm text-slate-600">Call的行权价 < 市价，或 Put的行权价 > 市价。具有内在价值，行权就能赚钱。</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">ATM</span>
                <div class="flex-1">
                  <strong class="text-slate-900">平值 (At-The-Money)</strong>
                  <p class="text-sm text-slate-600">行权价 ≈ 市价。流动性最好，时间价值最高，是最常交易的期权。</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">OTM</span>
                <div class="flex-1">
                  <strong class="text-slate-900">虚值 (Out-of-The-Money)</strong>
                  <p class="text-sm text-slate-600">Call的行权价 > 市价，或 Put的行权价 < 市价。无内在价值，仅有时间价值，价格便宜但需要更大的价格波动才能盈利。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-lg p-5">
            <h5 class="font-bold text-lg text-slate-900 mb-2">3. Expiration（到期日）</h5>
            <p class="text-slate-700 mb-2">期权的有效期限。<strong>时间就是期权的生命</strong>，越临近到期日，期权的时间价值衰减越快。</p>
            <div class="bg-amber-50 border border-amber-200 rounded p-3 mt-2">
              <p class="text-sm text-amber-900"><strong>⏰ 时间衰减规律</strong>：最后30天的时间价值衰减速度 > 前面几个月的总和。这就是为什么卖方喜欢卖短期期权（赚Theta），买方更倾向买长期期权（避免快速衰减）。</p>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-lg p-5">
            <h5 class="font-bold text-lg text-slate-900 mb-2">4. Premium（权利金）</h5>
            <p class="text-slate-700 mb-3">权利金是期权的价格，由<strong>内在价值 + 时间价值</strong>组成：</p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li><strong>内在价值</strong>：如果现在行权能赚多少（实值期权才有，虚值期权为0）</li>
              <li><strong>时间价值</strong>：市场对未来价格波动的预期（所有期权都有，越接近到期越小）</li>
            </ul>
            <div class="bg-slate-50 p-3 rounded mt-3">
              <p class="text-xs text-slate-600"><strong>例</strong>：BTC现价$100,000，一个行权价$95,000的Call，权利金$7,000。其中内在价值=$5,000（$100k-$95k），时间价值=$2,000。</p>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-lg p-5">
            <h5 class="font-bold text-lg text-slate-900 mb-2">5. 买方 vs 卖方</h5>
            <div class="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <div class="font-bold text-emerald-700 mb-2">买方（Long）</div>
                <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
                  <li>支付权利金</li>
                  <li>获得选择权</li>
                  <li>风险有限（最多损失权利金）</li>
                  <li>收益潜力大（甚至无限）</li>
                </ul>
              </div>
              <div>
                <div class="font-bold text-rose-700 mb-2">卖方（Short）</div>
                <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
                  <li>收取权利金</li>
                  <li>承担履约义务</li>
                  <li>收益有限（最多赚权利金）</li>
                  <li>风险可能很大（裸卖风险无限）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-8 mb-3 text-xl">希腊字母 (The Greeks) - 风险指标</h4>
        <p class="mb-4 text-slate-700">希腊字母是衡量期权风险和价值变化的核心指标。掌握它们是期权交易进阶的关键。</p>
        
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-lg border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-bold text-indigo-700 text-lg">Delta (Δ)</div>
              <span class="px-2 py-0.5 bg-indigo-200 text-indigo-800 text-xs rounded">方向敏感度</span>
            </div>
            <p class="text-slate-700 mb-2">衡量期权价格对标的资产价格变动的敏感度。范围：Call为0到1，Put为-1到0。</p>
            <div class="bg-white/50 rounded p-3 text-sm space-y-1">
              <p><strong>📊 实例</strong>：某Call的Delta=0.6，意味着BTC涨$1，该期权涨约$0.6。</p>
              <p><strong>🎯 应用</strong>：</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Delta=0.5的期权（ATM）被认为有50%概率到期时实值</li>
                <li>Delta可用于对冲：持有1 BTC + 卖出2个Delta=0.5的Call = Delta中性</li>
                <li>Delta会变化（这就是Gamma的作用）</li>
              </ul>
            </div>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-bold text-purple-700 text-lg">Gamma (Γ)</div>
              <span class="px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded">Delta的变化率</span>
            </div>
            <p class="text-slate-700 mb-2">衡量Delta对标的价格变动的敏感度，是Delta的"加速度"。</p>
            <div class="bg-white/50 rounded p-3 text-sm space-y-1">
              <p><strong>📊 实例</strong>：Gamma=0.02意味着价格涨$1，Delta增加0.02。</p>
              <p><strong>⚠️ 风险</strong>：ATM期权的Gamma最大，临近到期时Gamma暴增（Gamma爆炸），这对卖方极其危险。</p>
              <p><strong>💡 策略</strong>：买方喜欢高Gamma（价格有利时赚得更快），卖方害怕高Gamma（对抗性风险）。</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg border border-amber-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-bold text-amber-700 text-lg">Theta (Θ)</div>
              <span class="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs rounded">时间衰减</span>
            </div>
            <p class="text-slate-700 mb-2">衡量每过一天期权损失多少价值。买方的敌人，卖方的朋友。</p>
            <div class="bg-white/50 rounded p-3 text-sm space-y-1">
              <p><strong>📊 实例</strong>：Theta=-50意味着如果其他条件不变，今天到明天这个期权会损失$50的时间价值。</p>
              <p><strong>⏰ 规律</strong>：</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>ATM期权的Theta最大（衰减最快）</li>
                <li>最后30天的衰减速度 >> 前面的时间</li>
                <li>周末和假期也在衰减（不交易但时间在流逝）</li>
              </ul>
              <p><strong>🎯 策略</strong>：卖方通过卖近月期权赚取Theta收入（收租策略）。</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-bold text-green-700 text-lg">Vega (ν)</div>
              <span class="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded">波动率敏感度</span>
            </div>
            <p class="text-slate-700 mb-2">衡量隐含波动率(IV)变化1%对期权价格的影响。</p>
            <div class="bg-white/50 rounded p-3 text-sm space-y-1">
              <p><strong>📊 实例</strong>：Vega=200意味着IV涨1%，期权价格涨$200。</p>
              <p><strong>💥 Vega Crush</strong>：重大事件（如减半、ETF决议）前IV飙升，事件后"利好/空出尽"，IV暴跌导致期权价格崩盘，即使标的价格没什么变化。</p>
              <p><strong>🎯 策略</strong>：</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>预期波动加剧 → 买入期权（Long Vega）</li>
                <li>预期波动回落 → 卖出期权（Short Vega）</li>
              </ul>
            </div>
          </div>

          <div class="bg-gradient-to-r from-slate-50 to-gray-50 p-5 rounded-lg border border-slate-200">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-bold text-slate-700 text-lg">Rho (ρ)</div>
              <span class="px-2 py-0.5 bg-slate-200 text-slate-800 text-xs rounded">利率敏感度</span>
            </div>
            <p class="text-slate-700 mb-2">衡量无风险利率变化对期权价格的影响。在加密市场中影响极小，通常可以忽略。</p>
            <div class="bg-white/50 rounded p-3 text-sm">
              <p><strong>💡 说明</strong>：在传统金融市场（如股票期权），利率变化会影响持仓成本。但在加密市场，由于没有传统意义的无风险利率（或使用Funding Rate代替），Rho的作用微乎其微。</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-5 rounded mt-6">
          <p class="font-bold text-cyan-900 mb-2">🎓 进阶建议</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>新手先理解Delta和Theta，这是最直观的两个指标</li>
            <li>理解希腊字母之间的关系：Gamma影响Delta，Vega和Theta相互制约</li>
            <li>实盘前用期权计算器模拟不同场景下希腊字母的变化</li>
            <li>记住：买方做多Gamma和Vega，做空Theta；卖方相反</li>
          </ul>
        </div>
      `,
      pros: [
        '非线性收益：利用杠杆实现小资金博取大收益。',
        '多维交易：不仅可以交易方向，还可以交易波动率和时间。',
        '风险管理：提供现货无法比拟的对冲保护功能。'
      ],
      cons: [
        '复杂性高：涉及多个变量（价格、时间、波动率），学习曲线陡峭。',
        '时间损耗：买方每天面临时间价值的衰减。',
        '流动性风险：部分深度虚值或远期合约可能缺乏流动性。'
      ]
    }
  },

  // ==========================================
  // BULLISH STRATEGIES
  // ==========================================
  {
    id: 'long-call',
    name: '买入看涨期权 (Long Call)',
    category: StrategyCategory.BULLISH,
    description: '最基础的看涨策略。支付权利金，获得未来低价买入的权利。',
    setup: '买入 Call',
    riskProfile: '风险有限 (权利金)，收益无限。',
    idealScenario: 'BTC价格大幅上涨。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">买入看涨期权 (Long Call) 是最纯粹的杠杆做多工具。你用一小笔钱（权利金）博取BTC大涨的全部收益，下跌时损失有限。这是"小赌大"的经典策略。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3">只需一步：<strong>买入1份Call期权</strong></p>
          <div class="bg-slate-50 p-4 rounded">
            <p class="text-sm text-slate-600 mb-2"><strong>行权价选择的艺术：</strong></p>
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded shrink-0">ITM</span>
                <p class="text-sm text-slate-700">实值期权：价格贵，Delta高（0.7-0.9），几乎跟着现货涨跌，适合稳健型。</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded shrink-0">ATM</span>
                <p class="text-sm text-slate-700">平值期权：性价比最高，Delta=0.5，流动性好，新手首选。</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded shrink-0">OTM</span>
                <p class="text-sm text-slate-700">虚值期权：便宜，Delta低（0.2-0.4），杠杆极大但需要暴涨才能盈利，适合激进型。</p>
              </div>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">∞</div>
            <p class="text-xs text-slate-600">理论无限。BTC涨多少赚多少</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">权利金</div>
            <p class="text-xs text-slate-600">无论跌多少，只损失买期权的钱</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">Strike + Premium</div>
            <p class="text-xs text-slate-600">行权价 + 权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：2024年1月，BTC价格$45,000</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>买入操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入1份 3月到期 $50,000 Call</li>
              <li>支付权利金 $2,500</li>
              <li>Delta ≈ 0.35（虚值期权）</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景1：BTC涨到$60,000（+33%）</p>
              <p class="text-xs text-green-700 mt-1">期权内在价值 = $10,000，减去成本$2,500，<strong>净赚$7,500（300%回报）</strong></p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 场景2：BTC涨到$51,000（+13%）</p>
              <p class="text-xs text-yellow-700 mt-1">期权价值$1,000，亏损$1,500。现货涨了13%，期权却亏钱（因Theta损耗）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 场景3：BTC跌到$40,000（-11%）</p>
              <p class="text-xs text-red-700 mt-1">期权作废，损失全部$2,500权利金</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期BTC将在<strong>短期内大幅上涨</strong>（如突破关键阻力位）</li>
              <li>重大利好消息公布前夕（如ETF批准预期）</li>
              <li>技术形态显示即将向上突破（如三角形末端）</li>
              <li>资金有限但想参与牛市（杠杆效应）</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期慢牛缓涨（时间损耗会吃掉利润）</li>
              <li>横盘震荡行情（每天亏Theta）</li>
              <li>临近到期时买入（Gamma风险+Theta加速衰减）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>时间是敌人</strong>：每天都在损失Theta（时间价值），越临近到期衰减越快</li>
            <li><strong>波动率陷阱</strong>：重大事件前IV飙升导致期权很贵，事后Vega Crush可能血亏</li>
            <li><strong>杠杆双刃剑</strong>：现货涨10%不代表期权赚钱，要看行权价和剩余时间</li>
            <li><strong>流动性风险</strong>：太虚值或太远期的期权可能无法及时平仓</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>新手建议</strong>：从ATM期权开始，选择1-3个月到期的合约</li>
            <li><strong>仓位管理</strong>：用来买Call的钱不要超过总资金的10-20%</li>
            <li><strong>止损策略</strong>：权利金亏损50%以上考虑止损，别等到归零</li>
            <li><strong>滚动操作</strong>：盈利后可以部分止盈，剩余仓位滚动到更高行权价</li>
            <li><strong>配合技术分析</strong>：在关键支撑位附近买入，设置目标价位（如前高）</li>
          </ul>
        </div>
      `,
      pros: [
        '收益无限：理论上上行空间没有封顶，可充分享受牛市红利。',
        '风险锁定：最大亏损仅限于投入的权利金，不存在爆仓风险。',
        '资金利用率高：利用杠杆效应，以少量资金控制大额BTC名义价值。'
      ],
      cons: [
        '时间损耗 (Theta)：期权价值随时间流逝而衰减，若BTC价格上涨缓慢或横盘，仍可能亏损。',
        '胜率压力：不仅需要判断方向正确，还需涨幅足以覆盖权利金成本。'
      ]
    }
  },
  {
    id: 'bull-call-spread',
    name: '牛市看涨价差 (Bull Call Spread)',
    category: StrategyCategory.BULLISH,
    description: '买入低价Call，卖出高价Call。牺牲潜在暴利换取更低成本。',
    setup: '买入 Call A + 卖出 Call B (Strike B > A)',
    riskProfile: '风险有限 (净权利金)，收益有限 (价差 - 成本)。',
    idealScenario: 'BTC温和上涨。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
          <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-blue-800 text-sm">牛市看涨价差通过"买低卖高"降低成本，牺牲上方无限收益换取更高胜率。适合温和看涨行情。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入腿</p>
              <p class="text-sm text-slate-700">买入1份较低行权价Call</p>
              <p class="text-xs text-slate-600 mt-1">例：买入$100k Call，支付$5k</p>
            </div>
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出腿</p>
              <p class="text-sm text-slate-700">卖出1份较高行权价Call</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出$110k Call，收取$2k</p>
            </div>
          </div>
          <p class="text-sm text-slate-600 mt-3"><strong>净成本</strong> = $5k - $2k = $3k（远低于单买Call）</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-lg font-bold text-green-700 mb-2">价差 - 成本</div>
            <p class="text-xs text-slate-600">$110k-$100k-$3k=$7k</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$3k</div>
            <p class="text-xs text-slate-600">净成本（跌破买入价）</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$103k</div>
            <p class="text-xs text-slate-600">买入价+成本</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border border-purple-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期涨到$108k</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 涨到$110k：获得最大收益$7k（233%回报）</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 涨到$105k：赚$2k（67%回报），稳健盈利</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 跌到$95k：损失$3k，但比单买Call少亏</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg p-4">
            <p class="font-bold text-teal-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-teal-800 space-y-1 list-disc pl-5">
              <li>预期温和上涨（涨10-20%），有明确的目标价位</li>
              <li>隐含波动率处于高位，卖出期权能收取较高权利金</li>
              <li>技术分析显示关键阻力位清晰（可作为卖出价）</li>
              <li>新手想体验期权价差策略，降低持仓成本</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期暴涨行情（收益被卖出腿封顶，错失超额利润）</li>
              <li>波动率处于极低位（卖出期权收益太少，性价比不高）</li>
              <li>无明确目标价位（难以设定合理的卖出行权价）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>收益封顶风险</strong>：BTC突破卖出价后，无法享受超额收益，可能痛失大牛市</li>
            <li><strong>双腿流动性</strong>：需同时平仓两个期权，流动性差时可能有滑点损失</li>
            <li><strong>时间衰减不对称</strong>：虽然买卖期权都有Theta损耗，但卖出腿的收益有限，整体仍面临时间压力</li>
            <li><strong>提前行权风险</strong>：美式期权在分红或其他特殊情况下可能被提前行权（加密市场较少，但需注意交易所规则）</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价间隔</strong>：选择5-10%的strike间隔，平衡收益和胜率。间隔太小收益低，太大成本节省不明显</li>
            <li><strong>卖出价设定</strong>：将卖出Call的行权价设在关键阻力位（如前高、整数关口），技术上难以突破时收益最大化</li>
            <li><strong>到期时间选择</strong>：建议选择30-60天到期的合约，Theta decay效率高且时间足够价格上涨</li>
            <li><strong>提前平仓</strong>：当价格接近卖出价且时间价值所剩不多时，考虑提前平仓，避免被行权的麻烦</li>
            <li><strong>滚动策略</strong>：盈利后可以平仓当前价差，滚动到更高价位的新价差，持续捕捉上涨趋势</li>
            <li><strong>Delta 对冲</strong>：整体Delta为正但小于1，可适当配合现货对冲，构建Delta中性组合</li>
          </ul>
        </div>
      `,
      pros: [
        '成本优势：相比直接买入Call，该策略构建成本更低。',
        '抗波动性：卖出腿对冲了部分Vega风险，受隐含波动率下降的影响较小。',
        '胜率提升：较低的盈亏平衡点意味着价格只需小幅上涨即可获利。'
      ],
      cons: [
        '收益封顶：最大收益受限于两个行权价的差额，无法享受BTC暴涨带来的超额利润。',
        '交易成本：涉及两笔期权交易，手续费相对较高。'
      ]
    }
  },
  {
    id: 'bull-put-spread',
    name: '牛市看跌价差 (Bull Put Spread)',
    category: StrategyCategory.BULLISH,
    description: '卖出高价Put，买入低价Put保护。一种“收租”式的看涨策略。',
    setup: '卖出 Put A + 买入 Put B (Strike A > B)',
    riskProfile: '风险有限 (价差 - 权利金)，收益有限 (净权利金)。',
    idealScenario: 'BTC上涨或横盘 (不跌破卖出价)。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.03 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">牛市看跌价差 (Bull Put Spread) 是一种<strong>信用价差 (Credit Spread)</strong> 策略。你在建仓时收钱，目标是让期权自然过期作废，从而保留全部权利金。这是一种"收租"式的看涨策略，适合不跌即赚的心态。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出腿（主力）</p>
              <p class="text-sm text-slate-700">卖出1份较高行权价的 Put</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出 $95k Put，收取 $3k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入腿（保护）</p>
              <p class="text-sm text-slate-700">买入1份较低行权价的 Put</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 $85k Put，支付 $1k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净收入（Net Credit）</strong> = $3k - $1k = $2k</p>
            <p class="text-xs text-slate-600">这是你立即收到的现金，也是策略的最大潜在收益。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">$2k</div>
            <p class="text-xs text-slate-600">净权利金。BTC ≥ $95k 时全部保留</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">$8k</div>
            <p class="text-xs text-slate-600">($95k-$85k)-$2k。BTC ≤ $85k 时触发</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">盈亏平衡点</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$93k</div>
            <p class="text-xs text-slate-600">卖出价 - 净权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC现价 $100k，看不跌</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出1份 $95k Put（OTM 虚值），收 $3,000</li>
              <li>买入1份 $85k Put（更虚值），付 $1,000</li>
              <li>净收入 $2,000，立即到账</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景1：BTC涨到或维持在 $100k+</p>
              <p class="text-xs text-green-700 mt-1">两个Put都作废，保留全部 $2,000 权利金（100%收益率）。期权不用行权，省心省事。</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 场景2：BTC微跌到 $98k</p>
              <p class="text-xs text-yellow-700 mt-1">Put仍未实值，继续保留 $2,000。只要不跌破 $95k 都安全。</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 场景3：BTC暴跌到 $88k</p>
              <p class="text-xs text-red-700 mt-1">卖出的Put被行权，但买入的Put提供保护。最大亏损 $8,000。若没有买入保护，亏损会更大。</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期<strong>看不跌</strong>（包括上涨、横盘、微跌），不需要大涨也能盈利</li>
              <li>隐含波动率偏高时卖出，能收取更高权利金</li>
              <li>有明确的支撑位，可作为卖出Put的行权价</li>
              <li>想做"期权房东"，通过卖期权收租金</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期BTC可能大幅下跌（盈亏比不划算，小赚大亏）</li>
              <li>市场恐慌情绪严重，支撑位不明确</li>
              <li>波动率处于极低位（权利金太少，风险收益比差）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>盈亏比不对称</strong>：最大盈利$2k vs 最大亏损$8k，需要维持高胜率（通常需要70%+）才能长期盈利</li>
            <li><strong>Theta Decay是双刃剑</strong>：时间流逝对你有利，但最后几天若价格在卖出价附近，Gamma爆炸会导致剧烈波动</li>
            <li><strong>黑天鹅风险</strong>：突发事件导致暴跌时，即使有买入保护，仍会面临最大亏损</li>
            <li><strong>保证金占用</strong>：卖出期权需要缴纳保证金，资金利用率不如纯买入策略</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：卖出Put设在关键支撑位下方5-10%，给自己足够的安全边际</li>
            <li><strong>价差宽度</strong>：常用5-10%的价差，平衡收益和风险。价差越宽，收的钱越多但风险也越大</li>
            <li><strong>到期时间</strong>：建议选30-45天到期合约，Theta decay效率最高且时间足够</li>
            <li><strong>仓位管理</strong>：单个价差的最大亏损不要超过总资金的2-3%，允许多次试错</li>
            <li><strong>提前平仓</strong>：当赚到权利金的50-70%时，考虑提前平仓锁定利润，降低尾部风险</li>
            <li><strong>滚动收租</strong>：到期获利后，立即开新仓，持续收租。月均收益目标可设为3-5%</li>
          </ul>
        </div>
      `,
      pros: [
        '高胜率策略：只要BTC不出现大幅下跌（包括上涨、横盘、微跌），均可获利。',
        '风险可控：买入的低价Put锁定了极端行情下的最大亏损。',
        '时间价值受益：作为净卖方，时间流逝（Theta Decay）对策略有利。'
      ],
      cons: [
        '盈亏比限制：最大亏损通常大于最大盈利，需要维持高胜率以保证长期期望值为正。',
        '上行无关：BTC的大幅上涨不会增加策略收益，仅能赚取固定的权利金。'
      ]
    }
  },
  {
    id: 'synthetic-long',
    name: '合成多头 (Synthetic Long / Risk Reversal)',
    category: StrategyCategory.BULLISH,
    description: '买入Call + 卖出Put。模拟持有现货的损益曲线。',
    setup: '买入 ATM Call + 卖出 ATM Put',
    riskProfile: '风险收益几乎等同于持有1个BTC。',
    idealScenario: '看涨，且想用极低资金建立全额仓位。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">合成多头 (Synthetic Long) 通过<strong>买入Call + 卖出Put</strong>的组合，完美复制持有现货的损益曲线（Delta≈1）。这是一种极致的杠杆工具，让你用极少资金建立1 BTC的完整敞口，机构最爱。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>神奇的组合公式：</strong> Long Call + Short Put = Long Spot</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 ATM Call</p>
              <p class="text-sm text-slate-700">行权价 = 当前价格</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 $100k Call，付 $5k</p>
            </div>
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 ATM Put</p>
              <p class="text-sm text-slate-700">行权价 = 当前价格</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出 $100k Put，收 $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本 ≈ $0</strong></p>
            <p class="text-xs text-slate-600">ATM Call和Put的权利金基本相等，相互抵消。你只需支付卖Put的保证金（通常是名义价值的10-20%）。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">收益特征</div>
            <div class="text-2xl font-bold text-green-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">BTC涨多少赚多少，与现货一致</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">风险特征</div>
            <div class="text-2xl font-bold text-red-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">BTC跌多少亏多少，需追加保证金</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">Delta</div>
            <div class="text-2xl font-bold text-blue-700 mb-2">≈ 1.0</div>
            <p class="text-xs text-slate-600">与持有1 BTC现货等效</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，看大涨，资金有限</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓操作：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>买入1份 $100k Call，支付 $5,000</li>
              <li>卖出1份 $100k Put，收取 $5,000</li>
              <li>净成本 ≈ $0，仅需保证金 $10,000-$20,000</li>
            </ul>
          </div>
          <p class="text-xs text-slate-600 mb-3"><strong>对比</strong>：买1 BTC现货需要$100,000，而合成多头只需$10,000-$20,000保证金！</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ BTC涨到 $120k (+20%)</p>
              <p class="text-xs text-green-700 mt-1">Call行权赚$20k，Put作废。总盈利$20k，相当于持有1 BTC的收益</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ BTC横盘 $100k</p>
              <p class="text-xs text-yellow-700 mt-1">Call和Put都作废，盈亏为0（Theta互相抵消）</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ BTC跌到 $80k (-20%)</p>
              <p class="text-xs text-red-700 mt-1">Put被行权，需按$100k买入BTC。亏损$20k，需追加保证金。杠杆策略的风险！</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li><strong>极度看涨且资金有限</strong>：想建立满仓多头但现金不足</li>
              <li>机构对冲操作：在不动用现金的情况下快速建仓</li>
              <li>杠杆交易高手：能严格控制仓位和风险</li>
              <li>融资套利：借入低息资金做合成多头，赚取资金利率差</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>风险承受能力低的新手（下跌需追保，可能爆仓）</li>
              <li>保证金不足的账户（一旦暴跌可能被强平）</li>
              <li>波动率极高的市场（保证金要求会大幅提高）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>爆仓风险极高</strong>：BTC暴跌时需追加巨额保证金，否则会被强制平仓</li>
            <li><strong>资金效率陷阱</strong>：虽然名义杠杆很高，但保证金要求会随波动率上升而增加</li>
            <li><strong>滚动风险</strong>：到期前需要滚仓，可能面临不利的价格和波动率变化</li>
            <li><strong>Vega风险</strong>：虽然理论上Vega中性，但实际交易中Call和Put的IV可能分离（Skew），导致净Vega暴露</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>仓位控制</strong>：合成多头的名义价值不要超过总资金的3-5倍，给自己足够的安全垫</li>
            <li><strong>保证金储备</strong>：至少预留50%以上的初始保证金作为储备，应对不利波动</li>
            <li><strong>止损纪律</strong>：设定明确的止损线（如亏损10-15%），严格执行</li>
            <li><strong>选择流动性好的合约</strong>：确保能随时平仓，避免被套</li>
            <li><strong>监控Delta</strong>：定期检查组合Delta是否接近1，必要时调整</li>
            <li><strong>滚仓规划</strong>：临近到期前15-30天开始规划滚仓，避免最后时刻被动</li>
          </ul>
        </div>
      `,
      pros: [
        '极高杠杆：无需全额资金即可获得1 BTC的名义敞口，大幅提高资金利用率。',
        'Theta中性：ATM Call和Put的时间价值损耗相互抵消，理论上不受时间流逝影响。'
      ],
      cons: [
        '下行风险：与持有现货面临相同的下跌亏损风险，若价格大幅下跌需追加保证金。',
        '爆仓风险：高杠杆意味着波动容忍度降低，需严格控制仓位以防爆仓。'
      ]
    }
  },
  {
    id: 'call-ratio-backspread',
    name: '看涨比例反向价差 (Call Ratio Backspread)',
    category: StrategyCategory.BULLISH,
    description: '卖出1份低价Call，买入2份高价Call。',
    setup: '卖出 1x ITM Call + 买入 2x OTM Call',
    riskProfile: '下行风险有限，上行收益无限且加倍。',
    idealScenario: '极度看涨，认为会有史诗级暴涨。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.06 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">看涨比例反向价差是一种<strong>激进的暴涨策略</strong>。通过卖1买2（或1:3）的不对称比例，用卖出期权的收入购买更多虚值Call，在BTC暴涨时获得加倍收益。但有"死谷"风险，适合极度看涨且愿意承担复杂性的高手。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>比例魔法：1:2 或 1:3</strong></p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-rose-50 p-4 rounded border border-rose-200">
              <p class="font-bold text-rose-700 mb-2">📉 卖出 1份 ITM/ATM Call</p>
              <p class="text-sm text-slate-700">行权价较低，权利金较高</p>
              <p class="text-xs text-slate-600 mt-1">例：卖出 $95k Call，收 $6k</p>
            </div>
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 买入 2份 OTM Call</p>
              <p class="text-sm text-slate-700">行权价较高，权利金较低</p>
              <p class="text-xs text-slate-600 mt-1">例：买入 2×$105k Call，付 $5k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $5k - $6k = <strong>-$1k（净收入！）</strong></p>
            <p class="text-xs text-slate-600">理想情况下，这个策略可以实现零成本甚至净收入建仓。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">暴涨收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">∞ × 2</div>
            <p class="text-xs text-slate-600">双倍Call带来加速上涨收益</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">死谷风险</div>
            <div class="text-lg font-bold text-red-700 mb-2">有限但痛苦</div>
            <p class="text-xs text-slate-600">价格停在买入价时亏损最大</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">下跌保护</div>
            <div class="text-lg font-bold text-blue-700 mb-2">净权利金</div>
            <p class="text-xs text-slate-600">暴跌时反而赚钱（如果净收入）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预期要暴涨</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>建仓 1:2 Ratio:</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出 1份 $95k Call，收 $6,000</li>
              <li>买入 2份 $105k Call，付 $2,500 × 2 = $5,000</li>
              <li>净收入 $1,000！</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ BTC暴涨到 $120k</p>
              <p class="text-xs text-green-700 mt-1">卖出腿亏 $25k，买入腿赚 $30k × 2 = $60k。总盈利 $35k + $1k = <strong>$36k</strong>！是单买Call收益的2倍多</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 死谷：BTC涨到 $105k</p>
              <p class="text-xs text-red-700 mt-1">卖出腿亏 $10k，买入腿刚好平值作废。最大亏损 $9k（-$10k + $1k），这就是"Valley of Death"</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ BTC跌到 $90k</p>
              <p class="text-xs text-yellow-700 mt-1">所有Call作废，保留净收入 $1k。暴跌反而赚钱（虽然不多）</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li>预期<strong>史诗级暴涨</strong>（如突破长期压力位，直冲新高）</li>
              <li>重大利好事件前（如ETF批准、减半后的超级牛市启动）</li>
              <li>隐含波动率偏低时建仓（买Call便宜且Vega有利）</li>
              <li>想用低成本甚至零成本博取暴涨收益</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期温和上涨（容易掉入死谷区）</li>
              <li>对比例策略不熟悉的新手（构建和管理复杂）</li>
              <li>临近到期时建仓（Gamma风险极大）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>死谷风险（Valley of Death）</strong>：价格停在买入Call的行权价附近时亏损最大，这是此策略的致命弱点</li>
            <li><strong>比例失衡风险</strong>：如果比例设置不当（如1:1.5），可能导致风险收益比不划算</li>
            <li><strong>Gamma爆炸</strong>：临近到期时，死谷区的Gamma极高，价格微小波动会导致盈亏剧烈变化</li>
            <li><strong>构建复杂度</strong>：需要精确计算两个行权价和比例，一旦出错损失巨大</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>比例选择</strong>：1:2 是最常见比例，平衡收益和风险。1:3 更激进但死谷更大</li>
            <li><strong>行权价间隔</strong>：两个行权价间隔10-15%，太窄死谷区太大，太宽构建成本高</li>
            <li><strong>零成本目标</strong>：尽量构建成净收入或零成本，这样即使暴跌也不亏钱</li>
            <li><strong>死谷监控</strong>：价格接近买入Call行权价时，考虑提前平仓或调整仓位</li>
            <li><strong>暴涨平仓</strong>：一旦暴涨盈利达50-100%，考虑分批止盈，别贪心等涨到天上</li>
            <li><strong>避免临期</strong>：至少选择60天以上到期的合约，避免Gamma风险</li>
          </ul>
        </div>
      `,
      pros: [
        '低成本构建：若构建得当，可实现零成本甚至净权利金收入（Net Credit）。',
        '暴涨收益加倍：持有双倍的多头头寸，上行杠杆效应显著。',
        '下行保护：若市场反向暴跌，仅损失构建成本或保留净权利金收益。'
      ],
      cons: [
        '死谷风险（Valley of Death）：若价格在到期时停留在两个行权价之间，将面临最大亏损。',
        '构建复杂：需要精确计算比例和行权价选择，以优化风险收益比。'
      ]
    }
  },
  {
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
  },
  {
    id: 'cash-secured-put',
    name: '备兑看跌/现金担保卖普 (Cash Secured Put)',
    category: StrategyCategory.BULLISH,
    description: '卖出Put并持有现金。意在低价接盘或赚权利金。',
    setup: '卖出 Put',
    riskProfile: '风险较大 (接盘后继续跌)，收益固定。',
    idealScenario: '横盘或微涨，愿意低位买币。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: `
        <div class="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 p-5 rounded-lg mb-6">
          <p class="text-emerald-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-emerald-800 text-sm">现金担保卖普 (Cash Secured Put) 是<strong>价值投资者的抄底神器</strong>。你在心目中的理想价位卖Put，如果跌到就低价接盘，如果不跌就白赚权利金。这比傻等挂单更聪明，相当于别人付钱让你等待买入机会。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-slate-700 mb-3"><strong>一步到位的简单策略</strong></p>
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📉 卖出 OTM Put</p>
            <p class="text-sm text-slate-700">行权价 = 你愿意买入的价格</p>
            <p class="text-xs text-slate-600 mt-2">例：BTC $100k，你想$90k抄底</p>
            <p class="text-xs text-slate-600">卖出 $90k Put，收 $2,500</p>
          </div>
          <div class="bg-amber-50 p-4 rounded mt-3 border border-amber-200">
            <p class="text-sm text-amber-900 mb-2"><strong>⚠️ 资金要求（Cash Secured）</strong></p>
            <p class="text-xs text-amber-800">必须在账户准备足额现金（$90k），以防被行权时有钱接盘。这是"现金担保"的含义。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="text-xs text-green-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-green-700 mb-2">$2.5k</div>
            <p class="text-xs text-slate-600">权利金。BTC不跌破$90k时全部保留</p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大风险</div>
            <div class="text-lg font-bold text-red-700 mb-2">$87.5k</div>
            <p class="text-xs text-slate-600">BTC归零时：$90k - $2.5k（权利金抵消）</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">实际成本</div>
            <div class="text-lg font-bold text-blue-700 mb-2">$87.5k</div>
            <p class="text-xs text-slate-600">行权价 - 权利金</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，你想$90k抄底建仓</p>
          <div class="bg-white/70 rounded p-4 mb-3">
            <p class="text-sm text-slate-700 mb-2"><strong>操作步骤：</strong></p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>卖出1份 $90k Put（30天到期），收 $2,500</li>
              <li>账户准备 $90,000 现金作担保</li>
              <li>耐心等待到期</li>
            </ul>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 场景1：BTC停在 $100k 或更高</p>
              <p class="text-xs text-green-700 mt-1">Put作废，保留全部 $2,500。年化收益 = $2,500/$90,000 × 12 = <strong>33%</strong>！可以继续卖下一期</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 场景2：BTC跌到 $90k</p>
              <p class="text-xs text-blue-700 mt-1">被行权，按$90k接盘。实际成本 $87.5k（比直接挂单便宜$2.5k），完美抄底！</p>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p class="text-sm font-bold text-yellow-800">⚠️ 场景3：BTC暴跌到 $80k</p>
              <p class="text-xs text-yellow-700 mt-1">被行权按$90k接盘，账面浮亏 $10k。但权利金抵消$2.5k，实际亏损$7.5k。比直接$100k买入亏得少</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
              <li><strong>价值投资者等待抄底</strong>：有明确的心理价位想买入</li>
              <li>BTC长期看涨但短期回调时逢低建仓</li>
              <li>想通过"收租"提高现金利用率（空仓时也能赚钱）</li>
              <li>已有部分现金准备定投，不如用来卖Put赚权利金</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>不想持有现货、纯粹投机（被行权后被迫持币）</li>
              <li>预期BTC会暴跌超过20%（接盘后浮亏巨大）</li>
              <li>没有足额现金（无法Cash Secured，会被强平）</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>接盘后继续跌</strong>：被行权后BTC继续暴跌，会面临账面浮亏（虽然长期持有者不care）</li>
            <li><strong>机会成本</strong>：现金锁死在担保中，无法用于其他投资机会</li>
            <li><strong>错过牛市</strong>：如果BTC直接起飞不回调，你只赚权利金错过大涨</li>
            <li><strong>滚动风险</strong>：如果想持续卖Put收租，需要每月滚仓，遇到IV低迷时权利金会很少</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：设在技术支撑位或整数关口下方5-10%，提高不被行权的概率</li>
            <li><strong>到期时间</strong>：30-45天最优，Theta Decay效率高。太短风险大，太长权利金少</li>
            <li><strong>分批抄底</strong>：不要All In一次，分3-5批不同价位卖Put，降低平均成本</li>
            <li><strong>滚动收租</strong>：到期未被行权后，立即卖下一期，月月收租。年化可达20-40%</li>
            <li><strong>组合策略</strong>：持币后可加Covered Call（备兑看涨），双向收租</li>
            <li><strong>Delta监控</strong>：Put的Delta越接近-0.3时，被行权概率约30%，可作参考</li>
          </ul>
        </div>
      `,
      pros: [
        '降低建仓成本：实际买入成本为行权价减去收取的权利金。',
        '现金流增强：在等待买入机会的同时，持续获取权利金收入。'
      ],
      cons: [
        '踏空风险：若BTC价格直接上涨，投资者仅获得权利金，错失资产增值机会。',
        '下行风险：若BTC价格暴跌穿透行权价，投资者必须按原定价格接盘，面临浮亏。'
      ]
    }
  },

  // ==========================================
  // BEARISH STRATEGIES
  // ==========================================
  {
    id: 'long-put',
    name: '买入看跌期权 (Long Put)',
    category: StrategyCategory.BEARISH,
    description: '基础做空策略。支付权利金，获得高价卖出的权利。',
    setup: '买入 Put',
    riskProfile: '风险有限，收益巨大 (直到归零)。',
    idealScenario: 'BTC大幅下跌。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>买入看跌期权 (Long Put)</strong> 是最直接的做空策略。它赋予买方在到期日之前或当天以特定价格（行权价）卖出BTC的权利。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">这相当于给你的资产买了一份保险，或者单纯地赌价格下跌。如果BTC价格跌破行权价，期权价值会迅速上升。与做空期货不同，Long Put不需要缴纳保证金，也不会爆仓，最大损失仅限于权利金。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>操作</strong>: 买入一份 Put Option。</li>
          <li><strong>行权价选择</strong>:
            <ul class="list-circle pl-5 mt-1 text-slate-600">
              <li><em>实值 (ITM)</em>: 价格较高，Delta大，类似持有空单。</li>
              <li><em>虚值 (OTM)</em>: 便宜，杠杆大，适合博取黑天鹅暴跌。</li>
            </ul>
          </li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 几乎无限（直到BTC归零）。</li>
          <li><strong>最大亏损</strong>: 支付的权利金。</li>
          <li><strong>盈亏平衡点</strong>: 行权价 - 支付的权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>强烈看空</strong>或<strong>需要保护现货</strong>（Protective Put）的场景。如果你持有大量BTC现货，买入Put可以锁定你的最低卖出价，让你在熊市中也能安然入睡。</p>
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
  },
  {
    id: 'bear-put-spread',
    name: '熊市看跌价差 (Bear Put Spread)',
    category: StrategyCategory.BEARISH,
    description: '买入高价Put，卖出低价Put。降低做空成本。',
    setup: '买入 Put A + 卖出 Put B (Strike A > B)',
    riskProfile: '风险有限，收益有限。',
    idealScenario: 'BTC温和下跌。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>熊市看跌价差 (Bear Put Spread)</strong> 是一种降低成本的做空策略。通过“买高卖低”的方式构建。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你觉得BTC会跌，但不会跌到归零。所以你买入一个Put赚钱，同时卖出一个更低价的Put来抵消成本。这限制了你的最大收益，但也显著降低了你的入场门槛。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>买入腿</strong>: 买入一份较高行权价的 Put (Put A)。</li>
          <li><strong>卖出腿</strong>: 卖出一份较低行权价的 Put (Put B)。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>成本</strong>: 买入Put A的权利金 - 卖出Put B的权利金。</li>
          <li><strong>最大收益</strong>: (行权价A - 行权价B) - 净成本。当价格跌破B时收益封顶。</li>
          <li><strong>最大亏损</strong>: 净成本。</li>
          <li><strong>盈亏平衡点</strong>: 行权价A - 净成本。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>温和看空</strong>的行情。例如你认为BTC会从10万跌到8万，但很难跌破7万。这是一个性价比很高的做空策略。</p>
      `,
      pros: [
        '成本效益：相比直接买入Put，构建成本显著降低。',
        '目标明确：适合有明确目标价位的技术性做空交易。'
      ],
      cons: [
        '收益封顶：若发生黑天鹅事件导致价格暴跌，策略收益在低行权价处封顶，无法享受后续利润。'
      ]
    }
  },
  {
    id: 'bear-call-spread',
    name: '熊市看涨价差 (Bear Call Spread)',
    category: StrategyCategory.BEARISH,
    description: '卖出低价Call，买入高价Call保护。做空赚取权利金。',
    setup: '卖出 Call A + 买入 Call B (Strike A < B)',
    riskProfile: '风险有限，收益有限 (净权利金)。',
    idealScenario: 'BTC下跌或横盘 (不涨破卖出价)。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.03 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>熊市看涨价差 (Bear Call Spread)</strong> 是一种<strong>信用价差 (Credit Spread)</strong> 策略。你的目标是赚取权利金，赌BTC不会大涨。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你卖出一个低价Call（看空），同时买入一个高价Call做保护。只要BTC不涨破你的卖出价，你就白赚这笔钱。这是一种胜率很高的“收租”策略。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>卖出腿</strong>: 卖出一份较低行权价的 Call (Call A)。</li>
          <li><strong>买入腿</strong>: 买入一份较高行权价的 Call (Call B)。</li>
          <li><strong>净现金流</strong>: 收到权利金 (Net Credit)。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 收到的净权利金。</li>
          <li><strong>最大亏损</strong>: (行权价B - 行权价A) - 净权利金。</li>
          <li><strong>盈亏平衡点</strong>: 行权价A + 净权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>看不涨</strong>（即看跌或横盘）的行情。如果你觉得上方阻力重重，BTC很难突破前高，就可以用这个策略来“收租”。</p>
      `,
      pros: [
        '高胜率：只要市场不涨（下跌、横盘、微涨）均可获利。',
        '风险锁定：买入的保护性Call限制了极端上涨行情的亏损上限。'
      ],
      cons: [
        '盈亏比不佳：通常最大亏损高于最大盈利，属于“高胜率、低赔率”策略。'
      ]
    }
  },
  {
    id: 'put-ratio-backspread',
    name: '看跌比例反向价差 (Put Ratio Backspread)',
    category: StrategyCategory.BEARISH,
    description: '卖出1份高价Put，买入2份低价Put。',
    setup: '卖出 1x ITM Put + 买入 2x OTM Put',
    riskProfile: '上行风险有限，下行收益巨大。',
    idealScenario: '极度看跌，防范崩盘。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.06 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>看跌比例反向价差 (Put Ratio Backspread)</strong> 是一种做空波动率的激进策略。利用卖出期权的钱买入更多份数的虚值Put。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你卖出1份贵的Put，买入2份便宜的Put。如果市场微跌，你可能亏钱；但如果市场<strong>崩盘</strong>，你手里的双倍Put会让你赚得盆满钵满。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>卖出</strong>: 1份实值/平值 Put。</li>
          <li><strong>买入</strong>: 2份或更多虚值 Put。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 极大。随着价格下跌，收益加速。</li>
          <li><strong>最大亏损</strong>: 有限。发生在价格停在买入Put的行权价时。</li>
          <li><strong>上行保护</strong>: 如果BTC反而大涨，所有Put作废，你反而能赚到净权利金（如果有）。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>预期会有史诗级崩盘</strong>的行情。例如交易所暴雷、监管黑天鹅等。这是一种极具爆发力的做空策略。</p>
      `,
      pros: [
        '黑天鹅利器：在市场发生剧烈崩盘时，双倍的Put头寸将产生巨额收益。',
        '上行保护：若市场反而大幅上涨，策略可能仅损失微小成本或保留净权利金。'
      ],
      cons: [
        '死谷风险：若价格在到期时停留在两个行权价之间，将面临最大亏损。'
      ]
    }
  },
  {
    id: 'strip',
    name: '空头条式组合 (Strip)',
    category: StrategyCategory.BEARISH,
    description: '买入1份Call，买入2份Put。看多波动率但更看跌。',
    setup: '买入 1x Call + 买入 2x Put (同Strike)',
    riskProfile: '风险有限，收益无限 (下跌赚双倍)。',
    idealScenario: '变盘在即，且向下破位概率大。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>空头条式组合 (Strip)</strong> 是跨式组合（Straddle）的变体，带有强烈的<strong>看跌偏见</strong>。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你买入<strong>2个Put</strong> + 1个Call。这意味着你认为变盘在即，且向下暴跌的概率远大于向上突破。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>买入</strong>: 2份平值 Put。</li>
          <li><strong>买入</strong>: 1份平值 Call。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>下跌收益</strong>: 极高。双倍Put带来双倍快乐。</li>
          <li><strong>上涨收益</strong>: 有，但较慢。靠那1份Call赚钱。</li>
          <li><strong>最大亏损</strong>: 3份期权的权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>变盘节点且看空</strong>。例如关键支撑位岌岌可危，你觉得大概率破位暴跌，但为了防范假摔后拉升，保留了一份Call做对冲。</p>
      `,
      pros: [
        '极佳的做空爆发力：在市场暴跌时提供双倍杠杆收益。',
        '对冲反向风险：若判断失误市场暴涨，持有的Call能挽回部分损失甚至盈利。'
      ],
      cons: [
        '成本高昂：构建该组合需要支付三份权利金。',
        '横盘风险：若市场进入低波动震荡，时间价值的损耗将导致严重亏损。'
      ]
    }
  },
  {
    id: 'naked-call',
    name: '裸卖看涨 (Naked Call)',
    category: StrategyCategory.BEARISH,
    description: '直接卖出Call。风险极高。',
    setup: '卖出 Call',
    riskProfile: '收益有限，风险无限。',
    idealScenario: '坚决看跌或横盘。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '裸卖看涨（Naked Call）是指在没有现货保护的情况下直接卖出Call。这是风险极高的策略。若BTC价格突破行权价，卖方必须以市场价买入BTC并按行权价卖出，理论上BTC价格可上涨至无限高，因此潜在亏损也是无限的。',
      pros: [
        '高胜率：在大概率的横盘或下跌行情中均可获利。'
      ],
      cons: [
        '毁灭性风险：一次极端的暴涨行情可能导致账户穿仓甚至破产。',
        '高保证金要求：交易所通常要求极高的维持保证金，资金利用率低。'
      ]
    }
  },

  // ==========================================
  // NEUTRAL STRATEGIES
  // ==========================================
  {
    id: 'short-straddle',
    name: '卖出跨式 (Short Straddle)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出ATM Call和Put。做空波动率，赌价格不动。',
    setup: '卖出 ATM Call + 卖出 ATM Put',
    riskProfile: '收益巨大 (双份权利金)，风险无限。',
    idealScenario: 'BTC价格死死钉在行权价。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: '卖出跨式（Short Straddle）是最激进的做空波动率策略。投资者同时卖出平值（ATM）的Call和Put，收取最大化的权利金。该策略假设市场将进入极度低波动的横盘状态，价格将停留在行权价附近。',
      pros: [
        '最大化权利金收入：ATM期权拥有最高的时间价值。',
        'Theta收益：时间衰减速度极快，对卖方非常有利。'
      ],
      cons: [
        '无限风险：一旦市场出现方向性突破（无论涨跌），亏损将迅速扩大且无上限。',
        '管理难度大：需要极强的风控能力和动态对冲技巧。'
      ]
    }
  },
  {
    id: 'short-strangle',
    name: '卖出宽跨式 (Short Strangle)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出OTM Call和Put。比跨式安全一点，容错空间更大。',
    setup: '卖出 OTM Call + 卖出 OTM Put',
    riskProfile: '收益有限，风险无限。',
    idealScenario: 'BTC在一定区间内震荡。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '卖出宽跨式（Short Strangle）是卖出跨式的稳健版本。投资者卖出虚值（OTM）的Call和Put，构建一个盈利区间。虽然收取的权利金较少，但策略允许BTC在一定范围内波动，只要不突破上下行权价即可获利。',
      pros: [
        '胜率提升：相比跨式策略，获利区间更宽，容错率更高。',
        '灵活性：可根据对支撑阻力的判断调整行权价。'
      ],
      cons: [
        '黑天鹅风险：若价格突破区间，风险依然是无限的，需严格止损。'
      ]
    }
  },
  {
    id: 'iron-condor',
    name: '铁鹰式 (Iron Condor)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出宽跨式 + 买入更远期权做保护。最受欢迎的震荡策略。',
    setup: '卖出 OTM Call/Put + 买入 深OTM Call/Put',
    riskProfile: '风险有限，收益有限。',
    idealScenario: 'BTC在宽幅区间内震荡。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>铁鹰 (Iron Condor)</strong> 是铁蝴蝶的「宽松版」。它给了市场更大的活动空间，但最大收益也相应减少。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你卖出两个不同行权价的期权（一个Call一个Put，都是虚值），然后买入更虚值的Call和Put做保护。这构建了一个「盈利区间」，只要价格在这个区间内，你就赚钱。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>卖出</strong>: 1份虚值 Call（上方）。</li>
          <li><strong>卖出</strong>: 1份虚值 Put（下方）。</li>
          <li><strong>买入</strong>: 1份更虚值 Call（保护上方）。</li>
          <li><strong>买入</strong>: 1份更虚值 Put（保护下方）。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 净权利金。只要价格在两个卖出价之间，你就全赚。</li>
          <li><strong>最大亏损</strong>: (价差宽度) - 净权利金。</li>
          <li><strong>胜率</strong>: 很高，因为盈利区间宽。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>低波动率环境</strong>。这是机构最爱的「收租」策略之一。比如BTC在9万到11万之间来回震荡，你就可以每个月卖一次Iron Condor，持续收租。</p>
      `,
      pros: [
        '风险严格受控：最大亏损已知且有限，适合稳健型投资者。',
        '方向中性：无需预测市场方向，只需判断波动区间。'
      ],
      cons: [
        '收益折损：买入保护性期权支出了部分权利金，降低了潜在收益。',
        '交易成本：涉及四条腿的交易，佣金成本较高。'
      ]
    }
  },
  {
    id: 'iron-butterfly',
    name: '铁蝶式 (Iron Butterfly)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出跨式 + 买入保护。追求最大化权利金的有限风险策略。',
    setup: '卖出 ATM Call/Put + 买入 OTM Call/Put',
    riskProfile: '风险有限，收益较高 (相对铁鹰)。',
    idealScenario: 'BTC精准停留在现价。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.01 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>铁蝴蝶 (Iron Butterfly)</strong> 是一种高级的中性策略。它通过四条腿的组合，构建出一个「收益有限、风险有限」的对称结构。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你卖出一个Straddle（收钱），然后买入一个Strangle（付钱但更便宜）来保护自己。这样你既能赚取权利金，又不用担心暴涨暴跌带来的无限亏损。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>卖出</strong>: 1份平值 Call + 1份平值 Put（收大钱）。</li>
          <li><strong>买入</strong>: 1份虚值 Call + 1份虚值 Put（付小钱保护）。</li>
          <li><strong>净现金流</strong>: 收到权利金 (Net Credit)。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 净权利金。当价格正好停在中间行权价时达到。</li>
          <li><strong>最大亏损</strong>: (外侧行权价 - 中间行权价) - 净权利金。</li>
          <li><strong>盈利区间</strong>: 在两个盈亏平衡点之间，是一个「舒适区」。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>预期横盘震荡</strong>的行情。这是一种「卖波动率」的策略。如果BTC在一个箱体内来回震荡，你就躺赚权利金。但如果突然暴涨暴跌，你会有限损失。</p>
      `,
      pros: [
        '高收益潜力：核心部位为ATM期权，权利金收入丰厚。',
        '风险受控：两翼的保护腿锁定了极端行情的亏损上限。'
      ],
      cons: [
        '获利难度：需要价格在到期时非常接近中心行权价，对点位要求较高。'
      ]
    }
  },
  {
    id: 'long-call-butterfly',
    name: '买入看涨蝶式 (Long Call Butterfly)',
    category: StrategyCategory.NEUTRAL,
    description: '利用三个行权价构建“利润尖塔”。低成本博取精准点位。',
    setup: '买入 1x 低Call + 卖出 2x 中Call + 买入 1x 高Call',
    riskProfile: '风险极低，收益有限但倍率高。',
    idealScenario: 'BTC到期时精准停在中间行权价。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 }, // Sell 2x
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '买入看涨蝶式（Long Call Butterfly）是一种低成本、高赔率的策略。投资者利用三个等距的行权价构建组合，旨在押注价格将收敛于中间行权价。该策略通常用于捕捉市场对某一特定价格（如最大痛点 Max Pain）的回归。',
      pros: [
        '极低成本：构建成本通常非常低廉。',
        '高盈亏比：若判断精准，收益率可达投入成本的数倍甚至十倍。'
      ],
      cons: [
        '低胜率：价格必须精准落在目标区间内，稍微偏离即可能导致全额亏损（尽管本金较少）。',
        '区间外亏损：若价格大幅波动超出区间，策略将损失全部投入本金。'
      ]
    }
  },
  {
    id: 'short-guts',
    name: '卖出内陷宽跨式 (Short Guts)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出ITM Call和ITM Put。极度激进的做空波动率。',
    setup: '卖出 ITM Call + 卖出 ITM Put',
    riskProfile: '收益巨大，风险无限。',
    idealScenario: 'BTC价格回归到两行权价中间。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.08 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.08 }
    ],
    detailedAnalysis: {
      explanation: '卖出内陷宽跨式（Short Guts）是一种极度激进的策略。投资者卖出深实值（ITM）的Call和Put。该策略不仅做空波动率，还押注价格会收敛至两个行权价之间。由于涉及实值期权，权利金收入极高。',
      pros: [
        '巨额权利金：收取的权利金远高于其他中性策略。'
      ],
      cons: [
        '流动性风险：深实值期权通常流动性较差，点差较大。',
        '极高风险：任何大幅波动都可能导致巨额亏损，且提前被行权的风险较高。'
      ]
    }
  },

  // ==========================================
  // VOLATILITY STRATEGIES
  // ==========================================
  {
    id: 'long-straddle',
    name: '买入跨式 (Long Straddle)',
    category: StrategyCategory.VOLATILITY,
    description: '买入ATM Call和Put。赌大变盘，方向不限。',
    setup: '买入 Call + 买入 Put (同Strike)',
    riskProfile: '风险有限 (权利金)，收益无限。',
    idealScenario: 'BTC发生剧烈暴涨或暴跌。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>跨式组合 (Long Straddle)</strong> 是最经典的做多波动率策略。你不关心涨跌方向，只在乎市场会剧烈波动。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">同时买入同一行权价的Call和Put。无论BTC暴涨还是暴跌，总有一边会大赚。这是一种「方向无关」的策略，你唯一的敌人是横盘。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>买入</strong>: 1份平值 (ATM) Call。</li>
          <li><strong>买入</strong>: 1份平值 (ATM) Put。</li>
          <li><strong>行权价</strong>: 通常相同，都选ATM。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 无限。无论哪个方向暴动，你都赚。</li>
          <li><strong>最大亏损</strong>: 两份期权的权利金总和。如果横盘到期，全部作废。</li>
          <li><strong>盈亏平衡点</strong>: 有两个，分别是行权价 ± 总权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>重大事件前夜</strong>。例如美联储利率决议、重大监管政策发布、减半前夕等。你知道会出大事，但不确定方向。唯一的风险是「利好/利空出尽」导致市场横盘。</p>
      `,
      pros: [
        '方向中性：无需预测涨跌方向，只需确认会有大行情。',
        '收益无限：若出现单边极端行情，收益潜力巨大。'
      ],
      cons: [
        '高昂成本：购买两份ATM期权，权利金支出很高。',
        'Theta损耗：时间价值每天双倍流逝，若行情震荡，亏损速度极快。'
      ]
    }
  },
  {
    id: 'long-strangle',
    name: '买入宽跨式 (Long Strangle)',
    category: StrategyCategory.VOLATILITY,
    description: '买入OTM Call和Put。成本低，但需要更大波动。',
    setup: '买入 OTM Call + 买入 OTM Put',
    riskProfile: '风险有限，收益无限。',
    idealScenario: 'BTC发生超大幅度波动。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>宽跨式组合 (Long Strangle)</strong> 是跨式组合的「节俭版」。通过选择虚值期权来降低成本，但代价是需要更大的波动才能盈利。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">买入一个虚值Call + 买入一个虚值Put。相比Straddle，成本更低，但需要更剧烈的波动才能赚钱。这是一种「低成本博大波动」的策略。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>买入</strong>: 1份虚值 (OTM) Call（例如105%）。</li>
          <li><strong>买入</strong>: 1份虚值 (OTM) Put（例如95%）。</li>
          <li><strong>成本</strong>: 远低于Straddle。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: 无限。</li>
          <li><strong>最大亏损</strong>: 两份期权的权利金（比Straddle少很多）。</li>
          <li><strong>盈亏平衡点</strong>: Call行权价 + 总权利金；Put行权价 - 总权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>预期会有剧烈波动，但不确定方向</strong>的行情。相比Straddle，它需要更大的涨跌幅才能盈利，但初始投入更少。适合「穷人版」的波动率交易。</p>
      `,
      pros: [
        '低成本博弈：适合资金量较小但想博取黑天鹅事件的投资者。'
      ],
      cons: [
        '低胜率：大部分时间内，虚值期权最终会归零。',
        '高波动要求：需要极端的市场波动才能覆盖成本并获利。'
      ]
    }
  },

  // ==========================================
  // INCOME / HEDGE STRATEGIES
  // ==========================================
  {
    id: 'covered-call',
    name: '备兑看涨 (Covered Call)',
    category: StrategyCategory.INCOME,
    description: '持币卖Call。币本位增强收益神器。',
    setup: '持有现货 + 卖出 Call',
    riskProfile: '下行风险同现货，上行收益封顶。',
    idealScenario: 'BTC慢牛或横盘。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>备兑开仓 (Covered Call)</strong> 是持币者最常用的「增强收益」策略。它让你的现货持仓能够持续产生现金流。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你已经持有1个BTC现货，然后卖出1个虚值Call。如果BTC不涨，你白赚权利金；如果BTC涨破行权价，你就被迫以该价格卖币（但也赚了涨幅+权利金）。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>持有</strong>: 1 BTC 现货。</li>
          <li><strong>卖出</strong>: 1份虚值 (OTM) Call。</li>
          <li><strong>收入</strong>: 立即收到权利金。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大收益</strong>: (行权价 - 现货买入价) + 权利金。收益被封顶。</li>
          <li><strong>风险</strong>: 如果BTC暴跌，你仍然持有现货，会亏损（但至少有权利金做缓冲）。</li>
          <li><strong>机会成本</strong>: 如果BTC暴涨超过行权价很多,你会后悔卖Call。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>长期持币者</strong>或<strong>牛市震荡期</strong>。例如你持有BTC打算长期持有，但短期不看大涨，就可以每月卖Call来增强收益。这是美股、币圈最流行的「T+0」策略。</p>
      `,
      pros: [
        '收益增强：在持币待涨的过程中额外获取年化10%-30%的现金流。',
        '降低成本：权利金收入实质上降低了现货的持仓成本。'
      ],
      cons: [
        '卖飞风险：在超级大牛市中，收益被行权价锁定，错失主升浪的超额利润。'
      ]
    }
  },
  {
    id: 'protective-put',
    name: '保护性看跌 (Protective Put)',
    category: StrategyCategory.INCOME,
    description: '持币买Put。给现货买保险。',
    setup: '持有现货 + 买入 Put',
    riskProfile: '最大亏损锁定，上行收益无限。',
    idealScenario: '看好长期但担心短期黑天鹅。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: `
        <p class="mb-4"><strong>保护性看跌 (Protective Put)</strong> 是给你的币买保险。无论BTC跌多深，你的损失都有底线。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你持有1个BTC，但担心熊市来袭。于是买入1个Put作为保险。这个Put锁定了你的最低卖出价，相当于给资产加了「止损线」，但保留了上涨的全部空间。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>持有</strong>: 1 BTC 现货。</li>
          <li><strong>买入</strong>: 1份虚值或平值 Put。</li>
          <li><strong>成本</strong>: 需支付权利金（保险费）。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大亏损</strong>: (现货价 - Put行权价) + 权利金。亏损被锁定。</li>
          <li><strong>最大收益</strong>: 无限。BTC涨多少你就赚多少（减去权利金）。</li>
          <li><strong>心理优势</strong>: 让你能安心持币，不会因恐慌而割肉。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>长期看涨但短期不确定</strong>的情况。例如减半后的牛市，你想持币但怕回调太深。或者重大事件前（如美联储决议），给持仓买个保险。机构常在财报季给股票买Put，币圈也一样。</p>
      `,
      pros: [
        '下行保护：消除恐慌，无惧任何黑天鹅事件。',
        '保留上行：不像卖出期货对冲那样锁死利润，该策略不限制上涨收益。'
      ],
      cons: [
        '保险成本：购买Put需要持续支付权利金，长期来看会拖累整体投资组合的收益率。'
      ]
    }
  },
  {
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
        <p class="mb-4"><strong>领口策略 (Collar)</strong> 是Covered Call和Protective Put的结合体。它构建了一个「保底封顶」的安全区间。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">1. 策略概念</h4>
        <p class="mb-4">你持有BTC现货，买入Put做保护（防暴跌），同时卖出Call（收权利金来抵消Put的成本）。最终你得到一个零成本或低成本的保险，代价是收益也被封顶。</p>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">2. 策略构造</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>持有</strong>: 1 BTC 现货。</li>
          <li><strong>买入</strong>: 1份虚值 Put（下方保护）。</li>
          <li><strong>卖出</strong>: 1份虚值 Call（上方封顶）。</li>
          <li><strong>净成本</strong>: 接近零（Zero-Cost Collar）。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">3. 损益分析</h4>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>最大亏损</strong>: (现货价 - Put行权价) + 净成本。</li>
          <li><strong>最大收益</strong>: (Call行权价 - 现货价) - 净成本。</li>
          <li><strong>盈利区间</strong>: Put行权价 到 Call行权价。</li>
        </ul>

        <h4 class="font-bold text-slate-900 mt-6 mb-2">4. 使用场景</h4>
        <p class="mb-4">适用于<strong>需要保护但不想花钱</strong>的场景。例如牛市中段，你想持币但怕深度回调，又不想花钱买Put。Collar是完美的解决方案。很多企业持有BTC时会用Collar来锁定价值区间。</p>
      `,
      pros: [
        '低成本对冲：以放弃部分潜在上涨收益为代价，获得免费的下行保护。',
        '资产保值：非常适合在不确定性较高的市场环境中保护本金。'
      ],
      cons: [
        '收益封顶：若市场大涨，超额收益将被Call端截断。'
      ]
    }
  }
];