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
        <p class="text-slate-700 mb-2"><strong>阶段一：</strong>卖 $90k Put 收权利金；若到期不被行权，重复该阶段</p>
        <p class="text-slate-700 mb-2"><strong>阶段二：</strong>被行权持币后，卖 $110k Call 收权利金；到期后重复</p>
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
            <p class="text-sm font-bold text-green-800">✅ 卖 Put 收租</p>
            <p class="text-xs text-green-700 mt-1">多期累计权利金，降低持仓成本</p>
          </div>
          <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p class="text-sm font-bold text-blue-800">ℹ️ 持币后卖 Call</p>
            <p class="text-xs text-blue-700 mt-1">温和上涨中持续收租</p>
          </div>
          <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
            <p class="text-sm font-bold text-red-800">❌ 暴跌</p>
            <p class="text-xs text-red-700 mt-1">持币浮亏，但权利金累计提供缓冲</p>
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
          <li><strong>执行纪律</strong>：滚动与被行权管理需有明确规则</li>
          <li><strong>Vega 风险</strong>：低 IV 期权收租效果较弱</li>
        </ul>
      </div>
      <h4 class="font-bold text-slate-900 mt-6 mb-3 text-lg">💡 专业建议</h4>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-lg">
        <ul class="text-sm text-indigo-900 space-y-2 list-disc pl-5">
          <li><strong>分批与周期</strong>：按月或双周滚动，分批减少一次性风险</li>
          <li><strong>行权价选择</strong>：Put 低 5–10%，Call 高 5–10%</li>
        </ul>
      </div>
    `,
    pros: [
      '长期稳定现金流并降低建仓成本。',
      '在震荡或温和趋势环境表现良好。'
    ],
    cons: [
      '暴跌时持币浮亏、上涨时可能卖飞。'
    ]
  }
};

export default wheel;
