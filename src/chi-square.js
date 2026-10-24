import {frequencies,ENGLISH} from './frequency.js';
export function chiSquare(value,expected=ENGLISH){if(!Array.isArray(expected)||expected.length!==26||expected.some(p=>!Number.isFinite(p)||p<=0))throw new RangeError('Expected 26 positive probabilities');const {counts,length:n}=frequencies(value);if(!n)return 0;return counts.reduce((a,c,i)=>{const e=n*expected[i];return a+(c-e)**2/e;},0);}
