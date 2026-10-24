import {guessId} from './candidates.js';
import {decodeFeedback} from './feedback.js';
export function partitionIds(scorer,ids,g){const buckets=new Map();for(const id of ids){const k=scorer.score(g,id);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(id);}return buckets;}
export function partition(scorer,ids,guess){const buckets=partitionIds(scorer,ids,guessId(scorer,guess));return [...buckets].sort((a,b)=>a[0]-b[0]).map(([key,members])=>({key,response:decodeFeedback(key,scorer.rules.length),count:members.length,probability:members.length/ids.length,ids:members}));}
