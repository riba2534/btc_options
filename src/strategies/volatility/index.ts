import { Strategy } from '@/types';
import longStraddle from './long-straddle';
import longStrangle from './long-strangle';
import longGuts from './long-guts';

export const VOLATILITY_STRATEGIES: Strategy[] = [
  longStraddle,
  longStrangle,
  longGuts,
];
