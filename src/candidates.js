import {feedbackKey} from './feedback.js';
import {validateCode} from './rules.js';
import {codeKey} from './space.js';
export function guessId(scorer,guess){validateCode(guess,scorer.rules);const key=codeKey(guess);return scorer.codes.findIndex(c=>codeKey(c)===key);}
export function filterCandidates(scorer,ids,guess,response){const g=guessId(scorer,guess),k=feedbackKey(response,scorer.rules.length);return ids.filter(id=>scorer.score(g,id)===k);}
export function replay(scorer,history=[]){if(!Array.isArray(history)||history.length>100)throw new RangeError('History must contain at most 100 rows');let ids=scorer.codes.map((_,i)=>i);const trace=[ids.length];for(const h of history){ids=filterCandidates(scorer,ids,h.guess,h.response);trace.push(ids.length);}return {ids,trace};}
