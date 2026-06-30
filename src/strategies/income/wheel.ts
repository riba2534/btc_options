import { Strategy, StrategyCategory } from '@/types';

const wheel: Strategy = {
  id: 'wheel',
  name: '轮子策略 (Wheel)',
  category: StrategyCategory.INCOME,
  description: '流程型：卖 Put 接盘 → 持币后卖 Call 收租，循环滚动。',
  setup: '阶段一 卖出 OTM Put；阶段二 被行权持币后卖 OTM Call',
  riskProfile: '下方风险同持币，上方收益封顶（收权利金）。',
  idealScenario: '区间震荡与温和趋势，长期收租与低成本建仓。',
  legs: [],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
        <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-indigo-800 text-sm">Wheel 是流程型策略：先卖 Put 以较低成本接盘；被行权持币后转为卖 Call 收租；到期滚动下一期，周而复始实现现金流增强。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <div class="space-y-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">🔄 阶段一：卖出 OTM Put 收租</p>
            <p class="text-sm text-slate-700 mb-2">卖 $90k Put 收权利金 ≈ $2k；若到期不被行权，重复该阶段</p>
            <p class="text-xs text-slate-600"><strong>目标</strong>：持续收租，降低未来建仓成本</p>
          </div>
          <div class="bg-green-50 p-4 rounded border border-green-200">
            <p class="font-bold text-green-700 mb-2">📦 阶段二：Put 实值结算（经济效果≈接盘持币）</p>
            <p class="text-sm text-slate-700 mb-2">若价格跌至 $90k 以下，Put 进入实值：Deribit/OKX 按现金差额结算（不自动交割实物），经济效果≈以 $90k 接盘 1 BTC；若要真正持币，需用结算所得手动买入现货</p>
            <p class="text-xs text-slate-600"><strong>实际接盘成本</strong>：$90k - 累计权利金（如已收3期，成本降至 $84k）</p>
          </div>
          <div class="bg-orange-50 p-4 rounded border border-orange-200">
            <p class="font-bold text-orange-700 mb-2">💰 阶段三：持币卖 Call 收租</p>
            <p class="text-sm text-slate-700 mb-2">持币后卖 $110k Call 收权利金 ≈ $2k；到期后重复</p>
            <p class="text-xs text-slate-600"><strong>循环</strong>：Call 实值时按现金差额结算（经济效果≈按 $110k 封顶卖出），回到阶段一继续卖 Put</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">长期收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">稳定现金流</div>
          <p class="text-xs text-slate-600">权利金与低成本建仓加持</p>
        </div>
        <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <div class="text-xs text-red-600 font-bold mb-1">下方风险</div>
          <div class="text-2xl font-bold text-red-700 mb-2">同持币</div>
          <p class="text-xs text-slate-600">暴跌时持币浮亏</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">上方风险</div>
          <div class="text-lg font-bold text-blue-700 mb-2">卖飞</div>
          <p class="text-xs text-slate-600">上涨超过行权价时收益封顶</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，轮子循环</p>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 横盘 $95k–$105k(最佳)</p>
            <p class="text-xs text-green-700 mt-1">连卖 3 期 $90k Put 各收 $2k,均未被行权,累计 +$6k 现金流。</p>
          </div>
          <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p class="text-sm font-bold text-blue-800">ℹ️ 被行权后卖 Call(中等)</p>
            <p class="text-xs text-blue-700 mt-1">$90k 现金差额结算（经济效果≈接盘 1 BTC，手动补现货持有）,卖 $110k Call 收 $2k;到期涨到 $108k 未触发,持币浮盈 +$18k 再加 $2k 权利金。</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 暴跌至 $70k(最差)</p>
            <p class="text-xs text-red-700 mt-1">$90k 现金结算后≈接盘持币,继续跌到 $70k 浮亏 -$20k,累计权利金 +$8k 缓冲后净约 -$12k。</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
            <li>长期持币且希望增强现金流</li>
            <li>区间震荡或温和趋势</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>不愿被动接盘或被动卖出现货</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>执行纪律风险</strong>：必须严格遵守滚动规则，避免情绪化操作</li>
          <li><strong>Theta 与 Gamma</strong>:作为净期权卖方,组合 Theta 为正,时间流逝即带来权利金收益;但组合为负 Gamma(空头 Gamma),临近到期其绝对值升高,价格剧烈波动时损益变化加剧。</li>
          <li><strong>Vega 风险</strong>:组合为净空 Vega,卖出后若 IV 上升会产生浮亏,故 IV 高位入场更有利。</li>
          <li><strong>暴跌风险</strong>：被行权持币后若继续暴跌，持币浮亏但权利金提供缓冲</li>
          <li><strong>卖飞风险</strong>：上涨超过 Call 行权价时，收益封顶，错过超额涨幅</li>
          <li><strong>流动性风险</strong>：需要确保期权合约有足够流动性，避免滑点过大</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>分批与周期管理</strong>：按月或双周滚动，分批建仓减少一次性风险</li>
          <li><strong>行权价选择艺术</strong>：Put 设在支撑位下方 5–10%，Call 设在阻力位上方 5–10%</li>
          <li><strong>资金管理</strong>：确保有足够保证金应对 Put 被行权，避免强制平仓</li>
          <li><strong>IV 择时</strong>：在 IV 高位时卖期权，权利金收入更高</li>
          <li><strong>止损策略</strong>：若价格快速突破行权价，考虑提前平仓或滚动到新价位</li>
          <li><strong>税务规划</strong>：注意被行权产生的税务影响，合理规划持仓周期</li>
        </ul>
      </div>
    `,
    pros: [
      '长期稳定现金流并降低建仓成本。',
      '在震荡或温和趋势环境表现良好。'
    ],
    cons: [
      '暴跌时被行权接币后持续浮亏,回本依赖币价反弹,本质承担与持币相同的下行风险。',
      '上涨突破 Call 行权价时收益封顶,容易“卖飞”错过主升浪。'
    ]
  },
  plainSummary: '你本来就想低价囤币:先收一笔钱押它不会跌破某个价——没跌到就白赚这笔钱,真跌到了正好按那个价低价接货;接到币后再收一笔钱押它不会大涨,就这样一轮一轮地两头收着租。',
  analogy: {
    emoji: '🔄',
    title: '两头收定金的精明商贩',
    text: '像个会做生意的二手商贩:先跟卖家说“跌到这个价我就收”,并先收一笔定金(押它不跌破);真收到货后,再挂出“涨到那个价我就卖”,又先收一笔定金(押它不大涨)。不管最后收没收到货,两头的定金都先落袋,然后循环往复地收。',
  },
  pitfalls: [
    '把 Wheel 当“稳赚不赔”:暴跌被迫低价接币后照样大幅浮亏,那点权利金缓冲根本不够,本质和裸持币一样要扛下行风险。',
    'Put 行权价挂得离现价太近,频繁被接盘,在下跌途中越接越亏,保证金很快打满、失去后续滚动空间。',
    '接币后 Call 行权价设得太低,稍微一涨就被“卖飞”,踏空主升浪,把辛苦攒下的成本优势又亏回去。',
  ],
  quickJudge: {
    use: '长期想低价囤币、看震荡或温和趋势',
    avoid: '不愿被动接币/怕踏空、预期单边暴涨暴跌',
  },
  greeks: {
    delta: '+',
    gamma: '−',
    theta: '+',
    vega: '−',
  },
  cryptoNote: 'Deribit/OKX 的 BTC 期权是欧式 + 现金交割:到期 ITM 只结算现金差额,不会自动帮你接币或卖币。本策略里“被行权接 1 BTC”“按 $110k 卖出”是实物期权的叙事——加密下经济效果≈低价接盘 / ≈封顶卖出,但要真正完成“持币收租”与“卖飞”的衔接,需用结算所得的现金差额手动到现货市场补买/补卖一笔。',
};

export default wheel;
