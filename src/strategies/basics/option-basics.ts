import { Strategy, StrategyCategory } from '@/types';

const optionBasics: Strategy = {
  id: 'option-basics',
  name: '期权基础 (Option Basics)',
  category: StrategyCategory.BASICS,
  description: '理解期权的核心概念、希腊字母以及四种基础交易形态。',
  setup: '基础知识',
  riskProfile: '取决于具体持仓',
  idealScenario: '学习与入门',
  legs: [],
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
};

export default optionBasics;

