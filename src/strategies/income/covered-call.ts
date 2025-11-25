import { Strategy, StrategyCategory } from '@/types';

const coveredCall: Strategy = {
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
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
          <p class="text-indigo-900 font-semibold mb-2">💡 策略核心思想</p>
          <p class="text-indigo-800 text-sm">备兑看涨 (Covered Call) 通过“持币 + 卖出 OTM Call”将现货转化为现金流。若不涨则赚权利金；若上涨被行权则以行权价卖出，收益被封顶但整体盈利。</p>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📋 策略构造</h4>
        <div class="bg-white border border-slate-200 rounded-lg p-5 mb-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded border border-emerald-200">
              <p class="font-bold text-emerald-700 mb-2">📈 持有 1 BTC 现货</p>
              <p class="text-sm text-slate-700">例：持仓成本 $100k</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded border border-indigo-200">
              <p class="font-bold text-indigo-700 mb-2">📉 卖出 OTM Call</p>
              <p class="text-sm text-slate-700">例：卖 $110k Call，收 $3k</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded mt-3">
            <p class="text-sm text-slate-700 mb-2"><strong>净现金流</strong>：立即收 $3k（增强收益）</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💰 损益分析</h4>
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="text-xs text-emerald-600 font-bold mb-1">最大收益</div>
            <div class="text-2xl font-bold text-emerald-700 mb-2">(Call 行权价 − 现货价) + 权利金</div>
            <p class="text-xs text-slate-600">例：($110k − $100k) + $3k = <strong>$13k</strong></p>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div class="text-xs text-red-600 font-bold mb-1">下行风险</div>
            <div class="text-2xl font-bold text-red-700 mb-2">同现货</div>
            <p class="text-xs text-slate-600">暴跌时仍持币，仅权利金略微缓冲</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div class="text-xs text-blue-600 font-bold mb-1">机会成本</div>
            <div class="text-lg font-bold text-blue-700 mb-2">上涨封顶</div>
            <p class="text-xs text-slate-600">涨过行权价后超额收益将被截断</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">📊 实战案例</h4>
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
          <p class="font-bold text-slate-900 mb-3">案例：BTC $100k，卖 $110k Call 收 $3k</p>
          <div class="space-y-2">
            <div class="bg-green-100 border-l-4 border-green-500 p-3 rounded">
              <p class="text-sm font-bold text-green-800">✅ 横盘或温和上涨：收于 $108k</p>
              <p class="text-xs text-green-700 mt-1">权利金 $3k 到手，现货未卖出</p>
            </div>
            <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p class="text-sm font-bold text-blue-800">ℹ️ 涨破行权价：收于 $115k</p>
              <p class="text-xs text-blue-700 mt-1">被行权按 $110k 卖出，收益 ≈ $10k + $3k = $13k</p>
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
              <p class="text-sm font-bold text-red-800">❌ 暴跌：收于 $80k</p>
              <p class="text-xs text-red-700 mt-1">现货亏 $20k，但仍保留 $3k 权利金</p>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">🎯 使用场景</h4>
        <div class="space-y-3 mb-6">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <p class="font-bold text-indigo-900 mb-2">✓ 适合使用</p>
            <ul class="text-sm text-indigo-800 space-y-1 list-disc pl-5">
              <li>慢牛或震荡期，愿意在上方卖出部分仓位</li>
              <li>希望以现金流降低持仓成本</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <p class="font-bold text-red-900 mb-2">✗ 不适合使用</p>
            <ul class="text-sm text-red-800 space-y-1 list-disc pl-5">
              <li>预期超级牛市的主升浪（易卖飞）</li>
              <li>不愿意在行权价出售现货</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">⚠️ 风险提示</h4>
        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <ul class="text-sm text-amber-900 space-y-2 list-disc pl-5">
            <li><strong>卖飞风险</strong>：行权价上方的超额上涨无法享受</li>
            <li><strong>滚动管理</strong>：价格接近行权价时需滚动至更高行权价或平仓</li>
            <li><strong>税务影响</strong>：被行权卖出可能触发应税事件（视地区）</li>
          </ul>
        </div>

        <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
            <li><strong>行权价选择</strong>：设在目标卖出价或强阻力位（如 +10%）</li>
            <li><strong>到期时间</strong>：14–30 天，Theta 效率较高</li>
            <li><strong>分批卖出</strong>：分仓卖 Call，降低一次性卖飞风险</li>
          </ul>
        </div>
      `,
    pros: [
      '收益增强：在持币待涨的过程中额外获取年化10%-30%的现金流。',
      '降低成本：权利金收入实质上降低了现货的持仓成本。'
    ],
    cons: [
      '卖飞风险：在超级大牛市中，收益被行权价锁定，错失主升浪的超额利润。'
    ]
  }
};

export default coveredCall;
