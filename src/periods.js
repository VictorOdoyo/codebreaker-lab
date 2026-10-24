import {letters} from './alphabet.js';
import {coincidence} from './coincidence.js';
import {integer} from './validate.js';
export function splitColumns(value,period){integer(period,1,64,'period');const s=letters(value),cols=Array(period).fill('');for(let i=0;i<s.length;i++)cols[i%period]+=s[i];return cols;}
export function periodScan(value,maxPeriod=16){integer(maxPeriod,1,64,'maximum period');return Array.from({length:maxPeriod},(_,i)=>{const period=i+1,cols=splitColumns(value,period),pairs=cols.reduce((a,c)=>a+c.length*(c.length-1),0),ic=pairs?cols.reduce((a,c)=>a+coincidence(c)*c.length*(c.length-1),0)/pairs:0;return {period,ic,columns:cols.length,minColumn:Math.min(...cols.map(c=>c.length)),reliable:cols.every(c=>c.length>=20)};}).sort((a,b)=>b.ic-a.ic||a.period-b.period);}
