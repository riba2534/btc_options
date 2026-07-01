import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { ChartPoint, KeyPoint } from '@/types';

interface PnLChartProps {
  data: ChartPoint[];
  currentPrice: number;
  keyPoints?: KeyPoint[];
}

// Custom label component for key points
const KeyPointLabel: React.FC<{
  viewBox?: { x: number; y: number };
  point: KeyPoint;
  index?: number;
  // 0 (left edge of the plotted price domain) .. 1 (right edge). Used to
  // keep labels for points near either edge from extending past the
  // chart's own boundary and getting clipped.
  priceFraction?: number;
}> = ({ viewBox, point, index = 0, priceFraction = 0.5 }) => {
  if (!viewBox) return null;
  const { x, y } = viewBox;

  const isUnlimited = point.label.includes('无限');
  const bgColor = point.type === 'breakeven' ? '#fbbf24' :
                  point.type === 'max-profit' ? '#10b981' : '#f43f5e';
  const textColor = point.type === 'breakeven' ? '#78350f' :
                    point.type === 'max-profit' ? '#064e3b' : '#881337';
  const borderColor = point.type === 'breakeven' ? '#d97706' :
                      point.type === 'max-profit' ? '#059669' : '#e11d48';

  // Vertical placement alternates by each point's left-to-right position
  // among ALL key points (`index` here is the position within the
  // *price-sorted* list — see sortedKeyPoints in PnLChart), not by type.
  // Alternating strictly by type used to place e.g. a breakeven point and
  // the max-profit point at the same height whenever they *happened* to
  // both default to "above" — invisible in the type-based logic, but a real
  // collision once their x-positions were close together (verified on Iron
  // Condor: breakeven-low and max-profit both landing "above" around the
  // same area).
  const labelOffset = index % 2 === 0 ? -50 : 20;

  // Horizontal anchor: a point past 65% of the way across the plotted price
  // domain must anchor its 140px-wide label fully to the LEFT of itself
  // (box never extends further right than the point), and a point before
  // the 35% mark fully to the RIGHT — otherwise the label runs past the
  // chart/viewport boundary and gets clipped (verified: a max-loss point at
  // $116k in a $60-140k domain, 70% across, overran a 390px mobile viewport
  // by 38px when left in the gentler "middle zone" below). Points inside
  // the 35-65% band alternate left/right by sort order instead (same as the
  // vertical alternation above) using a gentler ±70px reach rather than the
  // full ±135px hard-edge anchor — two points in that band are usually
  // close enough together that the full-strength anchor would swing them
  // toward each other and re-create the same overlap it's meant to avoid
  // (verified: widening this band to 40/60 made two breakeven points at 35%
  // and 65% collide into each other's boxes).
  const horizontalOffset = priceFraction > 0.65
    ? -135
    : priceFraction < 0.35
      ? 10
      : (index % 2 === 0 ? -70 : 10);
  const anchorsLeft = horizontalOffset < 0;

  return (
    <g className="keypoint-marker" style={{ '--i': index } as React.CSSProperties}>
      {/* Marker dot */}
      <circle
        cx={x}
        cy={y}
        r={isUnlimited ? 8 : 7}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={1.5}
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
      />
      {/* Connector line */}
      <line
        x1={x}
        y1={y}
        x2={x + (anchorsLeft ? -8 : 8)}
        y2={y + (labelOffset > 0 ? 15 : -15)}
        stroke={borderColor}
        strokeWidth={1}
      />
      {/* Label box */}
      <foreignObject
        x={x + horizontalOffset}
        y={y + labelOffset}
        width={140}
        height={50}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: anchorsLeft ? 'flex-end' : 'flex-start',
          fontSize: '11px',
          fontWeight: 'bold',
          letterSpacing: '0.01em',
        }}>
          <span style={{
            background: bgColor,
            color: textColor,
            padding: '4px 10px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(15,23,42,0.08), 0 4px 10px -4px rgba(15,23,42,0.22)',
            border: `1.5px solid ${borderColor}`,
          }}>
            {point.label}
          </span>
          <span style={{
            color: '#64748b',
            fontSize: '10px',
            marginTop: '3px',
            fontWeight: '600',
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}>
            @ ${(point.price / 1000).toFixed(1)}k
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const PnLChart: React.FC<PnLChartProps> = ({ data, currentPrice, keyPoints = [] }) => {
  // Calculate gradient offset for color split - optimized single pass
  const off = useMemo(() => {
    if (!data || data.length === 0) return 0;

    // Single pass to find min/max instead of two .map() calls
    let max = data[0].pnl;
    let min = data[0].pnl;
    for (let i = 1; i < data.length; i++) {
      const pnl = data[i].pnl;
      if (pnl > max) max = pnl;
      if (pnl < min) min = pnl;
    }

    // All non-negative (incl. all-zero) → fully green; strictly all-negative → fully red.
    if (min >= 0) return 1;
    if (max <= 0) return 0;
    // max > 0 && min < 0 here, so (max - min) > 0 — no division-by-zero risk.
    return max / (max - min);
  }, [data]);

  // Sorted left-to-right by price so label placement (see KeyPointLabel)
  // can alternate above/below by physical position on the axis, instead of
  // by insertion order — two points of *different* types (e.g. a breakeven
  // point sitting right next to the max-loss point) can otherwise both
  // default to the same side and visually overlap.
  const sortedKeyPoints = useMemo(() => (
    [...keyPoints].sort((a, b) => a.price - b.price)
  ), [keyPoints]);

  if (!data || data.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center text-slate-400">No Data Available</div>;
  }

  // Same domain bounds the XAxis below uses (data is generated in increasing
  // price order), so each key point's label can tell how close it sits to
  // either edge of the plotted range.
  const domainMin = data[0].price;
  const domainMax = data[data.length - 1].price;
  const domainSpan = domainMax - domainMin || 1;

  const ariaSummary = `到期盈亏曲线，当前价 $${Math.round(currentPrice / 1000)}k${keyPoints.length ? '，关键点：' + keyPoints.map(p => p.label).join('、') : ''}`;

  return (
    <div
      role="img"
      aria-label={ariaSummary}
      className="w-full aspect-[4/3] md:aspect-[1/1] max-h-[500px] md:max-h-[800px] bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-spotlight flex flex-col"
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
        <h3 className="text-sm md:text-base font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-6 bg-brand-600 rounded-full"></span>
          到期盈亏模拟 (P&L at Expiration)
        </h3>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 shrink-0">
          <div className="flex flex-wrap justify-end items-center gap-x-2 gap-y-1 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500"></span>
              <span className="text-slate-500">盈亏平衡</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600"></span>
              <span className="text-slate-500">盈利/无限↗</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600"></span>
              <span className="text-slate-500">亏损/无限↘</span>
            </span>
          </div>
          {/* Shown on all breakpoints — this is the only place the chart
              labels the current-price line now that the in-chart SVG label
              was removed (it used to collide with KeyPointLabels on narrow
              screens). Mobile readers need it just as much as desktop. */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 tabular-nums">
            现价 ${(currentPrice / 1000).toFixed(0)}k
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 0,
              // A bit taller than before (was 20) to give max-loss/breakeven
              // labels — which render below their point — more clearance
              // from the X-axis tick row before the two start overlapping.
              bottom: 32,
            }}
          >
            <defs>
              {/* Fill Gradient: profit fades toward the zero line (top), loss deepens downward.
                  Opacity at the zero-crossing is kept at 0.10 (not the old 0.04) so the
                  breakeven region — the most information-dense part of the chart — doesn't
                  visually disappear. */}
              <linearGradient id="splitColorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset={0} stopColor="#10b981" stopOpacity={0.32} />
                <stop offset={off} stopColor="#10b981" stopOpacity={0.10} />
                <stop offset={off} stopColor="#fb7185" stopOpacity={0.10} />
                <stop offset={1} stopColor="#fb7185" stopOpacity={0.28} />
              </linearGradient>
              {/* Stroke Gradient: Solid emerald/rose line */}
              <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#047857" stopOpacity={1} />
                <stop offset={off} stopColor="#be123c" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#eef2f6" vertical={false} />

            <XAxis
              dataKey="price"
              type="number"
              domain={[data[0].price, data[data.length - 1].price]}
              tickCount={5}
              tickFormatter={(value) => `$${Math.round(value/1000)}k`}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              dy={10}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => value === 0 ? '0' : `${value > 0 ? '+' : ''}${value/1000}k`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const pnl = payload[0].value as number;
                  const isProfit = pnl >= 0;
                  return (
                    <div className="bg-white/95 backdrop-blur shadow-lg border border-slate-200 p-3 rounded-lg min-w-[150px]">
                      <p className="text-slate-500 text-xs font-medium mb-1">BTC Price: <span className="text-slate-800 font-mono tabular-nums">${Number(label).toLocaleString()}</span></p>
                      <div className={`text-lg font-bold font-mono tabular-nums ${isProfit ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isProfit ? '+' : '-'}${Math.abs(pnl).toLocaleString()}
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">
                        {isProfit ? 'PROFIT 盈利' : 'LOSS 亏损'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Zero Line */}
            <ReferenceLine y={0} stroke="#1e293b" strokeOpacity={0.35} strokeWidth={1.25} />

            {/* Current Price Line. No text label here on purpose — the
                header badge already shows "现价 $Xk", and a text label tied
                to a fixed x-position used to collide with any KeyPointLabel
                that happened to land at the same price (e.g. a max-profit
                point sitting exactly at the current price on symmetric
                strategies like Iron Condor), rendering as illegible
                overlapping text on narrow screens. */}
            <ReferenceLine
              x={currentPrice}
              stroke="#2563eb"
              strokeDasharray="4 4"
            />

            <Area
              type="monotone"
              dataKey="pnl"
              stroke="url(#splitColorStroke)"
              strokeWidth={2.5}
              fill="url(#splitColorFill)"
              animationDuration={500}
              animationEasing="ease-out"
            />

            {/* Key Points Markers */}
            {sortedKeyPoints.map((point, index) => (
              <ReferenceDot
                key={`keypoint-${point.type}-${point.price}`}
                x={point.price}
                y={point.pnl}
                r={0}
                label={<KeyPointLabel point={point} index={index} priceFraction={(point.price - domainMin) / domainSpan} />}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(PnLChart);
