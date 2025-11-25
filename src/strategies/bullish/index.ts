import { Strategy } from '@/types';
import longCall from './long-call';
import bullCallSpread from './bull-call-spread';
import bullPutSpread from './bull-put-spread';
import syntheticLong from './synthetic-long';
import callRatioBackspread from './call-ratio-backspread';
import strap from './strap';
import cashSecuredPut from './cash-secured-put';
import diagonalCall from './diagonal-call';

export const BULLISH_STRATEGIES: Strategy[] = [
  longCall,
  bullCallSpread,
  bullPutSpread,
  syntheticLong,
  callRatioBackspread,
  strap,
  cashSecuredPut,
  diagonalCall,
];
