import { Strategy, StrategyCategory } from '@/types';

const syntheticLong: Strategy = {
  id: 'synthetic-long',
  name: '合成多头 (Synthetic Long)',
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
          <p class="text-emerald-800 text-sm">合成多头 (Synthetic Long) 通过<strong>买入Call + 卖出Put</strong>的组合，完美复制持有现货的损益曲线（Delta≈1）。<strong>必须使用同一到期日、同一行权价（通常 ATM）</strong>，否则不能精确复制现货曲线。这是一种极致的杠杆工具，让你用极少资金建立 1 BTC 的完整敞口。</p>
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
            <p class="text-xs text-slate-600 mt-1">到期约定：<strong>两腿使用同一到期日</strong>；若需续持，建议在到期前 15–30 天滚动。</p>
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
            <div class="text-2xl font-bold text-red-700 mb-2">极大(有限)</div>
            <p class="text-xs text-slate-600">最大亏损≈$100k(BTC归零时)，与持有1 BTC现货完全一致，需追加保证金</p>
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
              <p class="text-xs text-green-700 mt-1">Call净赚$15k($20k内在价值−$5k权利金)，卖出的Put作废留存$5k权利金，合计盈利$20k，与持有1 BTC收益一致</p>
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
            <li><strong>基差/资金费率风险</strong>：同一行权价的 Call 与 Put 由看跌-看涨平价共用同一 IV，多 Call 与空 Put 的 Vega 结构上精确抵消、净 Vega≈0；合成多头真正的残余暴露来自远期价格与资金费率基差（持有成本，类似 rho），而非 Skew——Skew 指 IV 随不同行权价的偏斜，与单一行权价的合成头寸无关</li>
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
  },
  plainSummary: '不掏 10 万买币，而是用期权拼出一个跟持有 1 个 BTC 几乎一模一样的仓位：涨了照样赚，跌了照样亏，只是占用的现金少得多。',
  analogy: {
    emoji: '🏠',
    title: '用首付撬动整套房',
    text: '全款买套房要 100 万，但你只付了首付（保证金）就拿到了整套房子的全部涨跌——房价涨你全赚，房价跌也全得你担，感受跟全款买房的人一模一样，只是先少掏了一大笔钱。'
  },
  pitfalls: [
    '以为"净成本≈0就是不花钱、没风险"——其实下跌时和持有 1 个 BTC 一样亏，BTC 归零能亏掉整整 $100k，绝不是免费午餐。',
    '把保证金当成全部成本、仓位开太大——名义敞口是保证金的好几倍，BTC 稍微一跌就要追保，扛不住就被强平。',
    '用不同行权价或不同到期日的 Call/Put 来拼——那就不再是合成多头了，损益曲线会跑偏（变成风险逆转或对角价差）。'
  ],
  quickJudge: {
    use: '坚定看涨、想省现金建满仓',
    avoid: '扛不住下跌追保、保证金薄'
  },
  greeks: {
    delta: '+(强)',
    gamma: '≈0',
    theta: '≈0',
    vega: '≈0'
  },
  cryptoNote: '卖出的 Put 在 Deribit 要占用保证金，到期前就可能被增量强平：哪怕现货没动，IV 单独飙升也会推高空头的 mark price 触发追保；币本位计价时一旦暴跌，浮亏与抵押品缩水会双杀。务必把仓位开小、多留保证金缓冲。'
};

export default syntheticLong;
