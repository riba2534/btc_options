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
  // Optional expiry label for display (e.g., '近月', '远月')
  expiryLabel?: string;
}

// Qualitative Greek exposure for a strategy (values like '+', '−', '≈0', '+(强)').
export interface GreekExposure {
  delta: string;
  gamma: string;
  theta: string;
  vega: string;
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
  // --- Optional beginner-friendly / advanced fields (rendered by StrategyDetail when present) ---
  plainSummary?: string;                                       // 一句话大白话（零术语）
  analogy?: { emoji: string; title: string; text: string };   // 生活类比
  pitfalls?: string[];                                         // 新手常见误区 2-3 条
  quickJudge?: { use: string; avoid: string };                // 极简判断（各 ≤ 20 字）
  greeks?: GreekExposure;                                      // 希腊字母暴露（四象限）
  cryptoNote?: string;                                         // 加密期权 / 交易实务提醒
}

export interface ChartPoint {
  price: number;
  pnl: number;
}

export interface KeyPoint {
  price: number;
  pnl: number;
  type: 'breakeven' | 'max-profit' | 'max-loss';
  label: string;
}
