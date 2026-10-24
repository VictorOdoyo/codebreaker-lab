import {partition} from './partitions.js';
import {rankGuesses} from './ranking.js';
import {integer} from './validate.js';
export function branchPreview(scorer,ids,guess,{maxBranches=16,...options}={}){integer(maxBranches,1,49,'branch limit');const branches=partition(scorer,ids,guess).sort((a,b)=>b.count-a.count||a.key-b.key);return {totalBranches:branches.length,rows:branches.slice(0,maxBranches).map(b=>({...b,next:b.response.exact===scorer.rules.length?null:rankGuesses(scorer,b.ids,{...options,limit:1})}))};}
