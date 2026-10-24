import {frequencies} from './frequency.js';
export function coincidence(value){const {counts,length:n}=frequencies(value);return n<2?0:counts.reduce((a,c)=>a+c*(c-1),0)/(n*(n-1));}
export function textEntropy(value){const {counts,length:n}=frequencies(value);return counts.reduce((a,c)=>c?a-c/n*Math.log2(c/n):a,0);}
export function friedmanEstimate(value){const {length:n}=frequencies(value),ic=coincidence(value),den=(n-1)*ic-.0385*n+.065;const estimate=n>=20&&den>0?.0265*n/den:null;return {ic,length:n,estimate:estimate&&Number.isFinite(estimate)?estimate:null,warning:n<100?'Short texts produce unstable estimates':null};}
