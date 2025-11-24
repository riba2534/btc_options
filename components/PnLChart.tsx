import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChartPoint } from '../types';

interface PnLChartProps {
  data: ChartPoint[];
  currentPrice: number;
}

const PnLChart: React.FC<PnLChartProps> = ({ data, currentPrice }) => {
  // Calculate gradient offset for color split
  const off = useMemo(() => {
    if (!data || data.length === 0) return 0;
    
    const max = Math.max(...data.map((i) => i.pnl));
    const min = Math.min(...data.map((i) => i.pnl));

    if (max <= 0) return 0;
    if (min >= 0) return 1;
    if (max === min) return 0; // Prevent division by zero

    return max / (max - min);
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center text-slate-400">No Data Available</div>;
  }

  return (
    <div className="w-full aspect-[1/1] max-h-[800px] bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          到期盈亏模拟 (P&L at Expiration)
        </h3>
        <div className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          Interactive Chart
        </div>
      </div>
      
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
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
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PnLChart;