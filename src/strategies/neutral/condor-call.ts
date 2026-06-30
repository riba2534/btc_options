import { Strategy, StrategyCategory } from '@/types';

const condorCall: Strategy = {
  id: 'condor-call',
  name: '买入看涨鹰式 (Long Call Condor)',
  category: StrategyCategory.NEUTRAL,
  description: '全 Call 的四腿借记价差，博价格落入中间区间的震荡。',
  setup: '买 低 Call + 卖 中低 Call + 卖 中高 Call + 买 高 Call（两翼等宽各 3k、中间体 4k）',
  riskProfile: '风险有限（净成本），收益有限（翼宽 − 成本）。',
  idealScenario: '到期价格落在 $98k–$102k 中间平台区间。',
  legs: [
    { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.065 },
    { type: 'Call', action: 'Sell', strikeOffset: 0.98, premiumRatio: 0.045 },
    { type: 'Call', action: 'Sell', strikeOffset: 1.02, premiumRatio: 0.025 },
    { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.015 }
  ],
  detailedAnalysis: {
    explanation: `
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
        <p class="text-blue-900 font-semibold mb-2">💡 策略核心思想</p>
        <p class="text-blue-800 text-sm">Call Condor（鹰式）与蝶式的关键区别：<strong>中间两个卖出腿使用不同行权价</strong>，形成"平台式"收益曲线（$98k–$102k 内收益恒定），而非蝶式的"尖塔式"单点峰值。适合预期价格在一定区间内震荡、但无法精确判断具体点位的场景。</p>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
      <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p class="text-slate-700 mb-3"><strong>四档行权价、外翼等宽（各 3k）、中间体留 4k 间隔 — 与蝶式区别：中间两腿行权价不同</strong></p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 买 $95k Call（付 $6.5k）</p>
            <p class="text-sm text-slate-700">最低翼</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 $98k Call（收 $4.5k）</p>
            <p class="text-sm text-slate-700">中低档</p>
          </div>
          <div class="bg-cyan-50 p-4 rounded border border-cyan-200">
            <p class="font-bold text-cyan-700 mb-2">📉 卖 $102k Call（收 $2.5k）</p>
            <p class="text-sm text-slate-700">中高档</p>
          </div>
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <p class="font-bold text-blue-700 mb-2">📈 买 $105k Call（付 $1.5k）</p>
            <p class="text-sm text-slate-700">最高翼</p>
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded mt-3">
          <p class="text-sm text-slate-700 mb-2"><strong>净成本</strong> = $6.5k + $1.5k − $4.5k − $2.5k = <strong>$1k</strong></p>
          <p class="text-xs text-slate-500">盈利区间：$98k–$102k（中间平台区）；峰值收益在此区间内保持恒定</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
          <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
          <div class="text-2xl font-bold text-emerald-700 mb-2">$2k</div>
          <p class="text-xs text-slate-600">翼宽 $3k − 成本 $1k（到期收于平台区）</p>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div class="text-xs text-amber-600 font-bold mb-1">最大亏损</div>
          <div class="text-2xl font-bold text-amber-700 mb-2">$1k</div>
          <p class="text-xs text-slate-600">仅限净成本（收于外翼外）</p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div class="text-xs text-blue-600 font-bold mb-1">盈利区间（平台 + 斜坡）</div>
          <div class="text-lg font-bold text-blue-700 mb-2">$96k–$104k</div>
          <p class="text-xs text-slate-600">平台区 $98k–$102k 收益恒定</p>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
      <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，预计在 $98k–$102k 区间震荡</p>
        <div class="bg-white/70 rounded p-4 mb-3">
          <p class="text-sm text-slate-700 mb-2"><strong>建仓：</strong>买 $95k Call + 卖 $98k Call + 卖 $102k Call + 买 $105k Call，净成本 $1k</p>
        </div>
        <div class="space-y-2">
          <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p class="text-sm font-bold text-green-800">✅ 收于 $98k–$102k（平台区）</p>
            <p class="text-xs text-green-700 mt-1">最大收益 = 翼宽 $3k − 成本 $1k = <strong>$2k</strong>（200% 回报）</p>
          </div>
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p class="text-sm font-bold text-yellow-800">⚠️ 收于 $97k 或 $103k（斜坡区）</p>
            <p class="text-xs text-yellow-700 mt-1">部分盈利约 +$1k；$96k 与 $104k 为盈亏平衡点</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 收于 $95k 以下或 $105k 以上</p>
            <p class="text-xs text-red-700 mt-1">亏损全部净成本 $1k</p>
          </div>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
      <div class="space-y-3 mb-6">
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
          <p class="font-bold text-cyan-900 mb-2">✓ 适合使用</p>
          <ul class="text-sm text-cyan-800 space-y-1 list-disc pl-5">
            <li>预期价格在 $98k–$102k 区间内震荡、但不确定精确落点</li>
            <li>希望以小成本博高赔率</li>
          </ul>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
          <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
          <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
            <li>极端波动或趋势行情</li>
            <li>预期价格将突破 $96k 或 $104k 盈亏边界（单边行情）</li>
          </ul>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
      <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
        <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
          <li><strong>区间风险</strong>：到期价一旦越出 $98k–$102k 平台并跌破 $96k 或涨破 $104k 盈亏区，收益快速转为最大亏损 $1k</li>
          <li><strong>Gamma 风险</strong>：靠近中心价的曲率变化导致盈亏敏感</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>翼宽选择</strong>：5–10%，翼越宽则平台两侧斜坡越缓、容错更高。</li>
          <li><strong>到期规划</strong>：14–30 天，临期平台拐角更锐、斜坡更陡。</li>
        </ul>
      </div>
    `,
    pros: [
      '以小成本博取中性区间收益，盈利平台($98k–$102k)较蝶式更宽、容错更高。',
      '风险有限且易于估计。'
    ],
    cons: [
      '需价格收敛于 $96k–$104k 区间，趋势行情或大波动下亏损净成本 $1k。',
      '四腿结构开平仓点差与手续费较高，侵蚀本就有限的 $2k 最大收益。'
    ]
  },
  plainSummary:
    '花一点小钱（$1k）赌 BTC 接下来就在 $98k–$102k 这段中间区间里晃悠，不大涨也不大跌。价格真待在这片区域，你就稳稳赚 $2k；万一冲出区间也别慌，亏损早就封死，最多就赔进去那 $1k 本钱。',
  analogy: {
    emoji: '🎯',
    title: '押注"扎进中间一整片区域"',
    text:
      '像在飞镖盘上花一点小钱押"镖会扎在中间一整片区域"，而不是死磕正中心那一个点。只要镖落进这片不算窄的中间带，奖金都一样满额；扎到最外圈也只亏掉入场的那点小钱。比起只押正中心的蝶式，这个"中间带"更宽、更容易押中。',
  },
  pitfalls: [
    '以为"只要不暴涨暴跌就稳赚"——其实价格必须收在 $96k–$104k 才不亏，越过这条线就开始亏、跌破 $95k 或涨破 $105k 才吃满 $1k 亏损，可盈利的区间比想象中窄。',
    '被"赔 $1k 博 $2k、赔率 2:1"诱惑而忽略胜率——价格恰好停在窄平台里的概率并不高，加上四腿点差和手续费，真实期望远没有看上去诱人。',
    '四条腿手动逐腿挂单——快市里很容易只成交两三条腿、留下裸露的单腿敞口，风险瞬间放大；务必用组合单/RFQ 按净价一次性成交。',
  ],
  quickJudge: {
    use: '预计 BTC 窄幅震荡、卡在区间里',
    avoid: '要走单边趋势或剧烈波动时',
  },
  greeks: {
    delta: '≈0',
    gamma: '−',
    theta: '+',
    vega: '−',
  },
  cryptoNote:
    'Deribit 期权按张计费、每张约为标的的 0.03%（封顶为权利金的 12.5%）外加交割费；四条腿来回开平共八笔，手续费与点差会直接啃掉本就只有 $2k 的最大收益，务必用组合单/RFQ 按净价一次成交、别手动逐腿挂单（快市漏成一两条腿会留下裸露敞口、破坏风险封顶）。好在 Deribit 为欧式现金结算、到期按指数价自动轧差，几乎没有 Pin Risk 或被提前指派的烦恼。',
};

export default condorCall;
