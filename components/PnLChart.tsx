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
}> = ({ viewBox, point, index = 0 }) => {
  if (!viewBox) return null;
  const { x, y } = viewBox;

  const isUnlimited = point.label.includes('无限');
  const bgColor = point.type === 'breakeven' ? '#fbbf24' :
                  point.type === 'max-profit' ? '#22c55e' : '#ef4444';
  const textColor = point.type === 'breakeven' ? '#78350f' :
                    point.type === 'max-profit' ? '#14532d' : '#7f1d1d';
  const borderColor = point.type === 'breakeven' ? '#d97706' :
                      point.type === 'max-profit' ? '#16a34a' : '#dc2626';

  // Position label above for max profit, below for max loss
  // Breakeven points alternate based on index
  let labelOffset = -50;
  if (point.type === 'max-loss') labelOffset = 20;
  if (point.type === 'breakeven') labelOffset = index % 2 === 0 ? -50 : 20;

  // Alternate left/right for multiple breakeven points to avoid overlap
  const horizontalOffset = point.type === 'breakeven' ? (index % 2 === 0 ? -70 : 10) : -60;

  return (
    <g>
      {/* Marker dot */}
      <circle
        cx={x}
        cy={y}
        r={isUnlimited ? 8 : 7}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={2}
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
      />
      {/* Connector line */}
      <line
        x1={x}
        y1={y}
        x2={x + (point.type === 'breakeven' ? (index % 2 === 0 ? -10 : 10) : 0)}
        y2={y + (labelOffset > 0 ? 15 : -15)}
        stroke={borderColor}
        strokeWidth={1.5}
        strokeDasharray="3 2"
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
          alignItems: point.type === 'breakeven' ? (index % 2 === 0 ? 'flex-end' : 'flex-start') : 'center',
          fontSize: '10px',
          fontWeight: 'bold',
        }}>
          <span style={{
            background: bgColor,
            color: textColor,
            padding: '3px 8px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            border: `1px solid ${borderColor}`,
          }}>
            {point.label}
          </span>
          <span style={{
            color: '#64748b',
            fontSize: '9px',
            marginTop: '3px',
            fontWeight: '600',
          }}>
            @ ${(point.price / 1000).toFixed(0)}k
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

    if (max <= 0) return 0;
    if (min >= 0) return 1;
    if (max === min) return 0; // Prevent division by zero

    return max / (max - min);
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center text-slate-400">No Data Available</div>;
  }

  return (
    <div className="w-full aspect-[4/3] md:aspect-[1/1] max-h-[500px] md:max-h-[800px] bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          到期盈亏模拟 (P&L at Expiration)
        </h3>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500"></span>
              <span className="text-slate-500">盈亏平衡</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-600"></span>
              <span className="text-slate-500">盈利/无限↗</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-600"></span>
              <span className="text-slate-500">亏损/无限↘</span>
            </span>
          </div>
          <div className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            Interactive
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
              bottom: 20,
            }}
          >
            <defs>
              {/* Fill Gradient: Transparent Green/Red */}
              <linearGradient id="splitColorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset={off} stopColor="#ef4444" stopOpacity={0.15} />
              </linearGradient>
              {/* Stroke Gradient: Solid Green/Red Line */}
              <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#16a34a" stopOpacity={1} />
                <stop offset={off} stopColor="#dc2626" stopOpacity={1} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            
            <XAxis 
              dataKey="price" 
              tickFormatter={(value) => `$${value/1000}k`}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              dy={10}
            />
            
            <YAxis 
              stroke="#94a3b8"
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
                      <p className="text-slate-500 text-xs font-medium mb-1">BTC Price: <span className="text-slate-800">${label}</span></p>
                      <div className={`text-lg font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                        {isProfit ? '+' : ''}${pnl.toLocaleString()}
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
            <ReferenceLine y={0} stroke="#334155" strokeOpacity={0.3} strokeWidth={1} />
            
            {/* Current Price Line */}
            <ReferenceLine 
              x={currentPrice} 
              stroke="#3b82f6" 
              strokeDasharray="4 4" 
              label={{ 
                value: 'Current', 
                position: 'insideTop', 
                fill: '#3b82f6', 
                fontSize: 12,
                fontWeight: 'bold',
                bg: 'white'
              }} 
            />

            <Area
              type="monotone"
              dataKey="pnl"
              stroke="url(#splitColorStroke)"
              strokeWidth={3}
              fill="url(#splitColorFill)"
              animationDuration={500}
            />

            {/* Key Points Markers */}
            {keyPoints.map((point, index) => (
              <ReferenceDot
                key={`keypoint-${index}`}
                x={point.price}
                y={point.pnl}
                r={0}
                label={<KeyPointLabel point={point} index={index} />}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(PnLChart);
