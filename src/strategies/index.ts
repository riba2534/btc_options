import { Strategy } from '@/types';
import { BASICS_STRATEGIES } from './basics';
import { BULLISH_STRATEGIES } from './bullish';
import { BEARISH_STRATEGIES } from './bearish';
import { NEUTRAL_STRATEGIES } from './neutral';
import { VOLATILITY_STRATEGIES } from './volatility';
import { INCOME_STRATEGIES } from './income';

export const ALL_STRATEGIES: Strategy[] = [
  ...BASICS_STRATEGIES,
  ...BULLISH_STRATEGIES,
  ...BEARISH_STRATEGIES,
  ...NEUTRAL_STRATEGIES,
  ...VOLATILITY_STRATEGIES,
  ...INCOME_STRATEGIES,
];

