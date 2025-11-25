import { Strategy } from '@/types';
import longPut from './long-put';
import bearPutSpread from './bear-put-spread';
import bearCallSpread from './bear-call-spread';
import putRatioBackspread from './put-ratio-backspread';
import strip from './strip';
import nakedCall from './naked-call';
import diagonalPut from './diagonal-put';
import syntheticShort from './synthetic-short';

export const BEARISH_STRATEGIES: Strategy[] = [
  longPut,
  bearPutSpread,
  bearCallSpread,
  putRatioBackspread,
  strip,
  nakedCall,
  diagonalPut,
  syntheticShort,
];
