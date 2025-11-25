import { Strategy, StrategyCategory } from '@/types';

const longCall: Strategy = {
  id: 'long-call',
  name: '买入看涨期权 (Long Call)',
  category: StrategyCategory.BULLISH,
  description: '用少量权利金博取上涨；风险封顶，收益随涨幅扩张。',
  setup: '买入 Call',
  riskProfile: '风险有限（最多亏权利金）；Theta 负、Vega 正；对快速上涨与 IV 上升敏感。',
  idealScenario: '短期强势上行；IV 处低位或事件前 IV 预期上升。',
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
};

export default longCall;
