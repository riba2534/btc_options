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
              <p class="text-sm text-amber-900"><strong>⏰ 时间衰减规律</strong>：临近到期时时间价值衰减明显加速——最后30天的单日衰减速度(Theta)远高于早期阶段。这就是为什么卖方喜欢卖短期期权（赚Theta），买方更倾向买长期期权（避免快速衰减）。</p>
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

        <div class="bg-white border border-slate-200 rounded-lg p-5 mt-5">
          <h5 class="font-bold text-lg text-slate-900 mb-2">📈 三分钟学会看「盈亏图」</h5>
          <p class="text-slate-700 mb-3 text-sm">本站每个策略都有一张盈亏曲线图，看懂它就看懂了策略的全部脾气：</p>
          <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>横轴（X）</strong>：到期时 BTC 的价格，左边是跌、右边是涨。</li>
            <li><strong>纵轴（Y）</strong>：你这笔交易最终赚（线在 0 上方）还是亏（线在 0 下方）。</li>
            <li><strong>那条 0 水平线</strong>：盈亏分界。线穿过 0 的位置就是<strong>盈亏平衡点</strong>——价格到这才不赚不亏。</li>
            <li><strong>线变平的地方</strong>：说明盈亏被「锁死」了，平在上方=最大盈利封顶，平在下方=最大亏损封顶。</li>
            <li><strong>线一直往右上 / 右下斜不停</strong>：代表收益或亏损「无限」，没有封顶。</li>
          </ul>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mt-3">
            <p class="text-xs text-blue-900">💡 一句话：<strong>线在 0 上方就是赚，越高赚越多；看线在哪拐弯、哪变平，就知道这个策略最多赚多少、最多亏多少。</strong></p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-8 mb-3 text-xl">希腊字母 (The Greeks) - 风险指标</h4>
        <p class="mb-4 text-slate-700">希腊字母是衡量期权风险和价值变化的核心指标。掌握它们是期权交易进阶的关键。</p>
        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 rounded">
          <p class="text-sm text-emerald-900"><strong>🔰 新手只需先记 Delta（涨跌灵敏度）和 Theta（时间损耗）两个</strong>，其余（Gamma / Vega / Rho）看不懂可以先跳过，等熟悉了再展开下方的进阶折叠。</p>
        </div>
        
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
                <li>最后30天的单日衰减速度(Theta)远高于早期阶段</li>
                <li>周末和假期也在衰减（不交易但时间在流逝）</li>
              </ul>
              <p><strong>🎯 策略</strong>：卖方通过卖近月期权赚取Theta收入（收租策略）。</p>
            </div>
          </div>

          <details class="bg-white border border-slate-200 rounded-lg p-4">
            <summary class="font-bold text-slate-700 cursor-pointer">🔬 进阶：Gamma / Vega / Rho（新手可先跳过）</summary>
            <div class="space-y-4 mt-4">
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
                <div class="flex items-center gap-2 mb-2">
                  <div class="font-bold text-purple-700 text-lg">Gamma (Γ)</div>
                  <span class="px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded">Delta的变化率</span>
                </div>
                <p class="text-slate-700 mb-2">衡量Delta对标的价格变动的敏感度，是Delta的"加速度"。</p>
                <div class="bg-white/50 rounded p-3 text-sm space-y-1">
                  <p><strong>📊 实例</strong>：Gamma=0.02意味着价格涨$1，Delta增加0.02。</p>
                  <p><strong>⚠️ 风险</strong>：ATM期权的Gamma最大，临近到期时Gamma暴增（Gamma爆炸），这对卖方极其危险。</p>
                  <p><strong>💡 策略</strong>：买方喜欢高Gamma（价格有利时赚得更快），卖方害怕高Gamma（方向敞口快速反向放大、临近到期的尾部风险）。</p>
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
                  <p><strong>💥 Vega Crush</strong>：重大事件（如减半、ETF决议）前IV飙升，事件后"利好/利空出尽"，IV暴跌导致期权价格崩盘，即使标的价格没什么变化。</p>
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
          </details>
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

        <h4 class="font-bold text-slate-900 mt-8 mb-3 text-xl">📊 波动率认知 (IV / HV / IV Rank)</h4>
        <p class="mb-4 text-slate-700">波动率是期权定价的灵魂。全站反复出现的「IV 高位适合收租、IV 低位适合买方」，背后就是下面这套判断工具。</p>
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-violet-50 to-purple-50 p-5 rounded-lg border border-violet-200">
            <div class="font-bold text-violet-700 text-lg mb-2">IV（隐含波动率）vs HV（历史波动率）</div>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>IV（Implied Volatility）</strong>：从期权价格「反推」出来的、市场对<strong>未来</strong>波动的预期。IV 越高，期权越贵。</li>
              <li><strong>HV（Historical Volatility）</strong>：标的<strong>过去</strong>真实走出来的波动幅度。</li>
              <li><strong>怎么用</strong>：IV 明显高于 HV，说明期权偏贵、市场在为未来定价恐慌，利于卖方；IV 低于 HV，说明期权偏便宜，利于买方。</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-indigo-50 to-violet-50 p-5 rounded-lg border border-indigo-200">
            <div class="font-bold text-indigo-700 text-lg mb-2">IV Rank / IV Percentile（决定你当买方还是卖方）</div>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>IV Rank</strong> = 当前 IV 在过去 N 天（通常一年）最低值~最高值区间里的相对位置（0~100 刻度）。算法：（当前−最低）÷（最高−最低）×100。例：区间 40%–120%、当前 60% → (60−40)÷(120−40)×100 ≈ 25。</li>
              <li><strong>IV Percentile</strong> = 过去 N 天里，IV 低于当前值的天数占比。</li>
              <li>两者都把抽象的「IV 高不高」变成 0–100 的可操作刻度。</li>
            </ul>
            <div class="bg-white/60 border-l-4 border-indigo-400 p-3 rounded mt-3">
              <p class="text-sm text-indigo-900"><strong>🎯 决策口诀</strong>：<strong>IV Rank &gt; 50 偏卖方</strong>（收租 / 价差 / 铁鹰，赚 IV 回落 + Theta）；<strong>IV Rank &lt; 30 偏买方</strong>（单腿 / 跨式 / 日历，赌 IV 上升 + 大波动）。</p>
            </div>
          </div>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p class="text-sm text-blue-900"><strong>📌 实例</strong>：BTC 当前 IV=60%，过去一年区间 40%–120% → IV Rank≈25，处于偏低位 → 倾向<strong>做买方</strong>（Long Call / Long Straddle），而不是 Short Strangle 这类卖方策略。</p>
            <p class="text-sm text-blue-900 mt-2"><strong>🧭 加密参考</strong>：Deribit 的 <strong>DVOL 指数</strong>就是 BTC 的「恐慌指数」，可直接当作 BTC 隐含波动率水位的风向标。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-8 mb-3 text-xl">⚙️ 加密期权 vs 传统股票期权（必读）</h4>
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-5 rounded-lg mb-4">
          <p class="text-sm text-orange-900"><strong>⚠️ 重要</strong>：本站用「买房定金→到期买下房子」作类比便于理解，但那是<strong>美式 + 实物交割</strong>的框架。Deribit / OKX / Bybit 等主流平台的 BTC 期权机制不同，下面五点必须先搞清。</p>
        </div>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div class="bg-white border border-slate-200 rounded-lg p-4">
            <p class="font-bold text-slate-900 mb-1">1. 欧式期权（无提前行权）</p>
            <p class="text-sm text-slate-700">只能在<strong>到期日</strong>行权，不存在「提前被行权 / 提前指派」。所以传统股票期权里关于「提前行权」的担忧，在主流加密期权里基本不适用。</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-lg p-4">
            <p class="font-bold text-slate-900 mb-1">2. 现金交割（不交割实物）</p>
            <p class="text-sm text-slate-700">到期按交易所 BTC 指数（通常是最后 30 分钟 TWAP 均价）<strong>结算现金差额</strong>，<strong>不会真的买入/卖出 1 枚 BTC</strong>。传统「被指派后拿到/交出股票」在这里要换成「按现金差额结算」。</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-lg p-4">
            <p class="font-bold text-slate-900 mb-1">3. 币本位 (inverse) vs USDC 线性 (linear)</p>
            <p class="text-sm text-slate-700">Deribit 经典 BTC 期权是<strong>币本位</strong>：权利金与盈亏都以 BTC 计价，换算成 USD 后曲线是<strong>非线性</strong>的。USDC 线性期权才是直观的 USD 盈亏。</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-lg p-4">
            <p class="font-bold text-slate-900 mb-1">4. BTC IV 常态 40–80%</p>
            <p class="text-sm text-slate-700">远高于美股的 15–25%。所以一张 ATM 月权权利金约为现货的 5%（本站 premiumRatio≈0.05）是正常水平，不要觉得「太贵」。</p>
          </div>
        </div>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-4">
          <p class="text-sm text-amber-900"><strong>5. 7×24 无收盘、无熔断</strong>：加密市场全年无休、没有涨跌停和熔断机制，周末与节假日流动性枯竭时容易出现「插针 / 清算级联式跳空」。「市场永不收盘所以能随时止损」是错觉——真到瀑布行情时点差炸开、止损会严重滑点。</p>
        </div>
        <div class="bg-slate-100 border border-slate-300 rounded-lg p-4">
          <p class="text-xs text-slate-600"><strong>📐 盈亏图免责</strong>：本站所有盈亏图均为 <strong>USD 线性近似</strong>，对应 USDC 线性期权；若你交易的是 Deribit 币本位（inverse）期权，实际 USD 盈亏曲线会因币价变动而非线性偏移（尤其暴涨时空头的币本位亏损会被高币价放大）。</p>
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

