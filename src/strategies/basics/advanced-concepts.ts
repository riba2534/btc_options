import { Strategy, StrategyCategory } from '@/types';

const advancedConcepts: Strategy = {
  id: 'advanced-concepts',
  name: '进阶概念 (Advanced Concepts)',
  category: StrategyCategory.BASICS,
  description: '把合成/盒式/日历背后的原理讲透。',
  setup: '',
  riskProfile: '',
  idealScenario: '',
  legs: [],
  detailedAnalysis: {
    explanation: `
        <div class="bg-gradient-to-r from-slate-50 to-indigo-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="text-indigo-900 font-semibold mb-1">🎓 这一页讲什么</p>
          <p class="text-indigo-800 text-sm">把站内合成、盒式、日历这些「看起来很玄」的策略背后的底层原理一次讲透：平价公式、波动率微笑/Skew、行权交割与 Pin Risk、波动率期限结构。读懂这一页，很多策略你会发现「原来是同一个东西换了个壳」。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚖️ 平价公式 (Put-Call Parity)：C − P = S − K</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-sm text-slate-700 mb-3">同到期、同行权价的 Call 与 Put，价格之间存在铁律般的关系（忽略利率时）：</p>
          <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-3 text-center">
            <p class="text-lg font-bold text-indigo-700">C − P = S − K</p>
            <p class="text-xs text-indigo-600 mt-1">（C=Call 价格，P=Put 价格，S=现价，K=行权价；严格写法 C − P = S − K·e<sup>−rt</sup>）</p>
          </div>
          <p class="text-sm text-slate-700 mb-2">这条公式是下面这些策略的<strong>共同根基</strong>：</p>
          <ul class="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li><strong>合成多头 (Synthetic Long)</strong> = 买 Call + 卖 Put（同 K）→ 等价于直接持有现货（Delta≈1）。</li>
            <li><strong>合成空头 (Synthetic Short)</strong> = 卖 Call + 买 Put → 等价于做空现货。</li>
            <li><strong>盒式价差 (Box Spread)</strong> = 一个合成多头 + 一个合成空头（不同 K）→ 锁定无风险价差，本质是借贷工具。</li>
          </ul>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mt-3">
            <p class="text-xs text-blue-900">💡 一旦记住「Call − Put = 现货 − 行权价」，合成/盒式就不再是孤立招式，而是同一块积木的不同拼法。若公式两边明显失衡，理论上存在套利空间（实盘会被手续费和点差吃掉）。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">😊 波动率微笑 / Skew（偏斜）</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <p class="text-sm text-slate-700 mb-3">教科书假设所有行权价的 IV 相同，但真实市场不是——把不同行权价的 IV 画出来会形成一条曲线：</p>
          <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>波动率微笑 (Smile)</strong>：两端（深虚值）IV 高、中间（ATM）IV 低，形似微笑。</li>
            <li><strong>偏斜 (Skew)</strong>：当 Put 与 Call 的 IV 不对称时形成。加密市场 skew 极显著——<strong>下行恐慌期 Put 溢价、牛市 Call skew</strong>。</li>
            <li><strong>25-Delta Risk Reversal</strong>：用 25Δ Call 与 25Δ Put 的 IV 差读多空情绪，是行业衡量 skew 的基准；也是「风险逆转」策略近零成本的来源。</li>
          </ul>
          <div class="bg-violet-50 border-l-4 border-violet-400 p-3 rounded mt-3">
            <p class="text-xs text-violet-900">💡 OTM 期权为什么不能简单用 ATM 的 IV 来估值？因为 skew 的存在。风险逆转、比例价差、所有 OTM 定价都建立在 skew 之上。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📦 行权与交割：欧式 / 美式 / Pin Risk / 提前行权</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4 mb-3">
            <div class="bg-teal-50 p-4 rounded border border-teal-200">
              <p class="font-bold text-teal-700 mb-1">欧式 (European)</p>
              <p class="text-sm text-slate-700">只能在到期日行权。<strong>Deribit / OKX 等加密主流期权都是欧式</strong>——没有「提前被指派」的麻烦。</p>
            </div>
            <div class="bg-orange-50 p-4 rounded border border-orange-200">
              <p class="font-bold text-orange-700 mb-1">美式 (American)</p>
              <p class="text-sm text-slate-700">可在到期前任意时点行权。卖方面临<strong>提前行权风险</strong>（尤其临近分红/到期、深度实值时）。</p>
            </div>
          </div>
          <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>现金交割 vs 实物交割</strong>：加密主流为现金交割——到期按 BTC 指数（最后 30 分钟 TWAP）结算<strong>现金差额</strong>，不会真的交付/接收 1 枚 BTC。这就是为什么「现金担保接盘抄底」「被卖飞拿到现货」在 Deribit 上不会自动发生，需要到期后手动去现货市场衔接。</li>
            <li><strong>Pin Risk（钉住风险）</strong>：到期价正好压在行权价附近时，期权究竟算实值还是虚值变得不确定，指派/结算结果难以预判。欧式 + 现金交割（结算到指数均价）让 Pin Risk 大幅减弱，但 ATM 到期的尾盘价格抖动仍需留意。</li>
          </ul>
          <div class="bg-amber-50 border border-amber-300 rounded p-3 mt-3">
            <p class="text-xs text-amber-900">⚠️ 加密语境：Deribit = 欧式 + 现金结算 → Pin Risk 与提前行权基本不存在；但链上期权或部分支持美式/实物交割的合约仍需关注交易所规则与保证金。</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📅 波动率期限结构 (Term Structure)</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-2">
          <p class="text-sm text-slate-700 mb-2">不同到期日的 IV 也不一样，连起来就是「期限结构」：</p>
          <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>正向（Contango）</strong>：远月 IV &gt; 近月 IV，市场预期未来更不确定（常态）。</li>
            <li><strong>倒挂（Backwardation）</strong>：近月 IV &gt; 远月 IV，通常出现在临近重大事件（FOMC、CPI、ETF 决议、减半、月/季度 opex）时——市场为眼前的不确定性付高价。</li>
            <li><strong>对策略的意义</strong>：日历价差（Calendar）、对角价差（Diagonal）正是在做多/做空这条期限结构的形状——买远月卖近月，赚近月更快的时间衰减 + 期限结构变化。</li>
          </ul>
          <div class="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded mt-3">
            <p class="text-xs text-indigo-900">💡 事件前期限结构可能倒挂；事件落地后近月 IV 往往「Vega Crush」式塌缩。理解这一点，就能明白为什么日历策略在事件前后表现差异巨大。</p>
          </div>
        </div>
      `,
    pros: [],
    cons: []
  }
};

export default advancedConcepts;
