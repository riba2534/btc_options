import { Strategy, StrategyCategory } from '@/types';

const cashSecuredPut: Strategy = {
  id: 'cash-secured-put',
  name: '现金担保卖出看跌期权 (Cash-Secured Put)',
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
};

export default cashSecuredPut;
