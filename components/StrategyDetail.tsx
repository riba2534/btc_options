import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import { Strategy, ChartPoint, StrategyCategory } from '@/types';
const PnLChartLazy = React.lazy(() => import('@/components/PnLChart'));
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface StrategyDetailProps {
  strategy: Strategy;
  btcPrice: number;
}

const OptionBasicsView: React.FC<{ btcPrice: number }> = ({ btcPrice }) => {
  const generateData = (type: 'Call' | 'Put', action: 'Buy' | 'Sell') => {
    const strike = btcPrice;
    const premium = btcPrice * 0.05;
    const range = 0.2;
    const points = [];
    for (let price = btcPrice * (1 - range); price <= btcPrice * (1 + range); price += btcPrice * 0.01) {
      let pnl = 0;
      if (type === 'Call') {
        const intrinsic = Math.max(0, price - strike);
        pnl = action === 'Buy' ? intrinsic - premium : premium - intrinsic;
      } else {
        const intrinsic = Math.max(0, strike - price);
        pnl = action === 'Buy' ? intrinsic - premium : premium - intrinsic;
      }
      points.push({ price: Math.round(price), pnl: Math.round(pnl) });
    }
    return points;
  };

  const MiniChart = ({ title, data, color }: { title: string, data: any[], color: string }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
      <h4 className="font-bold text-slate-700 mb-2">{title}</h4>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="price" hide />
            <YAxis hide />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Line type="monotone" dataKey="pnl" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <MiniChart title="买入看涨 (Long Call)" data={generateData('Call', 'Buy')} color="#10b981" />
      <MiniChart title="卖出看涨 (Short Call)" data={generateData('Call', 'Sell')} color="#ef4444" />
      <MiniChart title="买入看跌 (Long Put)" data={generateData('Put', 'Buy')} color="#10b981" />
      <MiniChart title="卖出看跌 (Short Put)" data={generateData('Put', 'Sell')} color="#ef4444" />
    </div>
  );
};

