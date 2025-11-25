import { Strategy } from '@/types';
import coveredCall from './covered-call';
import protectivePut from './protective-put';
import collar from './collar';
import jadeLizard from './jade-lizard';
import seagull from './seagull';
import wheel from './wheel';
import coveredStrangle from './covered-strangle';

export const INCOME_STRATEGIES: Strategy[] = [
  coveredCall,
  protectivePut,
  collar,
  jadeLizard,
  seagull,
  wheel,
  coveredStrangle,
];
