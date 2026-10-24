import {replay} from './candidates.js';
import {posteriorBits} from './information.js';
export function evidence(scorer,history){const {ids,trace}=replay(scorer,history);return {initial:scorer.codes.length,remaining:ids.length,initialBits:posteriorBits(scorer.codes.length),remainingBits:posteriorBits(ids.length),status:!ids.length?'contradictory':ids.length===1?'identified':'ambiguous',steps:history.map((h,i)=>({turn:i+1,before:trace[i],after:trace[i+1],eliminated:trace[i]-trace[i+1],bits:trace[i+1]?Math.log2(trace[i]/trace[i+1]):null,guess:[...h.guess],response:{...h.response}}))};}