const StrategyDetail: React.FC<StrategyDetailProps> = ({ strategy, btcPrice }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [strategy.id]);

  // --- Calculation Logic ---
  const calculatedLegs = useMemo(() => {
    return strategy.legs.map(leg => {
      const strike = Math.round(btcPrice * leg.strikeOffset / 100) * 100;
      const premium = Math.round(btcPrice * leg.premiumRatio);
      return { ...leg, strike, premium };
    });
  }, [strategy, btcPrice]);

  const calculateTotalPnl = (price: number) => {
    let totalPnl = 0;

    // Calculate Option Legs P&L
    calculatedLegs.forEach(leg => {
      let legPnl = 0;
      if (leg.type === 'Call') {
        const intrinsic = Math.max(0, price - leg.strike);
        legPnl = leg.action === 'Buy' ? intrinsic - leg.premium : leg.premium - intrinsic;
      } else { // Put
        const intrinsic = Math.max(0, leg.strike - price);
        legPnl = leg.action === 'Buy' ? intrinsic - leg.premium : leg.premium - intrinsic;
      }
      totalPnl += legPnl;
    });

    // Special handling for Spot positions (Covered Call / Protective Put / Collar)
    if (['covered-call', 'protective-put', 'collar'].includes(strategy.id)) {
      const spotPnl = price - btcPrice;
      totalPnl += spotPnl;
    }

    return totalPnl;
  };

  const pnlData: ChartPoint[] = useMemo(() => {
    const points: ChartPoint[] = [];
    const range = 0.4; // +/- 40% range for chart
    const minPrice = btcPrice * (1 - range);
    const maxPrice = btcPrice * (1 + range);
    const step = (maxPrice - minPrice) / 100; // Higher resolution

    for (let price = minPrice; price <= maxPrice; price += step) {
      const totalPnl = calculateTotalPnl(price);
      points.push({ price: Math.round(price), pnl: Math.round(totalPnl) });
    }
    return points;
  }, [calculatedLegs, btcPrice, strategy.id]);

  // Scenarios for the Table
  const scenarioPoints = useMemo(() => {
    const percentages = [-0.20, -0.10, -0.05, 0, 0.05, 0.10, 0.20];
    return percentages.map(pct => {
      const price = btcPrice * (1 + pct);
      return {
        pct,
        price,
        pnl: calculateTotalPnl(price)
      };
    });
  }, [btcPrice, calculateTotalPnl]);

  // --- Rendering Helpers ---
  const formatMoney = (val: number) => `$${val.toLocaleString()}`;

  const hasSpotPosition = ['covered-call', 'protective-put', 'collar'].includes(strategy.id);
  const isBasics = strategy.category === StrategyCategory.BASICS;
  const hasDifferentExpiry = useMemo(() => {
    const id = strategy.id.toLowerCase();
    return id.includes('calendar') || id.includes('diagonal');
  }, [strategy.id]);

  return (
    <div ref={rootRef} className="flex flex-col gap-6 md:gap-8 p-4 md:p-8 h-full overflow-y-auto w-full max-w-[1600px] mx-auto custom-scrollbar">
      <header className="border-b border-slate-200 pb-4 md:pb-6 mt-10 md:mt-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 text-[10px] md:text-xs font-bold rounded bg-slate-100 text-slate-600 uppercase tracking-wider border border-slate-200">
            {strategy.category}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{strategy.name}</h1>
        <p className="text-sm md:text-xl text-slate-600 mt-2 md:mt-3 max-w-3xl">{strategy.description}</p>
      </header>

      {/* Main Content Area */}
      {isBasics ? (
        <div className="w-full">
          <OptionBasicsView btcPrice={btcPrice} />
        </div>
      ) : (
        <div className="w-full">
          <Suspense fallback={<div className="w-full aspect-[1/1] max-h-[800px] bg-white rounded-2xl border border-slate-200 p-6 shadow-sm" />}>
            <PnLChartLazy key={strategy.id} data={pnlData} currentPrice={btcPrice} />
          </Suspense>
        </div>
      )}

      {/* Strategy Info Stack (Hidden for Basics) */}
      {!isBasics && (
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Construction Example */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/50 px-4 py-3 md:px-6 md:py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2 backdrop-blur">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">策略构造详情 (Construction)</h3>
              <span className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 bg-white rounded border border-slate-200 text-slate-500 w-fit">
                Base: {formatMoney(btcPrice)}
              </span>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {hasDifferentExpiry && (
                  <div className="p-4 md:p-5 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] md:text-xs font-bold rounded bg-amber-200 text-amber-800 border border-amber-300">到期不同</span>
                      <span className="text-sm md:text-base font-bold text-amber-900">本策略包含 <span className="underline decoration-amber-400">近月</span> 与 <span className="underline decoration-amber-400">远月</span> 两条腿</span>
                    </div>
                    <div className="text-xs md:text-sm text-amber-900">
                      近月腿：Theta 衰减更快（更容易归零）；远月腿：用于方向表达与保值。到期管理需在近月临期前滚动或平仓。
                    </div>
                  </div>
                )}
                {hasSpotPosition && (
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-blue-50/50 rounded-xl border border-blue-100 gap-3 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-200 shrink-0">
                        <span className="text-[9px] md:text-[10px] font-bold opacity-70 uppercase tracking-widest">Spot</span>
                        <span className="font-bold text-lg md:text-xl leading-none">1</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base md:text-lg">持有现货 (Long Spot)</div>
                        <div className="text-xs md:text-sm text-slate-500 font-medium">Buy 1 BTC @ {formatMoney(btcPrice)}</div>
                      </div>
                    </div>
                    <div className="text-right flex justify-between items-center md:block">
                      <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider">Type</span>
                      <div className="font-mono font-medium text-slate-700 bg-white px-3 py-1 rounded border border-slate-200 text-sm">Asset</div>
                    </div>
                  </div>
                )}

                {calculatedLegs.map((leg, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-3 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className={`flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md shrink-0 ${leg.action === 'Buy' ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-rose-500 text-white shadow-rose-200'}`}>
                        <span className="text-[9px] md:text-[10px] font-bold opacity-70 uppercase tracking-widest">{leg.type}</span>
                        <span className="font-bold text-lg md:text-xl leading-none">1</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base md:text-lg flex items-center gap-2 flex-wrap">
                          <span>{leg.action === 'Buy' ? '买入' : '卖出'} {leg.type}</span>
                          <span className="text-[10px] md:text-xs font-normal text-slate-400 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200 hidden sm:inline-block">Option</span>
                          {hasDifferentExpiry && (
                            <span className="text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border hidden sm:inline-block
                              bg-amber-100 text-amber-700 border-amber-200">
                              {((leg as any).expiryLabel) ? (leg as any).expiryLabel : (leg.action === 'Buy' ? '远月' : '近月')}
                            </span>
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                          <span>行权价: <span className="font-mono font-semibold text-slate-700">{formatMoney(leg.strike)}</span></span>
                          <span className="text-slate-300 hidden sm:inline">|</span>
                          <span>权利金: <span className="font-mono font-semibold text-slate-700">{formatMoney(leg.premium)}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:block justify-between items-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-50 md:text-right">
                      <div className="md:hidden text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        {leg.action === 'Buy' ? 'Cost' : 'Income'}
                      </div>
                      <div>
                        <div className={`font-mono font-bold text-base md:text-lg ${leg.action === 'Buy' ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {leg.action === 'Buy' ? '-' : '+'}{formatMoney(leg.premium)}
                        </div>
                        <div className="hidden md:block text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">
                          {leg.action === 'Buy' ? 'Cost / Debit' : 'Income / Credit'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Risk Profile</div>
                  <div className="text-sm md:text-base text-slate-800 font-semibold">{strategy.riskProfile}</div>
                </div>
                <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Ideal Scenario</div>
                  <div className="text-sm md:text-base text-slate-800 font-semibold">{strategy.idealScenario}</div>
                </div>
              </div>
            </div>
          </div>

          {/* P&L Scenario Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50/50 px-4 py-3 md:px-6 md:py-4 border-b border-slate-200 backdrop-blur">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                盈亏情景推演 (P&L Scenarios)
              </h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm text-left whitespace-nowrap md:whitespace-normal">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-xs uppercase tracking-wider">BTC价格 (Exp Price)</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-xs uppercase tracking-wider">涨跌幅 (Change)</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-xs uppercase tracking-wider text-right">策略盈亏 (Profit/Loss)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scenarioPoints.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 font-mono font-medium text-slate-700 text-sm md:text-base">{formatMoney(item.price)}</td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-bold border ${item.pct > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            item.pct < 0 ? 'bg-rose-50 text-rose-700 border-rose-100' :
                              'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                          {item.pct > 0 ? '+' : ''}{(item.pct * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className={`px-4 py-3 md:px-6 md:py-4 text-right font-mono font-bold text-sm md:text-base ${item.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.pnl > 0 ? '+' : ''}{formatMoney(item.pnl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8">
        <h3 className="font-bold text-slate-800 mb-4 md:mb-6 text-lg md:text-xl flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          {isBasics ? '期权核心概念 (Core Concepts)' : '策略详解 (Strategy Guide)'}
        </h3>
        <div className="prose prose-slate max-w-none mb-8 md:mb-10">
        <div 
          className="text-slate-700 leading-loose text-base md:text-lg strategy-content"
          dangerouslySetInnerHTML={{ __html: strategy.detailedAnalysis?.explanation || '' }}
        />
        </div>

        {/* Expanded Guide (auto-generated details) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {(() => {
            // Compute summary of legs
            const callCount = strategy.legs.filter(l => l.type === 'Call').length;
            const putCount = strategy.legs.filter(l => l.type === 'Put').length;
            const classify = (leg: typeof strategy.legs[number]) => {
              const off = leg.strikeOffset;
              if (leg.type === 'Call') return off < 1 ? 'ITM' : off === 1 ? 'ATM' : 'OTM';
              return off > 1 ? 'ITM' : off === 1 ? 'ATM' : 'OTM';
            };
            const dist = strategy.legs.reduce((acc, l) => { const c = classify(l); acc[c] = (acc[c]||0)+1; return acc; }, {} as Record<string, number>);
            const netSide = strategy.legs.reduce((acc, l) => acc + (l.action === 'Buy' ? 1 : -1), 0);
            const isCalendar = hasDifferentExpiry;
            const expiryAdvice = isCalendar
              ? '到期建议：远月 60–90 天；近月 14–30 天，近月临期前滚动。'
              : netSide > 0
              ? '到期建议：买方策略偏好 30–60 天，兼顾幅度与成本。'
              : netSide < 0
              ? '到期建议：卖方策略偏好 14–30 天（Theta效率更高）。'
              : '到期建议：按事件窗口选择 7–30 天，避免过早被 Theta 吃掉。';
            const mgmtAdvice = netSide < 0
              ? ['收益达到 50–70% 时提前平仓落袋', '价格接近边界时滚动（外扩或移近中枢）', '关注 IV 回落对净卖方不利']
              : ['权利金亏损 40–50% 时考虑止损', '事件后 IV 回落可能导致回吐，分批止盈', '选择流动性好的合约，降低点差与滑点'];
            return (
              <>
                <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">参数与到期建议</div>
                  <ul className="text-sm md:text-base text-slate-800 space-y-2 list-disc pl-5">
                    <li>腿分布：Call {callCount} / Put {putCount}；ITM {dist['ITM']||0}，ATM {dist['ATM']||0}，OTM {dist['OTM']||0}</li>
                    <li>行权价偏移：基准价 × offset（如 1.10 = +10%），买方更偏向 ATM/ITM，卖方更偏向 OTM</li>
                    <li>{expiryAdvice}</li>
                  </ul>
                </div>
                <div className="p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">管理与滚动建议</div>
                  <ul className="text-sm md:text-base text-slate-800 space-y-2 list-disc pl-5">
                    {mgmtAdvice.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                    <li>临近到期 Gamma 增大，价格靠近行权价时盈亏更敏感</li>
                  </ul>
                </div>
              </>
            );
          })()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Pros */}
          <div className="bg-emerald-50/50 rounded-xl p-5 md:p-6 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {isBasics ? '期权优势 (Advantages)' : '优势 (Pros)'}
            </h4>
            <ul className="space-y-3">
              {strategy.detailedAnalysis?.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                  <span className="mt-1.5 md:mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-300"></span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-rose-50/50 rounded-xl p-5 md:p-6 border border-rose-100">
            <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {isBasics ? '风险与挑战 (Risks)' : '劣势 (Cons)'}
            </h4>
            <ul className="space-y-3">
              {strategy.detailedAnalysis?.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                  <span className="mt-1.5 md:mt-2 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 shadow-sm shadow-rose-300"></span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6 shadow-sm">
        <h4 className="text-amber-900 font-bold text-base mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          核心总结 (Key Takeaway)
        </h4>
        <p className="text-amber-800 leading-relaxed text-sm md:text-base">
          {strategy.category === StrategyCategory.BASICS && '期权交易不是简单的买涨买跌，而是对波动率、时间和方向的三维博弈。掌握希腊字母是进阶的关键。'}
          {strategy.category === StrategyCategory.BULLISH && '牛市策略利用杠杆放大收益，但要注意隐含波动率 (IV) 和时间损耗 (Theta)。'}
          {strategy.category === StrategyCategory.BEARISH && '做空策略不仅用于投机，常用于保护现货资产。注意“裸卖”期权的巨大风险。'}
          {strategy.category === StrategyCategory.NEUTRAL && '中性策略主要赚取时间价值 (Theta) 和波动率下降 (Vega Crush)，适合震荡行情。'}
          {strategy.category === StrategyCategory.VOLATILITY && '此类策略做多波动率 (Long Vega)，需要价格发生剧烈变动才能覆盖权利金成本。'}
          {strategy.category === StrategyCategory.INCOME && '将期权与现货结合，构建低风险的生息或保险组合，是机构最常用的手法。'}
        </p>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default React.memo(StrategyDetail);
