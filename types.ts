export enum StrategyCategory {
  BASICS = '期权基础 (Option Basics)',
  BULLISH = '看涨策略 (Bullish)',
  BEARISH = '看跌策略 (Bearish)',
  NEUTRAL = '盘整/中性策略 (Neutral)',
  VOLATILITY = '高波动策略 (Volatility)',
  INCOME = '收益/对冲策略 (Income/Hedge)'
}

export interface OptionLeg {
  type: 'Call' | 'Put';
  action: 'Buy' | 'Sell'; // Long or Short
  strikeOffset: number; // Percentage offset from spot price (e.g., 1.05 for 5% OTM)
  premiumRatio: number; // Approximate premium as % of spot price
}

export interface Strategy {
  id: string;
  name: string;
  category: StrategyCategory;
  description: string;
  setup: string; // How to construct it
  legs: OptionLeg[];
  riskProfile: string;
  idealScenario: string;
  detailedAnalysis: {
    explanation: string;
    pros: string[];
    cons: string[];
  };
}

export interface ChartPoint {
  price: number;
  pnl: number;
}