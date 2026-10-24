import {partition} from './partitions.js';
export function adversarialResponse(scorer,ids,guess){if(!ids.length)throw new RangeError('No candidates');const rows=partition(scorer,ids,guess);rows.sort((a,b)=>b.count-a.count||a.response.exact-b.response.exact||a.key-b.key);return {...rows[0],policy:'largest-consistent-branch'};}
