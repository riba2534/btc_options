import { Strategy } from '@/types';
import shortStraddle from './short-straddle';
import shortStrangle from './short-strangle';
import ironCondor from './iron-condor';
import ironButterfly from './iron-butterfly';
import longCallButterfly from './long-call-butterfly';
import shortGuts from './short-guts';
import calendarCall from './calendar-call';
import calendarPut from './calendar-put';
import condorCall from './condor-call';
import brokenWingCall from './broken-wing-butterfly-call';
import putButterfly from './put-butterfly';
import boxSpread from './box-spread';

export const NEUTRAL_STRATEGIES: Strategy[] = [
  shortStraddle,
  shortStrangle,
  ironCondor,
  ironButterfly,
  longCallButterfly,
  shortGuts,
  calendarCall,
  calendarPut,
  condorCall,
  brokenWingCall,
  putButterfly,
  boxSpread,
];
