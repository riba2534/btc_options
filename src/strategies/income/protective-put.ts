import { Strategy, StrategyCategory } from '@/types';

const protectivePut: Strategy = {
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
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-indigo-800 text-sm">保护性看跌 (Protective Put) 为现货买保险：持币同时买入 Put 锁定最低卖出价。下行风险有限，上行收益完整，提升持仓舒适度。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 持有 1 BTC 现货</p>
              <p class="text-sm text-slate-700">例：持仓成本 $100k</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">🛡️ 买入 OTM/ATM Put</p>
              <p class="text-sm text-slate-700">例：买 $95k Put，付 $3k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>保险成本</strong>：权利金 $3k</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">最大亏损</div>
            <div class="text-2xl font-bold text-red-700 mb-2">(现货价 − Put) + Premium</div>
            <p class="text-xs text-slate-600">例：($100k − $95k) + $3k = <strong>$8k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">无限</div>
            <p class="text-xs text-slate-600">上涨保留全部上行收益（减去保险费）</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">心理优势</div>
            <div class="text-lg font-bold text-blue-700 mb-2">持仓更稳</div>
            <p class="text-xs text-slate-600">避免恐慌性止损与追涨杀跌</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，担心短期回撤</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 暴跌：跌至 $80k</p>
              <p class="text-xs text-green-700 mt-1">按 $95k 卖（或行权收益），损失被锁定 $8k</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 横盘：收于 $100k</p>
              <p class="text-xs text-blue-700 mt-1">保险费 $3k 成为持仓成本</p>
            </div>
            <div class="bg-emerald-100 border-l-4 border-emerald-500 p-3 rounded">
              <p class="text-sm font-bold text-emerald-800">📈 上涨：收于 $120k</p>
              <p class="text-xs text-emerald-700 mt-1">保留全部上涨收益，扣除保险费 $3k</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>长期看涨但担心短期黑天鹅</li>
              <li>重仓持币、希望锁定底线</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>不愿支付保险费的账户</li>
              <li>极短线交易，不需要对冲</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>成本拖累</strong>：长期持续付费会降低组合收益率</li>
            <li><strong>IV 风险</strong>：IV 高位买入保险费更贵</li>
            <li><strong>执行细节</strong>：到期前的滚动与择时影响效果</li>
          </ul>
        </div>

      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>行权价选择</strong>：常设在 -5% 至 -10%（如 $95k）</li>
          <li><strong>到期时间</strong>：30–60 天，兼顾保护效果与成本</li>
          <li><strong>搭配策略</strong>：与 Covered Call 组合为 Collar，降低保险成本</li>
          <li><strong>到期建议</strong>：中期保护 30–60 天；临近到期若仍需保护，提前滚动到新到期。</li>
        </ul>
      </div>
      `,
    pros: [
      '下行保护：消除恐慌，无惧任何黑天鹅事件。',
      '保留上行：不像卖出期货对冲那样锁死利润，该策略不限制上涨收益。'
    ],
    cons: [
      '保险成本：购买Put需要持续支付权利金，长期来看会拖累整体投资组合的收益率。'
    ]
  }
};

export default protectivePut;
