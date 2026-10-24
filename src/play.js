import {integer} from './validate.js';
import {validateCode} from './rules.js';
import {rankGuesses} from './ranking.js';
import {filterCandidates} from './candidates.js';
import {scoreRaw} from './feedback.js';
export function solveSecret(scorer,secret,{maxTurns=12,...options}={}){validateCode(secret,scorer.rules);integer(maxTurns,1,100,'turn limit');let ids=scorer.codes.map((_,i)=>i);const trace=[];for(let turn=0;turn<maxTurns;turn++){const ranked=rankGuesses(scorer,ids,options),row=ranked.rows[0];if(!row)return {status:'budget',trace,remaining:ids.length};const response=scoreRaw(secret,row.guess,scorer.rules.colors),before=ids.length;ids=filterCandidates(scorer,ids,row.guess,response);trace.push({guess:row.guess,response,before,after:ids.length,entropy:row.entropy,exactGlobal:ranked.exactGlobal});if(response.exact===scorer.rules.length)return {status:'solved',trace,remaining:1};}return {status:'turn-limit',trace,remaining:ids.length};}
