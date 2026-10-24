import {integer} from './validate.js';
import {mod} from './alphabet.js';
export function gcd(a,b){integer(a,-1000000,1000000);integer(b,-1000000,1000000);a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
export function inverse(a,m=26){integer(a,-1000000,1000000);integer(m,2,10000);let oldR=mod(a,m),r=m,oldS=1,s=0;while(r){const q=Math.floor(oldR/r);[oldR,r]=[r,oldR-q*r];[oldS,s]=[s,oldS-q*s];}if(oldR!==1)throw new RangeError('Multiplier has no modular inverse');return mod(oldS,m);}
