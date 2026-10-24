import {codeSpace} from './space.js';
import {rules} from './rules.js';
import {scoreRaw} from './feedback.js';
import {integer} from './validate.js';
export function createScorer(input={}){const r=rules(input),codes=codeSpace(r),rows=new Map();let evaluations=0;const counts=codes.map(c=>{const v=new Uint8Array(r.colors);for(const x of c)v[x]++;return v;});return {rules:r,codes,get evaluations(){return evaluations;},get cachedRows(){return rows.size;},score(a,b){integer(a,0,codes.length-1,'code id');integer(b,0,codes.length-1,'code id');let row=rows.get(a);if(!row){row=new Uint8Array(codes.length);row.fill(255);rows.set(a,row);}if(row[b]!==255)return row[b];let e=0,s=0;for(let i=0;i<r.length;i++)e+=codes[a][i]===codes[b][i]?1:0;for(let c=0;c<r.colors;c++)s+=Math.min(counts[a][c],counts[b][c]);const k=e*(r.length+1)+s-e;row[b]=k;evaluations++;return k;},clear(){rows.clear();evaluations=0;}};}
